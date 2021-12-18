export const half = (value) => value / 2;

export const findPointInCircle = (x, y, distance = 100, angleInDegrees) => {
  var radians = (angleInDegrees * Math.PI) / 180;

  return {
    x: Math.cos(radians) * distance + x,
    y: Math.sin(radians) * distance + y,
  };
};

const midPointBetween = (pointA, pointB) => {
  return {
    x: (pointB.x + pointA.x) * 0.5,
    y: (pointB.y + pointA.y) * 0.5,
  };
};

export const calculateCurve = (pointA, pointB, offset = 30) => {
  const midpoint = midPointBetween(pointA, pointB);
  var theta = Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x) - Math.PI / 2;

  var tensor = {
    x: midpoint.x - offset * Math.cos(theta),
    y: midpoint.y - offset * Math.sin(theta),
  };

  return `M${pointA.x} ${pointA.y} Q${tensor.x} ${tensor.y} ${pointB.x} ${pointB.y}`;
};
