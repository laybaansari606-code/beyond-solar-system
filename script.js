import * as THREE from "three";
console.log("BEYOND NEW SCRIPT IS RUNNING");
console.log("Three.js version:", THREE.REVISION);

// ==========================================
// BEYOND — SOLAR SYSTEM EXPLORER
// ==========================================

const space = document.getElementById("space");
const loadingScreen = document.getElementById("loadingScreen");

const scene = new THREE.Scene();
scene.background = null;
scene.fog = new THREE.FogExp2(0x03040a, 0.003);

const camera = new THREE.PerspectiveCamera(
  42,
  window.innerWidth / window.innerHeight,
  0.1,
  600
);

camera.position.set(0, 17, 39);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  powerPreference: "high-performance"
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;

space.appendChild(renderer.domElement);

// ==========================================
// PLANET DATA
// ==========================================

const planetsData = [
  {
    name: "MERCURY",
    kicker: "THE FIRST WORLD",
    description: "Mercury is the smallest planet and the closest to the Sun. It has an extremely thin exosphere, so it cannot retain heat or protect its surface like Earth's atmosphere does. Daytime temperatures can reach 430°C, while nights can fall to around -180°C. Its surface is covered with craters, much like our Moon. Humans cannot survive there without a specially designed, pressurised and temperature-controlled habitat. Its year lasts just 88 Earth days.",
    diameter: "4,879 km",
    day: "58.6 Earth days",
    distance: "57.9M km",
    fact: "Mercury experiences extreme temperature changes between day and night.",
    color: 0x9b9389,
    atmosphere: 0x9b9389,
    radius: 0.42,
    orbit: 4.2,
    speed: 0.42,
    texture: "mercury",
    tilt: 0.03
  },
  {
    name: "VENUS",
    kicker: "THE VEILED PLANET",
    description: "Venus has a dense atmosphere made mostly of carbon dioxide, with clouds of corrosive sulfuric acid. Its powerful greenhouse effect makes it the hottest planet, with surface temperatures around 465°C. Atmospheric pressure at the surface is roughly 92 times Earth's sea-level pressure. Humans could not survive on its surface without extraordinary protective technology. Interestingly, the upper atmosphere has temperatures and pressures that are much less extreme than those at the ground. Venus also rotates backwards compared with most planets.",
    diameter: "12,104 km",
    day: "243 Earth days",
    distance: "108.2M km",
    fact: "Venus rotates in the opposite direction to most planets.",
    color: 0xd6a36a,
    atmosphere: 0xf2c18a,
    radius: 0.68,
    orbit: 6.1,
    speed: 0.29,
    texture: "venus",
    tilt: 0.08
  },
  {
    name: "EARTH",
    kicker: "OUR PALE BLUE DOT",
    description: "Earth is the only planet currently known to support life. Its atmosphere contains about 78% nitrogen and 21% oxygen, allowing humans to breathe without special equipment at sea level. Liquid water, a protective magnetic field and a relatively stable climate help make life possible. Average surface temperature is about 15°C, although conditions vary widely by location. Humans can survive naturally across many regions, but extreme environments still require protection. Earth is approximately 4.54 billion years old and is home to an extraordinary diversity of life.",
    diameter: "12,742 km",
    day: "23h 56m",
    distance: "149.6M km",
    fact: "Earth is the only world currently known to support life.",
    color: 0x367dd9,
    atmosphere: 0x5bafff,
    radius: 0.73,
    orbit: 8.3,
    speed: 0.21,
    texture: "earth",
    tilt: 0.41
  },
  {
    name: "MARS",
    kicker: "THE RED PLANET",
    description: "Mars is a cold, rocky desert world with a thin atmosphere composed mostly of carbon dioxide. Surface pressure is less than 1% of Earth's average sea-level pressure, so humans cannot breathe its air. Temperatures average around -65°C and can drop much lower, while dust storms sometimes spread across the planet. Liquid water is unstable on most of the surface today, although water ice exists. Humans would need pressurised habitats, oxygen, radiation protection and reliable heating to live there. Mars is also home to Olympus Mons, one of the largest volcanoes in the Solar System.",
    diameter: "6,779 km",
    day: "24h 37m",
    distance: "227.9M km",
    fact: "Olympus Mons on Mars is the tallest known volcano in the Solar System.",
    color: 0xc76542,
    atmosphere: 0xe98b68,
    radius: 0.55,
    orbit: 10.5,
    speed: 0.16,
    texture: "mars",
    tilt: 0.44
  },
  {
    name: "JUPITER",
    kicker: "KING OF THE PLANETS",
    description: "Jupiter is the largest planet, made mainly of hydrogen and helium, with no solid surface like Earth's. Its atmosphere contains powerful cloud bands, enormous storms and the famous Great Red Spot. Temperatures and pressures become increasingly extreme deeper inside the planet. Humans could not stand or live on Jupiter without protection, and its intense radiation belts pose an additional danger. Strong winds and crushing pressure make exploration extremely challenging. Jupiter also has a large family of moons, including Europa, which may have a subsurface ocean.",
    diameter: "139,820 km",
    day: "9h 56m",
    distance: "778.6M km",
    fact: "Jupiter's Great Red Spot is a giant storm that has persisted for centuries.",
    color: 0xc89b78,
    atmosphere: 0xe4b99a,
    radius: 1.48,
    orbit: 13.5,
    speed: 0.09,
    texture: "jupiter",
    tilt: 0.08
  },
  {
    name: "SATURN",
    kicker: "THE RINGED GIANT",
    description: "Saturn is a giant planet made mostly of hydrogen and helium, best known for its spectacular rings of ice and rocky particles. It has no solid surface on which humans could stand, and atmospheric pressure rises to dangerous levels deeper inside. Temperatures in its upper atmosphere are extremely cold, generally around -140°C near the cloud tops. Humans cannot breathe its atmosphere or survive there without specialised technology. Saturn's rings are wide but remarkably thin compared with their enormous diameter. Its moon Titan has a thick atmosphere and lakes of liquid methane and ethane.",
    diameter: "116,460 km",
    day: "10h 42m",
    distance: "1.43B km",
    fact: "Saturn's average density is lower than that of water.",
    color: 0xd7bd88,
    atmosphere: 0xf0d6a4,
    radius: 1.22,
    orbit: 17.2,
    speed: 0.067,
    texture: "saturn",
    tilt: 0.47,
    rings: true
  },
  {
    name: "URANUS",
    kicker: "THE ICE GIANT",
    description: "Uranus is an ice giant with an atmosphere dominated by hydrogen and helium, along with methane that gives it a blue-green appearance. Its atmosphere becomes colder and denser with depth, and the planet has no accessible solid surface for humans. Temperatures near the cloud tops can fall to around -224°C, among the coldest measured in the Solar System. Humans could not breathe there and would need extreme thermal and pressure protection. Uranus rotates on its side, with an axial tilt of about 98 degrees. It also has faint rings and a collection of moons.",
    diameter: "50,724 km",
    day: "17h 14m",
    distance: "2.87B km",
    fact: "Uranus has an extreme axial tilt of roughly 98 degrees.",
    color: 0x86d5dc,
    atmosphere: 0xa8f0f0,
    radius: 0.95,
    orbit: 20.6,
    speed: 0.047,
    texture: "uranus",
    tilt: 1.71
  },
  {
    name: "NEPTUNE",
    kicker: "THE WINDY FRONTIER",
    description: "Neptune is a distant ice giant with a deep blue appearance and an atmosphere made mostly of hydrogen, helium and methane. It experiences some of the fastest winds in the Solar System, reaching over 2,000 kilometres per hour. Its cloud tops are extremely cold, around -200°C, and conditions become more hostile deeper inside. Humans cannot breathe its atmosphere or survive its cold and pressure without advanced life-support systems. Neptune receives very little sunlight because of its great distance from the Sun. Its moon Triton is especially interesting because it orbits in the opposite direction to Neptune's rotation.",
    diameter: "49,244 km",
    day: "16h 6m",
    distance: "4.50B km",
    fact: "Neptune's winds can exceed 2,000 kilometres per hour.",
    color: 0x355edb,
    atmosphere: 0x719aff,
    radius: 0.92,
    orbit: 23.7,
    speed: 0.037,
    texture: "neptune",
    tilt: 0.49
  }
];

