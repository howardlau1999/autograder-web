# Autograder Web

This repository contains the web-based client-side code for Autograder. The server code is located at [https://github.com/howardlau1999/autograder-server](https://github.com/howardlau1999/autograder-server).

## Development

Node.js 24 (or 22.22+) and npm are required.

```bash
npm install
npm run install:vcd-stream   # VCD waveform parser; see below
npm run build                # production build to dist/autograder-web
npm run lint
npm test                     # vitest, jsdom
```

`vcd-stream` is not a regular dependency because its install script builds a
native addon. It is installed separately with scripts disabled (only the
prebuilt WebAssembly parser is used) and pinned to 1.3.0: later releases
changed the `wires` structure that `src/app/common/vcd-viewer/vcdrom.js` and
`@wavedrom/doppler` 0.5 consume. `npm install` prunes it again, so re-run the
command after installing packages.
