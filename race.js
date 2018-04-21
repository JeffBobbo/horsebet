const S_WAITING = 0;
const S_RUNNING = 1;
const S_OVER = 2;
class Race
{
  constructor(horses)
  {
    this.length = 2.0;
    this.entrants = horses;
    this.state = S_WAITING;
  }

  start()
  {
    this.state = S_RUNNING;
  }

  inProgress()
  {
    return this.state === S_RUNNING;
  }

  idle(delta)
  {
    if (this.state !== S_RUNNING)
      return;
    for (const horse of this.entrants)
    {
      horse.move(delta);
      if (horse.progress() > this.length)
        this.state = S_OVER;
    }
  }

  winning()
  {
    if (this.state === S_WAITING)
      return null;

    let best = null;
    for (let i = 0, l = this.entrants.length; i < l; ++i)
    {
      const horse = this.entrants[i];
      if (best === null || horse.progress() > this.entrants[best].progress())
        best = i;
    }
    return best;
  }

  winner()
  {
    if (this.state !== S_OVER)
      return null;
    return this.winning();
  }

  horses()
  {
    return this.entrants;
  }

  distance()
  {
    return this.length;
  }
}
