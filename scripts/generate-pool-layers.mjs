import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "public", "builder");

const shapes = {
  rectangular: {
    path: "M340 400h900a40 40 0 0 1 40 40v260a40 40 0 0 1-40 40h-900a40 40 0 0 1-40-40v-260a40 40 0 0 1 40-40z",
    lights: [
      [480, 560],
      [680, 560],
      [880, 560],
      [1080, 560],
      [780, 680],
    ],
    spa: { cx: 1230, cy: 430, r: 72 },
    fountain: { x: 220, y: 500, s: 88, aim: { x: 460, y: 560 } },
  },
  "l-shape": {
    path: "M300 360h520v150h420a36 36 0 0 1 36 36v190a36 36 0 0 1-36 36h-940a36 36 0 0 1-36-36v-340a36 36 0 0 1 36-36z",
    lights: [
      [460, 500],
      [680, 500],
      [980, 640],
      [1160, 640],
      [520, 680],
    ],
    spa: { cx: 1180, cy: 400, r: 68 },
    fountain: { x: 190, y: 460, s: 82, aim: { x: 400, y: 520 } },
  },
  lap: {
    path: "M160 470h1280a28 28 0 0 1 28 28v84a28 28 0 0 1-28 28h-1280a28 28 0 0 1-28-28v-84a28 28 0 0 1 28-28z",
    lights: [
      [320, 540],
      [560, 540],
      [800, 540],
      [1040, 540],
      [1280, 540],
    ],
    spa: { cx: 1420, cy: 430, r: 64 },
    fountain: { x: 200, y: 350, s: 74, aim: { x: 300, y: 540 } },
  },
  custom: {
    path: "M420 390c120-70 360-90 560-40 180 46 250 150 220 250-40 130-210 210-460 200-220-10-390-90-430-210-30-90 10-150 110-200z",
    lights: [
      [560, 500],
      [760, 470],
      [960, 520],
      [860, 640],
      [640, 650],
    ],
    spa: { cx: 1120, cy: 400, r: 66 },
    fountain: { x: 250, y: 280, s: 78, aim: { x: 480, y: 450 } },
  },
};

const colors = {
  turquoise: ["#8ff3e8", "#14b8a6", "#0e7490"],
  "deep-blue": ["#93c5fd", "#3b82f6", "#1e3a8a"],
  midnight: ["#a5b4fc", "#6366f1", "#1e1b4b"],
  sand: ["#f6e7c1", "#e7c98a", "#a16207"],
  emerald: ["#a7f3d0", "#34d399", "#065f46"],
};

const decks = {
  travertine: { fill: "#f3e6cf", line: "#d9c7a4" },
  shellstone: { fill: "#d7b56a", line: "#b08a3e" },
  concrete: { fill: "#cfd3d1", line: "#a7adaa" },
  charcoal: { fill: "#3c444a", line: "#2a3136" },
  ipe: { fill: "#6e4126", line: "#4a2916" },
  bluestone: { fill: "#7f97a3", line: "#5d7380" },
};

const coping = {
  travertine: { fill: "#e6d3b4", line: "#c4b08a" },
  slate: { fill: "#3e4c59", line: "#2a3540" },
  teak: { fill: "#8d5a32", line: "#5c3a20" },
  brick: { fill: "#a34b3a", line: "#6e3126" },
  pavers: { fill: "#7d8b86", line: "#56625e" },
};

function shell(body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" fill="none">${body}</svg>`;
}

function water(shape, material, color) {
  const [hi, mid, lo] = colors[color];
  const tile =
    material === "glass-tile"
      ? `<pattern id="tile" width="36" height="36" patternUnits="userSpaceOnUse">
      <path d="M36 0H0V36" stroke="#ffffff" stroke-opacity="0.45" stroke-width="1.4"/>
    </pattern>`
      : "";
  const speckles =
    material === "diamond-brite"
      ? Array.from({ length: 48 }, (_, index) => {
          const x = 200 + ((index * 97) % 1200);
          const y = 380 + ((index * 53) % 380);
          return `<circle cx="${x}" cy="${y}" r="${index % 3 === 0 ? 1.6 : 1}" fill="#ffffff" fill-opacity="0.55"/>`;
        }).join("")
      : "";

  return shell(`
  <defs>
    <clipPath id="pool"><path d="${shape.path}"/></clipPath>
    <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${hi}"/>
      <stop offset="0.45" stop-color="${mid}"/>
      <stop offset="1" stop-color="${lo}"/>
    </linearGradient>
    ${tile}
  </defs>
  <g clip-path="url(#pool)">
    <rect width="1600" height="900" fill="url(#water)"/>
    ${material === "glass-tile" ? '<rect width="1600" height="900" fill="url(#tile)"/>' : speckles}
    <path d="${shape.path}" fill="none" stroke="${lo}" stroke-opacity="0.55" stroke-width="70"/>
    <ellipse cx="760" cy="470" rx="280" ry="28" fill="#ffffff" fill-opacity="0.2"/>
  </g>`);
}

