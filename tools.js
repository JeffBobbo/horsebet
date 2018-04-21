function rand_b()
{
  return Math.random() > 0.5;
}

function rand_f(min, max)
{
  if (max === undefined || max === null)
    throw "Max undefined";

  return Math.random() * (max - min) + min;
}

function rand_i(min, max)
{
  if (max === undefined || max === null)
    throw "Max undefined";

  min = Math.floor(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(array)
{
  const len = array.length;
  const swap = (array, a, b) => {
    array[a] = array.splice(b, 1, array[a])[0];
  };

  for (let i = len - 1; i >= 1; --i)
    swap(array, i, rand_i(0, i+1));
}
