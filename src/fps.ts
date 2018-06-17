export class Fps {

  private lastRefreshTime: number;
  private frameCount = 0;
  private fps: number;

  fillStyle = 'black';
  font = '15px Arial';
  textAlign = 'center';
  x = 5;
  y = 15;

  constructor(private ctx: CanvasRenderingContext2D) {
  }

  draw(): void {
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.font = this.font;
    this.ctx.textAlign = this.textAlign;
    this.ctx.fillText(`FPS: ${this.fps !== undefined ? this.fps : '-'}`, this.x, this.y);
  }

  update(): void {
    if (this.lastRefreshTime === undefined) {
      this.lastRefreshTime = performance.now();
    } else if (performance.now() - this.lastRefreshTime < 1000) {
      this.frameCount++;
    } else {
      this.lastRefreshTime = performance.now();
      this.fps = this.frameCount;
      this.frameCount = 0;
    }
  }
}