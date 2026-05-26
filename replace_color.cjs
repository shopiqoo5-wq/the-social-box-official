const Jimp = require('jimp');

async function main() {
  try {
    const image = await Jimp.read('public/images/client-logos/logo18.png');
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      const a = this.bitmap.data[idx + 3];

      // Replace dark pixels with white, keeping anti-aliasing edges somewhat intact
      // We check if it's very dark.
      if (a > 10 && r < 60 && g < 60 && b < 60) {
        this.bitmap.data[idx + 0] = 255;
        this.bitmap.data[idx + 1] = 255;
        this.bitmap.data[idx + 2] = 255;
      }
    });
    await image.writeAsync('public/images/client-logos/logo18.png');
    console.log('Successfully replaced black with white.');
  } catch (err) {
    console.error(err);
  }
}
main();