const sunRadius = 2.05;

let selectedPlanet = 2;
let isOverview = true;
let isPaused = false;
let soundEnabled = false;
let elapsed = 0;
let animationSpeed = 1;

const planetObjects = [];
const clickableObjects = [];
const orbitLines = [];

// ==========================================
// LIGHTING
// ==========================================

scene.add(new THREE.AmbientLight(0x8194c5, 0.32));

const sunLight = new THREE.PointLight(0xffd5a0, 190, 220, 1.25);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

const fillLight = new THREE.DirectionalLight(0x9abaff, 0.65);
fillLight.position.set(-8, 12, 15);
scene.add(fillLight);

// ==========================================
// PROCEDURAL TEXTURES — FALLBACK
// ==========================================

function createPlanetTexture(type, baseColor) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;

  const ctx = canvas.getContext("2d");
  const base = new THREE.Color(baseColor);

  const rgb = `rgb(${Math.round(base.r * 255)},${Math.round(
    base.g * 255
  )},${Math.round(base.b * 255)})`;

  ctx.fillStyle = rgb;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (["jupiter", "saturn", "venus", "uranus", "neptune"].includes(type)) {
    const palettes = {
      jupiter: ["#7d5140", "#d4b69a", "#e7cdb0", "#9e7058", "#c79b79"],
      saturn: ["#aa9067", "#e7d2a5", "#c8ae7e", "#f1dfb7", "#a78b64"],
      venus: ["#b98554", "#e4c08d", "#f0d2a1", "#c99b6b"],
      uranus: ["#6dbbc7", "#a0e1e2", "#8acfd7", "#b7eded"],
      neptune: ["#183eac", "#426fe0", "#2249c2", "#6e91ff"]
    };

    const colors = palettes[type] || palettes.neptune;

    for (let i = 0; i < 100; i++) {
      const y = (i / 100) * canvas.height;
      const bandHeight = canvas.height / 100 + Math.random() * 7;

      ctx.globalAlpha = 0.18 + Math.random() * 0.4;
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.fillRect(0, y, canvas.width, bandHeight);
    }

    ctx.globalAlpha = 1;

    if (type === "jupiter") {
      ctx.fillStyle = "#a95136";
      ctx.beginPath();
      ctx.ellipse(680, 315, 55, 27, -0.18, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(255,220,180,0.4)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.ellipse(680, 315, 65, 32, -0.18, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  if (type === "earth") {
    ctx.fillStyle = "#164a91";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 95; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const rx = 12 + Math.random() * 65;
      const ry = 8 + Math.random() * 32;

      ctx.beginPath();
      ctx.ellipse(
        x, y, rx, ry,
        Math.random() * Math.PI,
        0, Math.PI * 2
      );

      ctx.fillStyle = Math.random() > 0.3 ? "#508451" : "#a4a16b";
      ctx.fill();
    }

    const ice = ctx.createLinearGradient(0, 0, 0, canvas.height);
    ice.addColorStop(0, "rgba(240,250,255,0.9)");
    ice.addColorStop(0.12, "rgba(240,250,255,0)");
    ice.addColorStop(0.88, "rgba(240,250,255,0)");
    ice.addColorStop(1, "rgba(240,250,255,0.85)");

    ctx.fillStyle = ice;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  if (type === "mars" || type === "mercury") {
    for (let i = 0; i < 2500; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * (type === "mars" ? 6 : 4);

      ctx.globalAlpha = Math.random() * 0.3;
      ctx.fillStyle = type === "mars" ? "#612c20" : "#3c3938";

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  }

  const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = image.data;

  for (let i = 0; i < pixels.length; i += 4) {
    const noise = (Math.random() - 0.5) * 15;
    pixels[i] = Math.max(0, Math.min(255, pixels[i] + noise));
    pixels[i + 1] = Math.max(0, Math.min(255, pixels[i + 1] + noise));
    pixels[i + 2] = Math.max(0, Math.min(255, pixels[i + 2] + noise));
  }

  ctx.putImageData(image, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

  return texture;
}

// ==========================================
// REAL PLANET TEXTURES
// Solar System Scope — CC BY 4.0
// ==========================================

const realPlanetTextureUrls = {
  mercury: "./templates/2k_mercury.jpg",
  venus: "./templates/2k_venus_atmosphere.jpg",
  earth: "./templates/2k_earth_daymap.jpg",
  mars: "./templates/2k_mars.jpg",
  jupiter: "./templates/2k_jupiter.jpg",
  saturn: "./templates/2k_saturn.jpg",
  uranus: "./templates/2k_uranus.jpg",
  neptune: "./templates/2k_neptune.jpg"
};

const realTextureLoader = new THREE.TextureLoader();
realTextureLoader.setCrossOrigin("anonymous");

function loadPlanetTexture(type, baseColor) {
  const fallbackTexture = createPlanetTexture(type, baseColor);
  const url = realPlanetTextureUrls[type];

  if (!url) return fallbackTexture;

  realTextureLoader.load(
    url,
    (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

      const planet = planetObjects.find((item) => item.data.texture === type);

      if (planet) {
        planet.mesh.material.map = texture;
        planet.mesh.material.color.set(0xffffff);
        planet.mesh.material.needsUpdate = true;
      }
    },
    undefined,
    (error) => {
      console.warn(`Could not load ${type} texture. Using fallback.`, error);
    }
  );

  return fallbackTexture;
}

// ==========================================
// STAR FIELD
// ==========================================

function createStarField() {
  const count = 6500;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const colorChoices = [
    new THREE.Color(0xffffff),
    new THREE.Color(0xa9c8ff),
    new THREE.Color(0xffdcb5),
    new THREE.Color(0xc4d8ff)
  ];

  for (let i = 0; i < count; i++) {
    const radius = 40 + Math.random() * 200;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.cos(phi);
    positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

    const color = colorChoices[
      Math.floor(Math.random() * colorChoices.length)
    ];

    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  geometry.setAttribute(
    "color",
    new THREE.BufferAttribute(colors, 3)
  );

  const material = new THREE.PointsMaterial({
    size: 0.17,
    vertexColors: true,
    transparent: true,
    opacity: 0.88,
    sizeAttenuation: true,
    depthWrite: false
  });

  const stars = new THREE.Points(geometry, material);
  scene.add(stars);

  return stars;
}

const stars = createStarField();

// ==========================================
// SUN AND GLOW
// ==========================================

const sunGroup = new THREE.Group();
scene.add(sunGroup);

const sunTextureCanvas = document.createElement("canvas");
sunTextureCanvas.width = 1024;
sunTextureCanvas.height = 512;

const sunCtx = sunTextureCanvas.getContext("2d");

const sunGradient = sunCtx.createLinearGradient(0, 0, 1024, 512);
sunGradient.addColorStop(0, "#ff8b2d");
sunGradient.addColorStop(0.5, "#ffe5a0");
sunGradient.addColorStop(1, "#ff9b38");

sunCtx.fillStyle = sunGradient;
sunCtx.fillRect(0, 0, 1024, 512);

for (let i = 0; i < 1800; i++) {
  sunCtx.globalAlpha = Math.random() * 0.25;
  sunCtx.fillStyle = Math.random() > 0.5 ? "#fff1bb" : "#f45c17";
  sunCtx.beginPath();
  sunCtx.arc(
    Math.random() * 1024,
    Math.random() * 512,
    1 + Math.random() * 9,
    0,
    Math.PI * 2
  );
  sunCtx.fill();
}

sunCtx.globalAlpha = 1;

const sunTexture = new THREE.CanvasTexture(sunTextureCanvas);
sunTexture.colorSpace = THREE.SRGBColorSpace;

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(sunRadius, 96, 96),
  new THREE.MeshBasicMaterial({
    map: sunTexture,
    color: 0xffe0a0,
    toneMapped: false
  })
);

sunGroup.add(sun);

// Soft, continuous glow texture
const glowCanvas = document.createElement("canvas");
glowCanvas.width = 512;
glowCanvas.height = 512;

const glowCtx = glowCanvas.getContext("2d");
const center = 256;

const glowGradient = glowCtx.createRadialGradient(
  center, center, 12,
  center, center, 250
);

glowGradient.addColorStop(0, "rgba(255,245,195,0.95)");
glowGradient.addColorStop(0.12, "rgba(255,195,85,0.75)");
glowGradient.addColorStop(0.3, "rgba(255,125,35,0.34)");
glowGradient.addColorStop(0.58, "rgba(255,85,20,0.10)");
glowGradient.addColorStop(1, "rgba(255,70,10,0)");

glowCtx.fillStyle = glowGradient;
glowCtx.fillRect(0, 0, 512, 512);

// Subtle irregular rays
for (let i = 0; i < 180; i++) {
  const angle = Math.random() * Math.PI * 2;
  const innerRadius = 115 + Math.random() * 65;
  const outerRadius = 185 + Math.random() * 65;
  const width = 0.003 + Math.random() * 0.009;

  const x1 = center + Math.cos(angle - width) * innerRadius;
  const y1 = center + Math.sin(angle - width) * innerRadius;
  const x2 = center + Math.cos(angle + width) * innerRadius;
  const y2 = center + Math.sin(angle + width) * innerRadius;
  const x3 = center + Math.cos(angle) * outerRadius;
  const y3 = center + Math.sin(angle) * outerRadius;

  glowCtx.beginPath();
  glowCtx.moveTo(x1, y1);
  glowCtx.lineTo(x3, y3);
  glowCtx.lineTo(x2, y2);

  glowCtx.fillStyle = Math.random() > 0.5
    ? "rgba(255,190,85,0.10)"
    : "rgba(255,105,25,0.07)";

  glowCtx.fill();
}

const glowTexture = new THREE.CanvasTexture(glowCanvas);

const sunGlowMaterial = new THREE.SpriteMaterial({
  map: glowTexture,
  color: 0xffffff,
  transparent: true,
  opacity: 0.85,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  toneMapped: false
});

const sunGlow = new THREE.Sprite(sunGlowMaterial);
sunGlow.scale.set(10.5, 10.5, 1);
sunGlow.renderOrder = -1;
sunGroup.add(sunGlow);

// ==========================================
// ORBIT PATHS
// ==========================================

function createOrbit(radius) {
  const points = [];

  for (let i = 0; i <= 256; i++) {
    const angle = (i / 256) * Math.PI * 2;

    points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      )
    );
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({
    color: 0x52668c,
    transparent: true,
    opacity: 0.21
  });

  const line = new THREE.LineLoop(geometry, material);
  scene.add(line);
  orbitLines.push(line);
}

// ==========================================
// SATURN'S RINGS
// ==========================================

function createSaturnRings(radius) {
  const group = new THREE.Group();

  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 128;

  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 2048, 0);

  gradient.addColorStop(0.00, "rgba(155,128,91,0.00)");
  gradient.addColorStop(0.06, "rgba(180,151,108,0.35)");
  gradient.addColorStop(0.12, "rgba(224,201,157,0.78)");
  gradient.addColorStop(0.19, "rgba(194,167,124,0.68)");
  gradient.addColorStop(0.25, "rgba(112,96,73,0.40)");
  gradient.addColorStop(0.30, "rgba(226,207,170,0.88)");
  gradient.addColorStop(0.38, "rgba(207,184,143,0.72)");
  gradient.addColorStop(0.43, "rgba(80,70,55,0.18)");
  gradient.addColorStop(0.46, "rgba(55,49,41,0.08)");
  gradient.addColorStop(0.49, "rgba(225,205,166,0.86)");
  gradient.addColorStop(0.58, "rgba(194,170,132,0.70)");
  gradient.addColorStop(0.66, "rgba(120,103,78,0.38)");
  gradient.addColorStop(0.73, "rgba(231,213,177,0.82)");
  gradient.addColorStop(0.82, "rgba(191,166,127,0.65)");
  gradient.addColorStop(0.91, "rgba(220,195,151,0.48)");
  gradient.addColorStop(1.00, "rgba(155,128,91,0.00)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 650; i++) {
    const x = Math.random() * canvas.width;
    const alpha = Math.random() * 0.12;
    const width = 1 + Math.random() * 3;

    ctx.fillStyle = `rgba(55,45,32,${alpha})`;
    ctx.fillRect(x, 0, width, canvas.height);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(
      radius * 1.35,
      radius * 2.35,
      384
    ),
    new THREE.MeshBasicMaterial({
      map: texture,
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
      toneMapped: false
    })
  );

  ring.rotation.x = -Math.PI / 2.3;
  ring.renderOrder = 2;
  group.add(ring);

  return group;
}

// ==========================================
// BUILD THE PLANETS
// ==========================================

planetsData.forEach((data, index) => {
  createOrbit(data.orbit);

  const pivot = new THREE.Group();
  scene.add(pivot);

  const planetGroup = new THREE.Group();
  planetGroup.position.x = data.orbit;
  planetGroup.rotation.z = data.tilt;
  pivot.add(planetGroup);

  const texture = loadPlanetTexture(data.texture, data.color);

  const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: data.name === "EARTH" ? 0.82 : 0.95,
    metalness: 0,
    color: 0xffffff
  });

  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(data.radius, 96, 96),
    material
  );

  mesh.rotation.z = 0.12;
  mesh.userData.planetIndex = index;
  planetGroup.add(mesh);

  // Earth's moving cloud layer
  if (data.name === "EARTH") {
    const cloudCanvas = document.createElement("canvas");
    cloudCanvas.width = 512;
    cloudCanvas.height = 256;

    const cloudCtx = cloudCanvas.getContext("2d");
    cloudCtx.clearRect(0, 0, 512, 256);

    for (let i = 0; i < 220; i++) {
      cloudCtx.globalAlpha = 0.08 + Math.random() * 0.25;
      cloudCtx.fillStyle = "#ffffff";
      cloudCtx.beginPath();
      cloudCtx.ellipse(
        Math.random() * 512,
        Math.random() * 256,
        3 + Math.random() * 18,
        2 + Math.random() * 7,
        Math.random(),
        0,
        Math.PI * 2
      );
      cloudCtx.fill();
    }

    cloudCtx.globalAlpha = 1;

    const cloudTexture = new THREE.CanvasTexture(cloudCanvas);
    cloudTexture.colorSpace = THREE.SRGBColorSpace;

    const cloudMesh = new THREE.Mesh(
      new THREE.SphereGeometry(data.radius * 1.012, 64, 64),
      new THREE.MeshStandardMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.26,
        roughness: 1,
        depthWrite: false
      })
    );

    mesh.add(cloudMesh);
    mesh.userData.cloudMesh = cloudMesh;
  }

  if (data.rings) {
    const rings = createSaturnRings(data.radius);
    mesh.add(rings);
    mesh.userData.rings = rings;
  }

  planetObjects.push({
    data,
    pivot,
    planetGroup,
    mesh,
    index,
    baseAngle: index * 0.83 + Math.random() * 0.4
  });

  clickableObjects.push(mesh);
});

