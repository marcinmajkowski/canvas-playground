import { resizeCanvas } from './resize-canvas';
import { Animation } from './animation';

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
resizeCanvas(canvas, window.innerWidth, window.innerHeight);

window.addEventListener('resize', () => resizeCanvas(canvas, window.innerWidth, window.innerHeight), true);
window.addEventListener('orientationchange', () => setTimeout(() => resizeCanvas(canvas, window.innerWidth, window.innerHeight), 500));

const animation = new Animation(canvas);
animation.animate();