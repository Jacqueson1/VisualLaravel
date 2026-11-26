import { gsap } from 'gsap';
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const S = 40; // half-width of a cube's top face
const D = 36; // cube height

const stations = [
  { name: 'Browser', sub: 'the form' },
  { name: 'Route', sub: 'routes/web.php' },
  { name: 'Controller', sub: 'PostController' },
  { name: 'Model', sub: 'Post' },
  { name: 'Database', sub: 'posts table' },
  { name: 'View', sub: 'posts list' }
].map((s, i) => ({ ...s, x: 110 + i * 136, y: 110 + i * 46 }));

let pkg, row, tl;
const pos = (i) => ({ x: stations[i].x, y: stations[i].y - 40 });

// One isometric cube, centered on (0,0)
function cube(s, d) {
  const top   = `0,${-s / 2} ${s},0 0,${s / 2} ${-s},0`;
  const left  = `${-s},0 0,${s / 2} 0,${s / 2 + d} ${-s},${d}`;
  const right = `0,${s / 2} ${s},0 ${s},${d} 0,${s / 2 + d}`;
  return `<polygon class="left" points="${left}"/>
          <polygon class="right" points="${right}"/>
          <polygon class="top" points="${top}"/>`;
}

export function buildScene(el) {
  const track = stations.map((s) => `${s.x},${s.y}`).join(' ');
  el.innerHTML = `
    <svg viewBox="0 0 900 430" role="img" aria-label="A request travelling through Laravel">
      <polyline class="track" points="${track}"/>
      ${stations.map((s) => `
        <g class="station" transform="translate(${s.x},${s.y})">
          ${cube(S, D)}
          <text class="name" y="${S / 2 + D + 20}" text-anchor="middle">${s.name}</text>
          <text class="subtext" y="${S / 2 + D + 37}" text-anchor="middle">${s.sub}</text>
        </g>`).join('')}
      <g id="row" opacity="0" transform="translate(${stations[4].x},${stations[4].y - 78})">
        <rect x="-46" y="-12" width="92" height="22" rx="4"/>
        <text text-anchor="middle" y="3">new row</text>
      </g>
      <g id="pkg">${cube(14, 12)}</g>
    </svg>`;
  pkg = el.querySelector('#pkg');
  row = el.querySelector('#row');
  gsap.set(pkg, pos(0));
}

export function setActive(i) {
  document.querySelectorAll('.station').forEach((n, k) => {
    n.classList.toggle('active', k === i);
  });
}

export function goTo(step) {
  tl?.kill();
  pkg.classList.remove('failed');
  const d = reduce ? 0 : 0.9;
  tl = gsap.timeline();

  tl.to(pkg, { ...pos(step.at), duration: d, ease: 'power2.inOut' });

  if (step.fail) {
    tl.add(() => pkg.classList.add('failed'))
      .add(() => setActive(0))
      .to(pkg, { ...pos(0), duration: d, ease: 'power2.in' }, '+=0.3')
      .to(pkg, { x: '+=8', repeat: 5, yoyo: true, duration: reduce ? 0 : 0.05 });
  }

  tl.to(row, { opacity: step.row ? 1 : 0, duration: reduce ? 0 : 0.4 }, 0.4);
}