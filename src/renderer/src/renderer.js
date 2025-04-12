import { hello } from './hello.js';

function init() {
  window.addEventListener('DOMContentLoaded', () => {
    hello();
  })
}

init()
