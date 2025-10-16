import React from "react";

export const geometryMap = {
  [Primitives.Cube]: <boxGeometry />,
  [Primitives.Sphere]: <sphereGeometry />,
  [Primitives.Cylinder]: <cylinderGeometry />,
  [Primitives.Cone]: <coneGeometry />,
  [Primitives.Torus]: <torusGeometry />,
  [Primitives.Plane]: <planeGeometry />,
  [Primitives.Dodecahedron]: <dodecahedronGeometry />,
  [Primitives.Icosahedron]: <icosahedronGeometry />,
  [Primitives.Octahedron]: <octahedronGeometry />,
  [Primitives.Tetrahedron]: <tetrahedronGeometry />,
  [Primitives.Capsule]: <capsuleGeometry />,
};

export default function Primitives() {
  return <div></div>;
}
