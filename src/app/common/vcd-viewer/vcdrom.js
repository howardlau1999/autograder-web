// Browser glue between the vcd-stream parser and the @wavedrom/doppler
// waveform renderer, modelled on wavedrom/vcdrom's lib/vcdrom.js but driven
// by the caller (onBegin / onChunk / onEnd) instead of file drops.

import createVCD from 'vcd-stream/out/vcd.js';
import webVcdParser from 'vcd-stream/lib/web-vcd-parser.js';
import vcdPipeDeso from 'vcd-stream/lib/vcd-pipe-deso.js';
import stringify from 'onml/stringify.js';
import { StyleModule } from 'style-mod';
import {
  domContainer,
  pluginRenderValues,
  pluginRenderTimeGrid,
  keyBindo,
  mountTree,
  genKeyHandler,
  genOnWheel,
  themeAll,
  helpPanel,
} from '@wavedrom/doppler';
import { createCodeMirrorState, mountCodeMirror6 } from 'waveql';

const ROOT_CLASS = 'vcdrom-root';

const HELP_URL = 'https://github.com/wavedrom/vcdrom/blob/trunk/help.md';

const FONT_FAMILY =
  "ui-monospace, Menlo, Consolas, 'Liberation Mono', 'DejaVu Sans Mono', monospace";

// doppler's theme is written for a page that is nothing but the viewer: it
// restyles body, every scrollbar and every link. Prefixing each selector
// keeps it inside the viewer element.
const dopplerTheme = new StyleModule(themeAll, {
  finish: (selector) => `.${ROOT_CLASS} ${selector}`,
});

const localTheme = new StyleModule({
  [`.${ROOT_CLASS}`]: {
    position: 'relative',
    height: '100%',
    overflow: 'hidden',
    background: '#111',
    color: '#fff',
    fontFamily: FONT_FAMILY,
  },
  // waveql asks for the Iosevka web font that only the upstream page ships.
  [`.${ROOT_CLASS} .wd-waveql .cm-content`]: {
    fontFamily: FONT_FAMILY,
  },
  // doppler's help panel declares these lengths without units, so browsers
  // drop them; this also makes room for a wider font than Iosevka.
  [`.${ROOT_CLASS} .wd-help-panel`]: {
    width: `${helpPanel.width}px`,
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  [`.${ROOT_CLASS} .wd-key-item`]: {
    padding: '0 4px',
    margin: '0 2px',
  },
  [`.${ROOT_CLASS} .wd-key-group`]: {
    padding: '0 0 4px 0',
  },
});

const helpPanelMarkup = () => {
  const panel = helpPanel.mlPanel(keyBindo, '');
  // The first two rows show the VCDrom release and link to its own
  // documentation path, which does not exist in this application.
  panel.splice(1, 2, [
    'div',
    { class: 'wd-help-panel-row' },
    ['h3', ['a', { href: HELP_URL, target: '_blank', rel: 'noopener' }, 'VCDrom help']],
  ]);
  return stringify(panel);
};

const modifiers = (event) =>
  (event.ctrlKey ? 'Ctrl+' : '') + (event.shiftKey ? 'Shift+' : '') + (event.altKey ? 'Alt+' : '');

// Same dispatch as doppler's genKeyHandler, minus its console logging of
// every key press.
const onKeyDown = (pstate, deso, cm) => (event) => {
  const key = modifiers(event) + event.key;
  if (genKeyHandler.executeKeyHandler(key, keyBindo, pstate, cm)) {
    event.stopPropagation();
    deso.render();
  }
};

// Mounts the parsed waveform into `root` and returns a function that takes
// it down again.
const mountWaveform = (root, deso) => {
  if (deso.wires.kind !== 'scope') {
    // $enddefinitions never arrived, so nothing was parsed as a signal.
    throw new Error('不是有效的 VCD 文件（没有信号定义）');
  }

  const container = domContainer({
    elemento: mountTree.defaultElemento,
    layers: mountTree.defaultLayers,
    renderPlugins: [pluginRenderTimeGrid, pluginRenderValues],
    pluginRightPanel: (elo) => {
      elo.rightPanel.innerHTML = helpPanelMarkup();
    },
  });
  const { elo, pstate } = container;

  root.replaceChildren(elo.container);
  container.start(deso);

  elo.menu.innerHTML = stringify(helpPanel.mlIcon());
  elo.menu.addEventListener('click', () => helpPanel.toggle(pstate));

  deso.hasHistory = true;
  deso.isRO = true;
  const cm = mountCodeMirror6(createCodeMirrorState(deso, pstate), elo.waveqlPanel, deso, pstate);
  // waveql only turns the query into lanes on a document change.
  cm.view.dispatch({ changes: { from: 0, insert: ' ' } });
  cm.view.dispatch({ changes: { from: 0, to: 1, insert: '' } });

  elo.container.addEventListener('keydown', onKeyDown(pstate, deso, cm));
  elo.container.addEventListener('wheel', genOnWheel(root, pstate, deso, cm, keyBindo));
  cm.view.focus();

  return () => {
    // doppler's ResizeObserver and waveql's scroll listeners keep calling
    // deso.render() after the elements are gone.
    deso.render = () => {};
    cm.view.destroy();
    elo.container.remove();
  };
};

export async function vcdrom(element, options = {}) {
  const onError = options.onError || ((error) => console.error(error));

  StyleModule.mount(document, [dopplerTheme, localTheme]);
  element.classList.add(ROOT_CLASS);

  const wasm = await createVCD();

  // One session per VCD file: the parser is a Node-style Writable that
  // cannot be written to after end(), so each file gets a fresh instance
  // on the shared wasm module.
  let session;

  const discard = () => {
    if (session) {
      session.live = false;
      if (session.dispose) {
        session.dispose();
      }
      session = undefined;
    }
    element.replaceChildren();
  };

  const withParser = (fn) => {
    const current = session;
    if (!current) {
      return;
    }
    current.parser.then(
      (inst) => {
        if (current.live) {
          fn(inst);
        }
      },
      () => {}, // already reported by onBegin
    );
  };

  return {
    onBegin: () => {
      discard();
      const current = { live: true };
      session = current;
      const fail = (error) => {
        if (current.live) {
          discard();
          onError(error);
        }
      };
      current.parser = webVcdParser(wasm).then((inst) => {
        inst.on('error', fail);
        vcdPipeDeso({ wires: { body: [] } }, inst, (deso) => {
          if (!current.live) {
            return;
          }
          try {
            current.dispose = mountWaveform(element, deso);
          } catch (error) {
            fail(error);
          }
        });
        return inst;
      });
      current.parser.catch(fail);
    },
    onChunk: (chunk) => withParser((inst) => inst.write(chunk)),
    onEnd: () => withParser((inst) => inst.end()),
    onAbort: discard,
  };
}
