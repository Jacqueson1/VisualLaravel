import './style.css';
import { steps } from './steps.js';

const $ = (id) => document.getElementById(id);
let current = 0;

function render() {
  const s = steps[current];
  $('title').textContent = s.title;
  $('caption').textContent = s.caption;
  $('file').textContent = s.file;
  $('code').textContent = s.code;
  $('back').disabled = current === 0;
  $('next').disabled = current === steps.length - 1;
}

function go(i) {
  current = Math.min(Math.max(i, 0), steps.length - 1);
  render();
}

$('back').onclick = () => go(current - 1);
$('next').onclick = () => go(current + 1);

render();