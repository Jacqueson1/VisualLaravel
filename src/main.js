import './style.css';
import hljs from 'highlight.js/lib/core';
import php from 'highlight.js/lib/languages/php';
import sql from 'highlight.js/lib/languages/sql';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/tokyo-night-dark.css';
import { steps } from './steps.js';
import { buildScene, setActive } from './scene.js';

hljs.registerLanguage('php', php);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('xml', xml);

const $ = (id) => document.getElementById(id);
let current = 0;
buildScene($('scene'));
// Build one dot button per step

$('dots').innerHTML = steps
  .map((s, i) => `<button class="dot" data-i="${i}" aria-label="Step ${i + 1}: ${s.title}">${i + 1}</button>`)
  .join('');

function render() {
  const s = steps[current];
  setActive(s.at);
  $('title').textContent = s.title;
  $('caption').textContent = s.caption;
  $('file').textContent = s.file;
  $('code').innerHTML = hljs.highlight(s.code, { language: s.lang }).value;

  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('current', i === current);
    d.classList.toggle('done', i < current);
  });

  $('back').disabled = current === 0;
  $('next').disabled = current === steps.length - 1;
}

function go(i) {
  current = Math.min(Math.max(i, 0), steps.length - 1);
  render();
}

$('back').onclick = () => go(current - 1);
$('next').onclick = () => go(current + 1);
$('dots').onclick = (e) => {
  const dot = e.target.closest('.dot');
  if (dot) go(Number(dot.dataset.i));
};
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') go(current + 1);
  if (e.key === 'ArrowLeft') go(current - 1);
});

render();