function deckSvg(shape, material) {
  const tone = decks[material];
  const grain =
    material === "ipe"
      ? `<pattern id="deck" width="18" height="64" patternUnits="userSpaceOnUse">
      <rect width="18" height="64" fill="${tone.fill}"/>
      <path d="M9 0v64" stroke="${tone.line}" stroke-width="1"/>
    </pattern>`
      : `<pattern id="deck" width="46" height="24" patternUnits="userSpaceOnUse">
      <rect width="46" height="24" fill="${tone.fill}"/>
      <path d="M0 12h46M23 0v12M0 12v12" stroke="${tone.line}" stroke-width="1.2"/>
    </pattern>`;

  return shell(`
  <defs>${grain}</defs>
  <path d="${shape.path}" stroke="url(#deck)" stroke-width="220" stroke-linejoin="round"/>`);
}

function copingSvg(shape, material) {
  const tone = coping[material];
  const pattern =
    material === "travertine" || material === "teak" || material === "brick" || material === "pavers"
      ? `<pattern id="grain" width="28" height="14" patternUnits="userSpaceOnUse">
      <rect width="28" height="14" fill="${tone.fill}"/>
      <path d="M0 7h28M14 0v7M0 7v7" stroke="${tone.line}" stroke-width="1"/>
    </pattern>`
      : "";
  const stroke = pattern ? "url(#grain)" : tone.fill;

  return shell(`
  <defs>${pattern}</defs>
  <path d="${shape.path}" stroke="${stroke}" stroke-width="26" stroke-linejoin="round"/>
  <path d="${shape.path}" stroke="${tone.line}" stroke-opacity="0.45" stroke-width="2" stroke-linejoin="round"/>`);
}

function lights(shape, mode) {
  const circles = shape.lights
    .map(([x, y], index) => {
      if (mode === "white") {
        return `<circle cx="${x}" cy="${y}" r="22" fill="#fff6d8" fill-opacity="0.28"/>
        <circle cx="${x}" cy="${y}" r="6" fill="#fffaf0"/>`;
      }
      if (mode === "color") {
        const fill = index % 2 === 0 ? "#2ad9c3" : "#f0abfc";
        return `<circle cx="${x}" cy="${y}" r="20" fill="${fill}" fill-opacity="0.35"/>
        <circle cx="${x}" cy="${y}" r="5" fill="${fill}"/>`;
      }
      const colorsCycle = ["#2ad9c3", "#60a5fa", "#f472b6", "#facc15"];
      return `<circle cx="${x}" cy="${y}" r="18" fill="${colorsCycle[index % 4]}" fill-opacity="0.35">
        <animate attributeName="fill" values="#2ad9c3;#60a5fa;#f472b6;#facc15;#2ad9c3" dur="4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="${x}" cy="${y}" r="5" fill="${colorsCycle[index % 4]}">
        <animate attributeName="fill" values="#2ad9c3;#60a5fa;#f472b6;#facc15;#2ad9c3" dur="4s" repeatCount="indefinite"/>
      </circle>`;
    })
    .join("");

  return shell(`
  <defs><clipPath id="pool"><path d="${shape.path}"/></clipPath></defs>
  <g clip-path="url(#pool)">${circles}</g>`);
}

function spa(shape, material) {
  const { cx, cy, r } = shape.spa;
  const tone = coping[material];
  const x = cx - r;
  const y = cy - r;
  const size = r * 2;
  const rim = 18;
  return shell(`
  <rect x="${x}" y="${y}" width="${size}" height="${size}" rx="8" fill="${tone.fill}" stroke="${tone.line}" stroke-width="3"/>
  <rect x="${x + rim}" y="${y + rim}" width="${size - rim * 2}" height="${size - rim * 2}" rx="4" fill="#8ff3e8"/>
  <rect x="${x + rim + 10}" y="${y + rim + 10}" width="${size - (rim + 10) * 2}" height="${size - (rim + 10) * 2}" rx="3" fill="#0e7490"/>
  <rect x="${x + rim + 8}" y="${y + rim + 6}" width="${Math.round(size * 0.28)}" height="8" rx="4" fill="#ffffff" fill-opacity="0.35"/>`);
}

