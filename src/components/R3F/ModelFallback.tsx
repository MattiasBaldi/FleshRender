export function ModelFallback() {
  return (
    <mesh scale={[1, 2, 1]}>
      <boxGeometry /> <meshBasicMaterial color="black" wireframe />
    </mesh>
  );
}
