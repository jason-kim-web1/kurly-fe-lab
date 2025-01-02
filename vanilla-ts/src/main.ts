import './style.css';
import { setupCounter } from './counter.ts';

import dom from './dom.ts';

let count = 0;

function Button() {
  return dom('button')
    .attr('type', 'button')
    .attr('id', 'counter')
    .children(`${count}`)
    .on('click', (e) => {
      count++;
      (e.target as HTMLButtonElement).textContent = `${count}`;
    })
    .get();
}

function Card() {
  return dom('div')
    .attr('class', 'card')
    .children(Button())
    .get();
}

function Description() {
  return dom('div')
    .attr('class', 'read-the-docs')
    .children('Click on the Vite and TypeScript logos to learn more')
    .get();
}

function App() {
  const root = dom('div');
  root.children(
    Card(),
    Description()
  );
  return root.get();
}

document.querySelector<HTMLDivElement>('#app')!.append(App());

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);