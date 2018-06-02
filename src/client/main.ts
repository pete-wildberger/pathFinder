console.log('TS IS SOURCED');
import { App } from './classes/App.class';

function main() {
  let $board: any = document.getElementById('board');
  let $turn: any = document.getElementById('turn');
  const app = new App(10, 10, $board);
  $turn.addEventListener('click', app.run, false);
  console.log($board);
  app.init();
}

window.onload = () => {
  main();
};
