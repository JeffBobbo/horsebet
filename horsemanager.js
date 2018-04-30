class HorseManager
{
  constructor()
  {
    this.horses = [];

    let names = ['Lightning', 'Rocinante', 'Seabiscuit', 'Traveller', 'Sir Barton', 'Red Rum', 'Ballabriggs', 'Roger', 'Glory', 'Speedy', 'Tallulah', 'Crusade\'s Promise', 'Captain', 'Black Gardenia', 'Ducky Fuzz', 'Little Pink', 'Ziggy', 'Bebee', 'Harley', 'Maximus', 'Digby'];
    let numbers = [];
    for (let i = 1; i<= 30; ++i)
      numbers.push(i);
    shuffle(numbers);
    let id = 0;
    for (const n of names)
      this.horses.push(new Horse(n, id++, numbers.pop()));
  }

  [Symbol.iterator]()
  {
    return {
      next: () => {
        if (this.index < this.horses.length)
          return {value: this.horses[this.index++], done: false};
        else
        {
          this.index = 0;
          return {value: null, done: true};
        }
      }
    };
  };

  at(idx)
  {
    return this.horses[idx];
  }

  count()
  {
    return this.horses.length;
  }

  choose(n)
  {
    let a = [];
    for (let i = 0; i < this.count(); ++i)
      a.push(i);

    shuffle(a);
    let r = [];
    for (let i = 0; i < n; ++i)
      r.push(this.horses[a[i]]);
    return r;
  }
}
