import { Fps } from './fps';

export class Animation {

  private readonly ctx = this.canvas.getContext('2d');
  private readonly fps = new Fps(this.ctx);
  private x = 100;

  constructor(private canvas: HTMLCanvasElement) {
  }

  animate(): void {
    requestAnimationFrame(() => this.animate());

    this.ctx.fillStyle = '#ffff00';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = 'red';
    this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.arc(this.x, 200, 30, 0, Math.PI * 2, false);
    this.ctx.strokeStyle = 'blue';
    this.ctx.stroke();
    this.x++;

    this.ctx.fillStyle = 'blue';
    this.ctx.font = "30px Arial";
    this.ctx.fillText(`${this.canvas.width} x ${this.canvas.height}`, 100, 200);

    this.fps.update();
    this.fps.draw();
  }
}