// ==========================================
// INTERACTION HELPERS
// ==========================================

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(-2, -2);

const mouse = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0
};

let hoveredPlanet = null;

window.addEventListener("pointermove", (event) => {
  mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;

  pointer.x = mouse.targetX;
  pointer.y = mouse.targetY;

  const tooltip = document.getElementById("tooltip");
  if (tooltip) {
    tooltip.style.left = `${event.clientX + 14}px`;
    tooltip.style.top = `${event.clientY + 14}px`;
  }
});

renderer.domElement.addEventListener("pointermove", () => {
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(clickableObjects, false);
  const tooltip = document.getElementById("tooltip");

  if (hits.length > 0) {
    const index = hits[0].object.userData.planetIndex;
    hoveredPlanet = index;
    document.body.style.cursor = "pointer";

    if (tooltip) {
      tooltip.textContent = planetsData[index].name;
      tooltip.style.display = "block";
    }
  } else {
    hoveredPlanet = null;
    document.body.style.cursor = "default";

    if (tooltip) tooltip.style.display = "none";
  }
});

renderer.domElement.addEventListener("click", () => {
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(clickableObjects, false);

  if (hits.length > 0) {
    selectPlanet(hits[0].object.userData.planetIndex);
  }
});

// ==========================================
// CAMERA TARGETS
// ==========================================

