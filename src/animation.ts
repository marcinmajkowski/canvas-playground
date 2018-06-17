import { Fps } from './fps';

export class Animation {

  private readonly ctx = this.canvas.getContext('2d');
  private readonly fps = new Fps(this.ctx);
  private x = 100;
  private clickX: number;
  private clickY: number;

  constructor(private canvas: HTMLCanvasElement) {
    canvas.addEventListener('ontouchstart' in document.documentElement ? 'touchstart' : 'click', (event: MouseEvent & TouchEvent) => {
      event.preventDefault();
      if ('ontouchstart' in document.documentElement) {
        if (event.touches && event.touches.length > 0) {
          this.clickX = event.touches[0].pageX;
          this.clickY = event.touches[0].pageY;
        }
      } else {
        this.clickX = event.clientX;
        this.clickY = event.clientY;
      }
    });
  }

  animate(): void {
    requestAnimationFrame(() => this.animate());

    const ctx = this.ctx;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    this.drawCircle(this.x++, 200);

    if (this.clickX !== undefined && this.clickY !== undefined) {
      ctx.save();
      ctx.strokeStyle = 'red';
      this.drawCircle(this.clickX, this.clickY);
      ctx.restore();
    }

    ctx.save();
    ctx.translate(0, 70);
    ctx.strokeStyle = 'blue';
    this.drawSmile();
    ctx.restore();

    ctx.save();
    ctx.translate(100, 0);
    this.drawSpeechBalloon();
    ctx.restore();

    var rectangle = new Path2D();
    rectangle.rect(10, 10, 50, 50);

    var circle = new Path2D();
    circle.moveTo(125, 35);
    circle.arc(100, 35, 25, 0, 2 * Math.PI);

    ctx.stroke(rectangle);
    ctx.fill(circle);

    var p = new Path2D('M10 10 h 80 v 80 h -80 Z');
    ctx.strokeStyle = 'black';
    ctx.stroke(p);

    this.fps.x = window.innerWidth / 2;
    this.fps.update();
    this.fps.draw();
  }

  private drawCircle(x: number, y: number): void {
    this.ctx.beginPath();
    this.ctx.arc(x, y, 30, 0, Math.PI * 2, false);
    this.ctx.stroke();
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