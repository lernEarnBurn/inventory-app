import random from "https://cdn.skypack.dev/random";
import seedrandom from "https://cdn.skypack.dev/seedrandom";
import {config} from './config.js';

class TinySpecksPattern {
  static get inputProperties() {
    return [
      "--pattern-seed",
      "--pattern-colors",
      "--pattern-speck-count",
      "--pattern-speck-min-size",
      "--pattern-speck-max-size"
    ];
  }

  paint(ctx, geometry, props) {
    const { width, height } = geometry;
    
    const seed = config['--pattern-seed'].initialValue;
    const colors = config['--pattern-colors'].initialValue.map((c) => c);
    const count = config['--pattern-speck-count'].initialValue;
    const minSize = config['--pattern-speck-min-size'].initialValue;
    const maxSize = config['--pattern-speck-max-size'].initialValue;


    random.use(seedrandom(seed));

    for (let i = 0; i < count; i++) {
      const x = random.float(0, width);
      const y = random.float(0, height);
      const radius = random.float(minSize, maxSize);

      ctx.fillStyle = colors[random.int(0, colors.length - 1)];

      ctx.save();

      ctx.translate(x, y);
      ctx.rotate(((random.float(0, 360) * 180) / Math.PI) * 2);
      ctx.translate(-x, -y);

      ctx.beginPath();
      ctx.ellipse(x, y, radius, radius / 2, 0, Math.PI * 2, 0);
      ctx.fill();

      ctx.restore();
    }
  }
}

if (typeof registerPaint !== "undefined") {
  registerPaint("tinySpecksPattern", TinySpecksPattern);
}