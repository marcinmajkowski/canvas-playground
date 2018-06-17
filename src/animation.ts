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

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.beginPath();
    this.ctx.arc(this.x, 200, 30, 0, Math.PI * 2, false);
    this.ctx.strokeStyle = 'blue';
    this.ctx.stroke();
    this.x++;

    this.ctx.fillStyle = 'blue';
    this.ctx.font = "30px Arial";
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`${this.canvas.width} x ${this.canvas.height}`, 100, 200);

    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);

    this.fps.x = this.canvas.width / 2;
    this.fps.update();
    this.fps.draw();
  }
}