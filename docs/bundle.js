(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fps_1 = require("./fps");
var Animation = /** @class */ (function () {
    function Animation(canvas) {
        var _this = this;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.fps = new fps_1.Fps(this.ctx);
        this.x = 100;
        canvas.addEventListener('ontouchstart' in document.documentElement ? 'touchstart' : 'click', function (event) {
            event.preventDefault();
            if ('ontouchstart' in document.documentElement) {
                if (event.touches && event.touches.length > 0) {
                    _this.clickX = event.touches[0].pageX;
                    _this.clickY = event.touches[0].pageY;
                }
            }
            else {
                _this.clickX = event.clientX;
                _this.clickY = event.clientY;
            }
        });
    }
    Animation.prototype.animate = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.animate(); });
        var ctx = this.ctx;
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
    };
    Animation.prototype.drawCircle = function (x, y) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 30, 0, Math.PI * 2, false);
        this.ctx.stroke();
    };
    Animation.prototype.drawSmile = function () {
        var ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
        ctx.moveTo(110, 75);
        ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
        ctx.moveTo(65, 65);
        ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
        ctx.moveTo(95, 65);
        ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
        ctx.stroke();
    };
    Animation.prototype.drawSpeechBalloon = function () {
        var ctx = this.ctx;
        ctx.beginPath();
        ctx.moveTo(75, 25);
        ctx.quadraticCurveTo(25, 25, 25, 62.5);
        ctx.quadraticCurveTo(25, 100, 50, 100);
        ctx.quadraticCurveTo(50, 120, 30, 125);
        ctx.quadraticCurveTo(60, 120, 65, 100);
        ctx.quadraticCurveTo(125, 100, 125, 62.5);
        ctx.quadraticCurveTo(125, 25, 75, 25);
        ctx.stroke();
    };
    return Animation;
}());
exports.Animation = Animation;

},{"./fps":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fps = /** @class */ (function () {
    function Fps(ctx) {
        this.ctx = ctx;
        this.frameCount = 0;
        this.fillStyle = 'black';
        this.font = '15px Arial';
        this.textAlign = 'center';
        this.x = 5;
        this.y = 15;
    }
    Fps.prototype.draw = function () {
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.font = this.font;
        this.ctx.textAlign = this.textAlign;
        this.ctx.fillText("FPS: " + (this.fps !== undefined ? this.fps : '-'), this.x, this.y);
    };
    Fps.prototype.update = function () {
        if (this.lastRefreshTime === undefined) {
            this.lastRefreshTime = performance.now();
        }
        else if (performance.now() - this.lastRefreshTime < 1000) {
            this.frameCount++;
        }
        else {
            this.lastRefreshTime = performance.now();
            this.fps = this.frameCount;
            this.frameCount = 0;
        }
    };
    return Fps;
}());
exports.Fps = Fps;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resize_canvas_1 = require("./resize-canvas");
var animation_1 = require("./animation");
var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
resize_canvas_1.resizeCanvas(canvas, window.innerWidth, window.innerHeight);
window.addEventListener('resize', function () { return resize_canvas_1.resizeCanvas(canvas, window.innerWidth, window.innerHeight); }, true);
window.addEventListener('orientationchange', function () { return setTimeout(function () { return resize_canvas_1.resizeCanvas(canvas, window.innerWidth, window.innerHeight); }, 500); });
var animation = new animation_1.Animation(canvas);
animation.animate();

},{"./animation":1,"./resize-canvas":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PIXEL_RATIO = (function () {
    var ctx = document.createElement('canvas').getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    var bsr = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;
    return dpr / bsr;
})();
exports.resizeCanvas = function (canvasElement, width, height) {
    canvasElement.width = width * PIXEL_RATIO;
    canvasElement.height = height * PIXEL_RATIO;
    canvasElement.style.width = width + 'px';
    canvasElement.style.height = height + 'px';
    canvasElement.getContext('2d').setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
};

},{}]},{},[3]);
