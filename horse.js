let colours = ['black', 'brown', 'golden', 'gray', 'white'];
const HORSE_SIZE = 64;
let PIXEL_PER_KM = 800;
const MIN_SPEED = 16 * 60.0 / 3600.0;
const MAX_SPEED = 16 * 70.0 / 3600.0;

class Horse
{
  constructor(name, id, number)
  {
    this.name = name;
    this.id = id;
    this.num = number;
    this.image = colours[rand_i(0, colours.length-1)];

    this.dist = 0;
    this.maxSpeed = rand_f(MIN_SPEED, MAX_SPEED);
    this.motivation = 1.0;
  }

  move(delta)
  {
    if (this.dist < race.distance())
      this.dist += (this.maxSpeed * this.motivation) * (delta / 1000.0);
  }

  draw(cvs, ctx)
  {
    const IMAGE_SIZE = 128;

    if (race.inProgress())
    {
      const GALLOP_ROW = 13;
      const GALLOP_FRAMES = 11;
      const GALLOP_TIME = 500;

      const fTime = (performance.now() * (this.maxSpeed * this.motivation * 2.5)) % GALLOP_TIME;
      const frame = Math.floor(fTime / (GALLOP_TIME / GALLOP_FRAMES));

      ctx.drawImage(this.image,
                    (frame % 4) * IMAGE_SIZE, // source x
                    (GALLOP_ROW + Math.floor(frame / 4)) * IMAGE_SIZE, // source y
                    IMAGE_SIZE,
                    IMAGE_SIZE,
                    this.dist * PIXEL_PER_KM, // x coord
                    0, // y coord
                    HORSE_SIZE, // width to draw at
                    HORSE_SIZE // height to draw at
      );
    }
    else
    {
      const IDLE_ROW = 12;
      const IDLE_FRAMES = 12;
      const IDLE_TIME = 4000;

      const fTime = (performance.now() * (1.0 + this.name.length / 10)) % IDLE_TIME;
      const frame = 3 - Math.min(Math.abs(Math.floor(fTime / (IDLE_TIME / IDLE_FRAMES)) - IDLE_FRAMES/2.0), 3);

      ctx.drawImage(this.image,
                    frame * IMAGE_SIZE, // source x
                    IDLE_ROW * IMAGE_SIZE, // source y
                    IMAGE_SIZE,
                    IMAGE_SIZE,
                    this.dist * PIXEL_PER_KM, // x coord
                    0, // y coord
                    HORSE_SIZE, // width to draw at
                    HORSE_SIZE // height to draw at
      );
    }

    ctx.font = "12px Arial";
    ctx.textAlign = "left";
    ctx.fillStyle = this.won() ? "black" : "white";
    ctx.fillText(this.name, 6, HORSE_SIZE - 6);
  }

  won()
  {
    return this.dist > race.distance();
  }

  progress()
  {
    return this.dist;
  }
}