const cameraTarget = {
  position: new THREE.Vector3(0, 17, 39),
  lookAt: new THREE.Vector3(0, 0, 0)
};

const currentLookAt = new THREE.Vector3(0, 0, 0);

function focusPlanet(index) {
  const planet = planetObjects[index];
  const worldPosition = new THREE.Vector3();

  planet.mesh.getWorldPosition(worldPosition);

  const framingRadius = planet.data.rings
    ? planet.data.radius * 2.6
    : planet.data.radius;

  const distance = Math.max(5.5, framingRadius * 3.5);

  const direction = new THREE.Vector3(0.12, 0.14, 1).normalize();

  cameraTarget.position
    .copy(worldPosition)
    .addScaledVector(direction, distance);

  cameraTarget.lookAt.copy(worldPosition);
}

function resetCamera() {
  cameraTarget.position.set(0, 17, 39);
  cameraTarget.lookAt.set(0, 0, 0);
}
// ==========================================
// UI: PLANET SELECTOR
// ==========================================

const planetList = document.getElementById("planetList");
const planetProgress = document.getElementById("planetProgress");

planetsData.forEach((planet, index) => {
  const button = document.createElement("button");
  button.className = "planet-option";
  button.type = "button";
  button.setAttribute("aria-label", `Explore ${planet.name}`);

  const orb = document.createElement("span");
  orb.className = "planet-orb";
  orb.style.background =
    `radial-gradient(circle at 30% 25%, #ffffff66, transparent 30%), ${new THREE.Color(planet.color).getStyle()}`;

  const name = document.createElement("span");
  name.className = "planet-option-name";
  name.textContent = planet.name.slice(0, 3);

  button.append(orb, name);

  button.addEventListener("click", () => {
    selectPlanet(index);
  });

  planetList.appendChild(button);

  const progress = document.createElement("span");
  progress.className = "progress-dot";
  planetProgress.appendChild(progress);
});

