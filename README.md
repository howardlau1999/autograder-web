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
prebuilt WebAssembly parser is used) and pinned to the release that
`src/app/common/vcd-viewer/vcdrom.js` is written against (currently 1.5.0,
matching upstream [vcdrom](https://github.com/wavedrom/vcdrom)). `npm install`
prunes it again, so re-run the command after installing packages.

### VCD viewer

`vcdrom.js` is a port of vcdrom's browser glue: `vcd-stream` parses the file
into a description object, `@wavedrom/doppler` renders the waves (WebGL 2) and
`waveql` provides the CodeMirror 6 signal list. doppler's theme is mounted
scoped to the viewer element so that it does not restyle the rest of the
application.
