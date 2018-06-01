console.log('TS IS SOURCED');
import * as $ from 'jquery';
import { App } from './classes/App.class';

$(onReady)
function onReady(){
  main()
}

function main() {
  const app = new App(10, 10);
  app.run();
};