// ==========================================
// UI: PLANET INFORMATION
// ==========================================

function updatePlanetPanel(index) {
  const planet = planetsData[index];

  document.getElementById("planetIndex").textContent =
    `PLANET ${String(index + 1).padStart(2, "0")} / 08`;

  document.getElementById("planetNumber").textContent =
    String(index + 1).padStart(2, "0");

  document.getElementById("planetKicker").textContent = planet.kicker;
  document.getElementById("planetName").textContent = planet.name;
  document.getElementById("planetDescription").textContent =
    planet.description;
  document.getElementById("planetDiameter").textContent = planet.diameter;
  document.getElementById("planetDay").textContent = planet.day;
  document.getElementById("planetDistance").textContent = planet.distance;
  document.getElementById("planetFact").textContent = planet.fact;

  document.getElementById("sceneLabel").textContent =
    `SOL SYSTEM / ${String(index + 1).padStart(3, "0")}`;

  document.querySelectorAll(".planet-option").forEach((button, i) => {
    button.classList.toggle("active", i === index);
  });

  document.querySelectorAll(".progress-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function selectPlanet(index) {
  selectedPlanet = (index + planetsData.length) % planetsData.length;
  isOverview = false;

  updatePlanetPanel(selectedPlanet);

  document.body.classList.remove("focus-mode");
  document.getElementById("planetPanel").classList.add("visible");

  focusPlanet(selectedPlanet);
}

function nextPlanet() {
  selectPlanet(selectedPlanet + 1);
}

function previousPlanet() {
  selectPlanet(selectedPlanet - 1);
}

document.getElementById("nextPlanet").addEventListener("click", nextPlanet);
document.getElementById("previousPlanet").addEventListener("click", previousPlanet);

document.getElementById("exploreButton").addEventListener("click", () => {
  selectPlanet(selectedPlanet);
});

document.getElementById("overviewButton").addEventListener("click", () => {
  isOverview = true;

  document.getElementById("planetPanel").classList.remove("visible");
  document.body.classList.remove("focus-mode");

  resetCamera();
});

// ==========================================
// AMBIENT SOUND — SYNTHESIZED, OPTIONAL
// ==========================================

let audioContext = null;
let oscillator = null;
let gainNode = null;

document.getElementById("soundButton").addEventListener("click", async () => {
  if (!soundEnabled) {
    try {
      audioContext = audioContext || new AudioContext();

      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      oscillator = audioContext.createOscillator();
      gainNode = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = 54;
      gainNode.gain.value = 0.012;

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.start();

      soundEnabled = true;

      document.getElementById("soundLabel").textContent = "SOUND ON";
    } catch (error) {
      console.warn("Audio could not be started:", error);
    }
  } else {
    if (oscillator) {
      oscillator.stop();
      oscillator.disconnect();
      oscillator = null;
    }

    if (gainNode) {
      gainNode.disconnect();
      gainNode = null;
    }

    soundEnabled = false;
    document.getElementById("soundLabel").textContent = "SOUND OFF";
  }
});

// ==========================================
// PAUSE / RESUME ORBITS
// ==========================================

window.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !event.repeat) {
    event.preventDefault();
    isPaused = !isPaused;
  }

  if (event.key === "ArrowRight") nextPlanet();
  if (event.key === "ArrowLeft") previousPlanet();

  if (event.key === "Escape") {
    isOverview = true;
    document.getElementById("planetPanel").classList.remove("visible");
    document.body.classList.remove("focus-mode");
    resetCamera();
  }
});

