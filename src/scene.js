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
    </svg>`;
}

export function setActive(i) {
  document.querySelectorAll('.station').forEach((n, k) => {
    n.classList.toggle('active', k === i);
  });
}