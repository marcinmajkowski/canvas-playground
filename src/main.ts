import { sayHello } from './greet';

function showHello(divName: string, name: string) {
  const elt = document.getElementById(divName);
  elt.innerText = sayHello(name);
}

// showHello('greeting', 'TypeScript');

var PIXEL_RATIO = (function () {
  var ctx: any = document.createElement("canvas").getContext("2d"),
    dpr = window.devicePixelRatio || 1,
    bsr = ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio || 1;

  return dpr / bsr;
})();


const resizeHiDPICanvas = function (can: HTMLCanvasElement, w: any, h: any) {
  can.width = w * PIXEL_RATIO;
  can.height = h * PIXEL_RATIO;
  can.style.width = w + "px";
  can.style.height = h + "px";
  can.getContext("2d").setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
}

const c = document.createElement('canvas');
resizeHiDPICanvas(c, window.innerWidth, window.innerHeight)
document.body.appendChild(c);

window.addEventListener('resize', () => resizeHiDPICanvas(c, window.innerWidth, window.innerHeight), true);
window.addEventListener('orientationchange', () => {
  // on orientationchange innerWidth and innerHeight are stale
  setTimeout(() => {
    resizeHiDPICanvas(c, window.innerWidth, window.innerHeight);
    window.scrollTo(0, 1);
  }, 500);
});

const ctx = c.getContext('2d');

let x = 100;
let lastCalledTime: number;
let frameCount: number;
let fps = '- fps';
function animate() {
  requestAnimationFrame(animate);

  ctx.fillStyle = '#ffff00';
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.strokeStyle = 'red';
  ctx.strokeRect(0, 0, c.width, c.height);
  ctx.beginPath();
  ctx.arc(x, 200, 30, 0, Math.PI * 2, false);
  ctx.strokeStyle = 'blue';
  ctx.stroke();
  x++;

  if (lastCalledTime === undefined) {
    lastCalledTime = performance.now();
    frameCount = 0;
  } else if (performance.now() - lastCalledTime < 1000) {
    frameCount++;
  } else {
    lastCalledTime = performance.now();
    fps = `${Math.round(frameCount)} fps`;
    frameCount = 0;
  }

  ctx.fillStyle = 'black';
  ctx.font = "30px Arial";
  ctx.fillText(fps, 100, 100);
  ctx.fillText(`${c.width} x ${c.height}`, 100, 200);
}

animate();
