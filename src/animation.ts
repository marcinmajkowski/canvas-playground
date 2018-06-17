import { Fps } from './fps';

export class Animation {

  private readonly ctx = this.canvas.getContext('2d');
  private readonly fps = new Fps(this.ctx);
  private x = 100;

  constructor(private canvas: HTMLCanvasElement) {
  }

  animate(): void {
    requestAnimationFrame(() => this.animate());

    const ctx = this.ctx;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    this.ctx.beginPath();
    this.ctx.arc(this.x, 200, 30, 0, Math.PI * 2, false);
    this.ctx.strokeStyle = 'blue';
    this.ctx.stroke();
    this.x++;

    this.ctx.fillStyle = 'blue';
    this.ctx.font = '30px Arial';
    this.ctx.textAlign = 'start';
    this.ctx.fillText(`${this.canvas.width} x ${this.canvas.height}`, 100, 200);
    this.ctx.fillText(`${window.innerWidth} x ${window.innerHeight}`, 100, 300);

    ctx.strokeStyle = 'black';
    this.drawSmile();
    ctx.strokeStyle = 'green';
    this.drawSpeechBalloon();

    this.fps.x = window.innerWidth / 2;
    this.fps.update();
    this.fps.draw();
  }

  private drawSmile(): void {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
    ctx.strokeStyle = 'red';
    ctx.stroke();
  }

  private drawSpeechBalloon(): void {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(75, 25);
    ctx.quadraticCurveTo(25, 25, 25, 62.5);
    ctx.quadraticCurveTo(25, 100, 50, 100);
    ctx.quadraticCurveTo(50, 120, 30, 125);
    ctx.quadraticCurveTo(60, 120, 65, 100);
    ctx.quadraticCurveTo(125, 100, 125, 62.5);
    ctx.quadraticCurveTo(125, 25, 75, 25);
    ctx.stroke();
  }
}