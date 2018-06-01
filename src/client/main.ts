console.log('TS IS SOURCED');
import { App } from './classes/App.class';

function main() {
  let $board: any = document.getElementById('board');
  console.log($board);
  const app = new App(10, 10, $board);
  app.run();
}

window.onload = () => {
  main();
};
