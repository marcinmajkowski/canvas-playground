import { resizeCanvas } from './resize-canvas';
import { Fps } from './fps';

const c = document.createElement('canvas');
document.body.appendChild(c);
resizeCanvas(c, window.innerWidth, window.innerHeight);

window.addEventListener('resize', () => resizeCanvas(c, window.innerWidth, window.innerHeight), true);
window.addEventListener('orientationchange', () => setTimeout(() => resizeCanvas(c, window.innerWidth, window.innerHeight), 500));

const ctx = c.getContext('2d');

let x = 100;
const fps = new Fps(ctx);
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

  ctx.fillStyle = 'blue';
  ctx.font = "30px Arial";
  ctx.fillText(`${c.width} x ${c.height}`, 100, 200);

  fps.update();
  fps.draw();
}

animate();
