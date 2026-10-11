// zone.js and @angular/localize/init are listed in angular.json's polyfills
// so the CLI can recognise them; this file only carries the Node-style
// globals that vcd-stream's browser build and the readable-stream polyfill
// expect to find on window.
import process from 'process';

(window as any).global = window;
window.process = process;
