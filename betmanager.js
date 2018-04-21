class BetManager
{
  constructor()
  {
    this.bets = [];

    // the take the betting shop gets
    this.take = 0.05;
  }

  add(bet)
  {
    for (let i = 0; i < this.bets.length; ++i)
    {
      let b = this.bets[i];
      if (bet.owner == b.owner && bet.on == b.on) // this two bets are the same
      {
        if (bet.amount === 0) // if the new amount is 0, remove the bet
          this.bets.splice(i, 1);
        else // otherwise, just replace it
          this.bets[i] = bet;
        return;
      }
    }
    // otherwise, just push it on the end
    this.bets.push(bet);
  }

  amount(on)
  {
    let r = 0.0;
    for (const bet of this.bets)
    {
      if (on == null || on === bet.on)
        r += bet.amount;
    }
    return r;
  }

  against(on)
  {
    return this.amount() - this.amount(on);
  }

  contribution(bet)
  {
    return bet.amount / this.amount(bet.on);
  }

  payout(bet)
  {
    return bet.amount + this.against(bet.on) * (1.0 - this.take) * this.contribution(bet);
  }

  odds(on)
  {
    return 1.0 / (this.amount(on) / this.against(on));
  }

  cut(bet)
  {
    return this.against(bet.on) * this.take;
  }

  winners(on)
  {
    let r = [];
    for (const bet of this.bets)
    {
      if (bet.on === on)
        r.push(bet);
    }
    return r;
  }
}