// ==========================================
// RESPONSIVE CANVAS
// ==========================================

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
});

// ==========================================
// ANIMATION LOOP
// ==========================================

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = Math.min(clock.getDelta(), 0.05);
  elapsed += delta;

  if (!isPaused) {
    // Sun rotation and gentle glow animation
    sun.rotation.y += delta * 0.035;
    sunGlow.material.rotation += delta * 0.012;

    sunGlow.material.opacity =
      0.80 + Math.sin(elapsed * 1.15) * 0.045;

    const glowScale = 10.5 + Math.sin(elapsed * 0.8) * 0.16;
    sunGlow.scale.set(glowScale, glowScale, 1);

    // Planet orbits and axial rotations
    planetObjects.forEach((planet) => {
      planet.pivot.rotation.y +=
        delta * planet.data.speed * animationSpeed;

      planet.mesh.rotation.y += delta * 0.09;

      if (planet.mesh.userData.cloudMesh) {
        planet.mesh.userData.cloudMesh.rotation.y += delta * 0.025;
      }

      if (planet.mesh.userData.rings) {
        planet.mesh.userData.rings.rotation.z += delta * 0.002;
      }
    });

    stars.rotation.y += delta * 0.002;
  }

  // ==========================================
  // CONTINUOUS PLANET CAMERA TRACKING
  // ==========================================

  if (!isOverview) {
    const planet = planetObjects[selectedPlanet];

    if (planet) {
      const worldPosition = new THREE.Vector3();
      planet.mesh.getWorldPosition(worldPosition);

      const framingRadius = planet.data.rings
        ? planet.data.radius * 2.6
        : planet.data.radius;

      const distance = Math.max(5.5, framingRadius * 3.5);

      const direction = new THREE.Vector3(0.12, 0.14, 1)
        .normalize();

      cameraTarget.position
        .copy(worldPosition)
        .addScaledVector(direction, distance);

      cameraTarget.lookAt.copy(worldPosition);
    }
  }

  // ==========================================
  // SMOOTH CURSOR PARALLAX
  // ==========================================

  mouse.x += (mouse.targetX - mouse.x) * 0.035;
  mouse.y += (mouse.targetY - mouse.y) * 0.035;

  const parallaxStrength = isOverview ? 1 : 0.025;

  const targetX =
    cameraTarget.position.x + mouse.x * 1.2 * parallaxStrength;

  const targetY =
    cameraTarget.position.y + mouse.y * 0.7 * parallaxStrength;

  const cameraEase = isOverview ? 0.035 : 0.14;

  camera.position.x +=
    (targetX - camera.position.x) * cameraEase;

  camera.position.y +=
    (targetY - camera.position.y) * cameraEase;

  camera.position.z +=
    (cameraTarget.position.z - camera.position.z) * cameraEase;

  const lookX =
    cameraTarget.lookAt.x + mouse.x * 0.5 * parallaxStrength;

  const lookY =
    cameraTarget.lookAt.y + mouse.y * 0.3 * parallaxStrength;

  const lookEase = isOverview ? 0.03 : 0.14;

  currentLookAt.x +=
    (lookX - currentLookAt.x) * lookEase;

  currentLookAt.y +=
    (lookY - currentLookAt.y) * lookEase;

  currentLookAt.z +=
    (cameraTarget.lookAt.z - currentLookAt.z) * lookEase;

  camera.lookAt(currentLookAt);

  // Gentle solar luminosity variation
  sunLight.intensity = 190 + Math.sin(elapsed * 0.7) * 2.5;

  // Decorative coordinates
  const longitude = Math.round((mouse.x + 1) * 90);
  const latitude = Math.round(mouse.y * 45);

  const coordinates = document.getElementById("coordinates");

  if (coordinates) {
    coordinates.textContent =
      `${Math.abs(latitude)}° ${String(longitude).padStart(2, "0")}' COSMIC`;
  }

  renderer.render(scene, camera);
}

// ==========================================
// START
// ==========================================

updatePlanetPanel(selectedPlanet);

setTimeout(() => {
  loadingScreen.classList.add("hidden");
}, 900);

animate();