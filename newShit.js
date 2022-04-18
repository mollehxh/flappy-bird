class Game {
  constructor({ entities }) {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.entities = entities;

    requestAnimationFrame(this.loop.bind(this));
  }

  update() {
    this.entities.forEach((entity) => {
      entity.update();
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.entities.forEach((entity) => {
      entity.draw(this.ctx);
    });
  }

  loop() {
    this.update();
    this.draw();

    requestAnimationFrame(this.loop.bind(this));
  }
}

class AnimatedSprite {
  constructor({ x, y, w, h, spriteSrc, animations }) {
    this.x = x;
    this.y = y;

    this.w = w;
    this.h = h;

    this.sprite = new Image();
    this.sprite.src = spriteSrc;

    this.animations = animations;

    this.currentAnimation = Object.keys(animations)[0];
    this.currentFrameIdx = 0;

    this.animationFrameLimit = 16;
    this.animationFrameProgress = this.animationFrameLimit;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentFrameIdx];
  }

  setAnimation(key) {
    if (this.currentAnimation === key) return;

    this.currentAnimation = key;
    this.currentFrameIdx = 0;
  }

  updateAnimation() {
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    this.animationFrameProgress = this.animationFrameLimit;
    this.currentFrameIdx += 1;

    if (this.frame === undefined) {
      this.currentFrameIdx = 0;
    }
  }

  draw(ctx) {
    const [frameX, frameY] = this.frame;

    ctx.drawImage(
      this.sprite,
      frameX * this.w,
      frameY * this.h,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }
}

class Player extends AnimatedSprite {
  constructor({ x, y, w, h, spriteSrc, animations }) {
    super({ x, y, w, h, spriteSrc, animations });
  }

  update() {
    this.updateAnimation();
    this.y += 0.5;
  }
}

const player = new Player({
  x: 0,
  y: 0,
  w: 34,
  h: 24,
  spriteSrc: './assets/yellowbird-fly.png',
  animations: {
    fly: [
      [0, 0],
      [1, 0],
      [2, 0],
      [1, 0],
    ],
  },
});

const game = new Game({ entities: [player] });
