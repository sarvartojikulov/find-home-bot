interface Options {
  price: MinMax;
  size: MinMax;
  rooms: MinMax;
}

interface MinMax {
  min: number;
  max: number;
}

export default Options;
