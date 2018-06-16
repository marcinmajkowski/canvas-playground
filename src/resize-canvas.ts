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

export const resizeCanvas = (canvasElement: HTMLCanvasElement, width: number, height: number) => {
  canvasElement.width = width * PIXEL_RATIO;
  canvasElement.height = height * PIXEL_RATIO;
  canvasElement.style.width = width + 'px';
  canvasElement.style.height = height + 'px';
  canvasElement.getContext('2d').setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
}