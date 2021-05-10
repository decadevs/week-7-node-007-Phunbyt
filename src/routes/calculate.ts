interface Userpost {
  shape: string;
  dimension: number | Record<string, number>;
}

function validator(reqst: Userpost) {
const shape = reqst.shape.toLowerCase();
const dimension = reqst.dimension;
const length = Object.keys(dimension).length;
const values = Object.values(dimension);
const findString = values[values.findIndex((item) => typeof item !== "number")]
    ? true
    : false;
  if (
    shape == null ||
    (shape != "square" &&
      shape != "rectangle" &&
      shape != "triangle" &&
      shape != "circle")
  )
    return new Error("guy gimmme valid shape na");

  if ((shape == "square" || shape == "circle") && findString)
    return new Error("guy gimme valid dimension na");

  if (
    shape == "rectangle" &&
    (typeof dimension !== "object" || length !== 2 || findString)
  ) {
    return new Error("guy gimme valid dimension na");
  }
  if (
    shape == "triangle" &&
    (typeof dimension !== "object" || length !== 3 || findString)
  ) {
    return new Error("guy gimme valid dimension na");
  }
}

function calculator(reqst: Userpost) {
const shape = reqst.shape.toLowerCase();
  let area = 0;
const dimension = reqst.dimension;
    
const num = +dimension;

    if (shape == "square") {
    area = num ** 2;
  }

  if (shape == "circle") {
    area = Math.PI * (num ** 2);
  }

  if (shape == "rectangle") {
const  [a, b] = Object.values(dimension);
    area = a * b;
  }

  if (shape == "triangle") {
const [a, b, c] = Object.values(dimension);
const perimeter = (a + b + c) / 2;
const p = perimeter;
    area = Math.sqrt(p * ((p - a) * (p - b) * (p - c)));
  }
  if (!area) {
    return new Error(`Impossible Shape`);
  } 
    return {message: +area.toFixed(2)};
}

export { calculator, validator };