function rimPoint(x, y, s, aim) {
  const cx = x + s / 2;
  const cy = y + s / 2;
  const dx = aim.x - cx;
  const dy = aim.y - cy;
  const half = s / 2;
  const scale = Math.abs(dx) / half > Math.abs(dy) / half ? half / Math.abs(dx) : half / Math.abs(dy);
  const round = (value) => Math.round(value * 10) / 10;
  return { x: round(cx + dx * scale), y: round(cy + dy * scale) };
}

function fountain(shape, material) {
  const { x, y, s, aim } = shape.fountain;
  const tone = coping[material];
  const start = rimPoint(x, y, s, aim);
  const end = aim;
  const mx = Math.round((start.x + end.x) / 2);
  const my = Math.round(Math.min(start.y, end.y) - 34);
  const arc = `M ${start.x} ${start.y} Q ${mx} ${my} ${end.x} ${end.y}`;
  const drops = [0, 0.4, 0.75]
    .map(
      (begin, index) => `<circle r="${4.5 - index}" fill="#d9fbff" fill-opacity="${[0.95, 0.8, 0.65][index]}">
      <animateMotion dur="1.15s" begin="${begin}s" repeatCount="indefinite" path="${arc}"/>
    </circle>`,
    )
    .join("");

  return shell(`
  <rect x="${x}" y="${y}" width="${s}" height="${s}" rx="6" fill="${tone.fill}" stroke="${tone.line}" stroke-width="3"/>
  <rect x="${x + 12}" y="${y + 12}" width="${s - 24}" height="${s - 24}" rx="3" fill="#9aebf2"/>
  <rect x="${x + 20}" y="${y + 20}" width="${s - 40}" height="${s - 40}" rx="2" fill="#12828c"/>
  <path d="${arc}" fill="none" stroke="#c8f7fb" stroke-width="2.5" stroke-linecap="round" stroke-opacity="0.8"/>
  ${drops}
  <ellipse cx="${end.x}" cy="${end.y}" rx="16" ry="6" fill="#ffffff" fill-opacity="0.4"/>`);
}

function bubbles(shape) {
  const dots = Array.from({ length: 26 }, (_, index) => {
    const [x, y] = shape.lights[index % shape.lights.length];
    const dx = ((index * 37) % 80) - 40;
    const dy = ((index * 19) % 70) - 20;
    const r = 3 + (index % 4);
    return `<circle cx="${x + dx}" cy="${y + dy}" r="${r}" fill="#ffffff" fill-opacity="0.75">
      <animate attributeName="cy" values="${y + dy};${y + dy - 18};${y + dy}" dur="${2 + (index % 3)}s" repeatCount="indefinite"/>
    </circle>`;
  }).join("");

  return shell(`
  <defs><clipPath id="pool"><path d="${shape.path}"/></clipPath></defs>
  <g clip-path="url(#pool)">${dots}</g>`);
}

await mkdir(outDir, { recursive: true });

const jobs = [];

for (const [shapeId, shape] of Object.entries(shapes)) {
  for (const material of ["diamond-brite", "glass-tile"]) {
    for (const color of Object.keys(colors)) {
      jobs.push(writeFile(path.join(outDir, `water-${shapeId}-${material}-${color}.svg`), water(shape, material, color)));
    }
  }
  for (const material of Object.keys(coping)) {
    jobs.push(writeFile(path.join(outDir, `coping-${shapeId}-${material}.svg`), copingSvg(shape, material)));
  }
  for (const material of Object.keys(decks)) {
    jobs.push(writeFile(path.join(outDir, `deck-${shapeId}-${material}.svg`), deckSvg(shape, material)));
  }
  for (const mode of ["white", "color", "rgb"]) {
    jobs.push(writeFile(path.join(outDir, `lights-${shapeId}-${mode}.svg`), lights(shape, mode)));
  }
  for (const material of Object.keys(coping)) {
    jobs.push(writeFile(path.join(outDir, `spa-${shapeId}-${material}.svg`), spa(shape, material)));
  }
  jobs.push(unlink(path.join(outDir, `fountain-${shapeId}.svg`)).catch(() => {}));
  for (const material of Object.keys(coping)) {
    jobs.push(writeFile(path.join(outDir, `fountain-${shapeId}-${material}.svg`), fountain(shape, material)));
  }
  jobs.push(writeFile(path.join(outDir, `bubbles-${shapeId}.svg`), bubbles(shape)));
}

await Promise.all(jobs);
console.log(`wrote ${jobs.length} layers`);
