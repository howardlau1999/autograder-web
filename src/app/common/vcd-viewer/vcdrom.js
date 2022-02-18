'use strict';

const createVCD = require('vcd-stream/out/vcd.js');
const webVcdParser = require('vcd-stream/lib/web-vcd-parser.js');
const domContainer = require('@wavedrom/doppler/lib/dom-container.js');
const parseTimescale = require('vcd-stream/lib/parse-time-scale.js');

const numberOrString = (val) => {
  if (val < 2n ** 52n) {
    return Number(val);
  }
  return `0x${val.toString(16)}`;
};

const gcd = (a, b) => {
  if (a === undefined) {
    return b;
  }
  let r;
  while (b !== 0) {
    r = a % b;
    a = b;
    b = r;
  }
  return a < 0 ? -a : a;
};

const tNorm = (o) => {
  const { tgcd, chango } = o;

  o.t0 /= tgcd;
  o.time /= tgcd;
  Object.keys(chango).forEach((key) => {
    const { wave } = chango[key];
    wave.forEach((e) => {
      e[0] /= tgcd;
    });
  });

  const exp = Math.log10(tgcd) | 0;
  if (exp > 0) {
    const scale = 10 ** exp;
    const tgcd1 = tgcd / scale;
    if (tgcd1 === (tgcd1 | 0)) {
      o.tgcd = tgcd1;
      o.timescale += exp;
    }
  }
  return o;
};

function vcdPipeDeso(descriptionObject, vcdParser, done) {
  const chango = {};
  let tgcd;
  descriptionObject.chango = chango;
  descriptionObject.view = [];

  vcdParser.on('$enddefinitions', () => {
    descriptionObject.wires = vcdParser.info.wires;
    descriptionObject.timescale = parseTimescale(vcdParser.info.timescale);
  });

  vcdParser.change.any((id, time, cmd, value, mask) => {
    const time53 = Number(time);
    tgcd = gcd(tgcd, time53);
    chango[id] = chango[id] || { wave: [] };
    if (cmd >= 14 && cmd <= 28) {
      chango[id].kind = 'bit';
      chango[id].wave.push([time53, cmd - 14]);
    } else {
      chango[id].kind = 'vec';
      const point = [time53, numberOrString(value)];
      if (mask !== 0n) {
        point.push(numberOrString(mask));
      }
      chango[id].wave.push(point);
    }
  });

  vcdParser.on('finish', () => {
    descriptionObject.tgcd = tgcd;
    descriptionObject.t0 = vcdParser.info.t0 || 0;
    descriptionObject.time = Number(vcdParser.getTime());
    tNorm(descriptionObject);
    done(descriptionObject);
  });
}

const getHandler = (element, vcdParser) => {
  let total = 0;
  return {
    onBegin: () => {
      total = 0;
      element.innerHTML = '';
      vcdPipeDeso({}, vcdParser, (descriptionObject) => {
        element.innerHTML = '';
        descriptionObject.waveql = '';
        domContainer(element, descriptionObject);
      });
    },
    onChunk: (chunk) => {
      const chunkLength = chunk.length;
      total += chunkLength;
      element.innerHTML = `<div class="wd-progress">${total.toLocaleString()}</div>`;

      vcdParser.write(chunk);
    },
    onEnd: () => {
      vcdParser.end();
    },
  };
};

global.VCDrom = async (element) => {
  const wasmLoader = await createVCD();
  const vcdParser = await webVcdParser(wasmLoader);
  return getHandler(element, vcdParser);
};
