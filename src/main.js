import './style.css';
import hljs from 'highlight.js/lib/core';
import php from 'highlight.js/lib/languages/php';
import sql from 'highlight.js/lib/languages/sql';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/tokyo-night-dark.css';
import { lessons } from './steps.js';
import { buildScene, setActive, goTo } from './scene.js';

hljs.registerLanguage('php', php);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('xml', xml);

const $ = (id) => document.getElementById(id);
let lesson = lessons[0];
let current = 0;

buildScene($('scene'));

// Lesson picker: plain links. The URL does the work.
$('lessons').innerHTML = lessons
  .map((l) => `<a class="tab" href="#/${l.id}/1" data-id="${l.id}">${l.name}</a>`)
  .join('');

// Turn the URL (#/read/3) into state
function readHash() {
  const [, id, n] = location.hash.split('/');
  lesson = lessons.find((l) => l.id === id) ?? lessons[0];
  const i = (Number(n) || 1) - 1;
  current = Math.min(Math.max(i, 0), lesson.steps.length - 1);
}

function render() {
  const s = lesson.steps[current];
  document.title = lesson.title;
  $('lesson-title').textContent = lesson.title;
  $('tagline').textContent = lesson.tagline;
  $('title').textContent = s.title;
  $('caption').textContent = s.caption;
  $('file').textContent = s.file;
  $('code').innerHTML = hljs.highlight(s.code, { language: s.lang }).value;

  document.querySelectorAll('.tab').forEach((t) => {
    t.classList.toggle('current', t.dataset.id === lesson.id);
  });

  // Rebuild the dots, because each lesson has a different number of steps
  $('dots').innerHTML = lesson.steps
    .map((st, i) => {
      const cls = i === current ? ' current' : i < current ? ' done' : '';
      const aria = i === current ? 'step' : 'false';
      return `<button class="dot${cls}" data-i="${i}" aria-current="${aria}" aria-label="Step ${i + 1}: ${st.title}">${i + 1}</button>`;
    })
    .join('');

  $('back').disabled = current === 0;
  $('next').disabled = current === lesson.steps.length - 1;

  setActive(s.at);
  goTo(s);
}

// Changing the step = changing the URL. The hashchange listener does the rest.
function go(i) {
  const n = Math.min(Math.max(i, 0), lesson.steps.length - 1);
  location.hash = `/${lesson.id}/${n + 1}`;
}

window.addEventListener('hashchange', () => {
  readHash();
  render();
});

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

readHash();
render();