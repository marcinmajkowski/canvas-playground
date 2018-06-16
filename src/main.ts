const PIXEL_RATIO = (() => {
  const ctx: any = document.createElement('canvas').getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const bsr = ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio || 1;
  return dpr / bsr;
})();

const resizeCanvas = (canvasElement: HTMLCanvasElement, width: number, height: number) => {
  canvasElement.width = width * PIXEL_RATIO;
  canvasElement.height = height * PIXEL_RATIO;
  canvasElement.style.width = width + 'px';
  canvasElement.style.height = height + 'px';
  canvasElement.getContext('2d').setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
}

const c = document.createElement('canvas');
document.body.appendChild(c);
resizeCanvas(c, window.innerWidth, window.innerHeight);

window.addEventListener('resize', () => resizeCanvas(c, window.innerWidth, window.innerHeight), true);
window.addEventListener('orientationchange', () => setTimeout(() => resizeCanvas(c, window.innerWidth, window.innerHeight), 500));

const ctx = c.getContext('2d');

let x = 100;
let lastCalledTime: number;
let frameCount: number;
let fps = '- fps';
const animate = () => {
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
