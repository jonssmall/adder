const gates = {
  AND: function(...inputs) { return inputs.every(i => i) },
  OR: function(...inputs) { return inputs.some(i => i) },
  NOR: function(...inputs) { return !this.NOR(...inputs) },
  NAND: function(...inputs) { return !this.AND(...inputs) },
  XOR: function(...inputs) { return this.AND(this.OR(...inputs), this.NAND(...inputs)) }
};

const halfAdder = (a, b) => {
  return {
    sumOut: gates.XOR(a,b),
    carryOut: gates.AND(a,b)
  };
};

const fullAdder = (a, b, carryIn) => {
  const half1 = halfAdder(a,b);
  const half2 = halfAdder(carryIn, half1.sumOut);
  return {
    sumOut: half2.sumOut,
    carryOut: gates.OR(half1.carryOut, half2.carryOut)
  };
};

// const inputs = {
//   a: [0,1,0,0,1,1,0,0],
//   b: [1,1,1,0,0,1,1,0]
// };

const machine = (rows) => {
  const first = fullAdder(rows.a[0], rows.b[0], 0);
  return rows.a.slice(1).reduce((acc, e,i,a) => {
    return [...acc, fullAdder(rows.a[i+1], rows.b[i+1], acc[i].carryOut)];
  }, [first]);
};

export default machine;