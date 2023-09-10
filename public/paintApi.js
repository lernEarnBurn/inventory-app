
registerPaint('painty', class {
  paint(ctx, geom) {
    const circleSize = 10; 
    const bodyWidth = geom.width;
    const bodyHeight = geom.height;


    const maxX = Math.floor(bodyWidth / circleSize);
    const maxY = Math.floor(bodyHeight / circleSize); 

    for (let y = 0; y < maxY; y++) {
      for (let x = 0; x < maxX; x++) {
        ctx.fillStyle = '#0ca847';
        ctx.beginPath();
        ctx.arc(x * circleSize * 2 + circleSize, y * circleSize * 2 + circleSize, circleSize, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();
      }
    }
  }
});