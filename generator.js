import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
import {
  random,
  pointsInPath,
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.0";
import { findPointInCircle, half, calculateCurve, roll } from "./utils.js";

const WIDTH = 300;
const HEIGHT = 300;
const COLOR = "black";
const THICKNESS = 0.3;

const RADII = parseInt(random(10, 45));
const WEB_TENSION = () => random(0.3, 1);
const ANCHOR_QUANTITY = random(10, 30);
const CENTER = {
  x: half(WIDTH) + random(-50, 50),
  y: half(HEIGHT) + random(-50, 50),
};

const draw = SVG()
  .addTo("#sketch")
  .size(WIDTH, HEIGHT)
  .viewbox(0, 0, WIDTH, HEIGHT);

// Draw axes radiating starting at 9 o'clock going clockwise
const axes = [];
const angleIncrement = 360 / RADII;
for (let angle = 0; angle <= 360; angle += angleIncrement * random(0.5, 1.5)) {
  let AXEL_LENGTH = random(60, 150);
  const end = findPointInCircle(CENTER.x, CENTER.y, AXEL_LENGTH, angle);

  const line = draw
    .line(CENTER.x, CENTER.y, end.x, end.y)
    .stroke({ color: COLOR, width: THICKNESS, linecap: "round" });

  // Only 25% of axes are supporting the web to the environment. Draw them on top
  const isAnchoringWeb = roll(0.25);
  if (isAnchoringWeb) {
    const supportEnd = findPointInCircle(CENTER.x, CENTER.y, 500, angle);
    draw
      .line(CENTER.x, CENTER.y, supportEnd.x, supportEnd.y)
      .stroke({ color: COLOR, width: THICKNESS, linecap: "round" });
  }

  axes.push(line);
}

// Close web by repeating first axel as last. Curiosly I have seen my spider does not always do this
axes.push(axes[0]);

// Split each axel into N anchors to stick web to them and build concentric circles
const anchors = [];
axes.forEach((line) => {
  // Add endpoint so that web closes on the edges
  const end = {
    x: line.node.getAttribute("x2"),
    y: line.node.getAttribute("y2"),
  };
  const points = pointsInPath(line.node, ANCHOR_QUANTITY).map(({ x, y }) => ({
    x,
    y,
  }));
  anchors.push([...points, end]);
});
// Connect anchor points of each adjacent web strand
anchors.forEach((points, axelIndex) => {
  points.forEach((start, pointIndex) => {
    const adyacentAnchor = anchors[axelIndex + 1];

    if (!adyacentAnchor) return;

    const end = adyacentAnchor[pointIndex];
    const tension = pointIndex * WEB_TENSION();
    const curve = calculateCurve(start, end, tension);

    // Some segments are missing to add variety
    const isMissing = roll(0.15);
    const color = isMissing ? "transparent" : COLOR;
    draw.path(curve).stroke({ color: color, width: THICKNESS }).fill("none");
  });
});
