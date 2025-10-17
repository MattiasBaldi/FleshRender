import {
  AccumulativeShadows,
  RandomizedLight,
  useHelper,
  SoftShadows,
  BakeShadows,
} from "@react-three/drei";
import { useControls, folder } from "leva";
import { useRef } from "react";
import * as THREE from "three";

export function LightsAndShadows() {
  const RandomizedLightRef = useRef(null);
  const directionalLightRef = useRef(null);
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);

  const controls = useControls("lights and shadows", {
    planeShow: false,

    lights: folder(
      {
        RandomizedLight: folder(
          {
            randomizedLightShow: false,
            randomizedRef: { value: RandomizedLightRef },
            randomizedAmount: {
              value: 10,
              min: 1,
              max: 50,
              step: 1,
              label: "amt",
            },
            randomizedRadius: {
              value: 6,
              min: 0.1,
              max: 20,
              step: 0.1,
              label: "rad",
            },
            randomizedAmbient: {
              value: 10,
              min: 0,
              max: 20,
              step: 0.1,
              label: "amb",
            },
            randomizedIntensity: {
              value: 1,
              min: 0,
              max: 10,
              step: 0.01,
              label: "int",
            },
            randomizedLightPosition: {
              value: [-1.5, 2.5, -2.5],
              label: "pos",
            },
            randomizedBias: {
              value: 0.001,
              min: 0,
              max: 0.01,
              step: 0.0001,
              label: "bias",
            },
          },
          { collapsed: true }
        ),

        directionalLight: folder({
          directionalLightShow: false,
          directionalIntensity: {
            value: 1,
            min: 0,
            max: 10,
            step: 0.01,
            label: "int",
          },
          directionalColor: { value: "#ffffff", label: "col" },
          directionalCastShadow: { value: true, label: "shadow" },
          directionalShadowBias: {
            value: 0,
            min: -0.05,
            max: 0.05,
            step: 0.0001,
            label: "bias",
          },
          directionalPosition: {
            value: [5, 10, 5],
            label: "pos",
          },
          size: { value: 10, min: 1, max: 50, step: 1, label: "size" },
          mapSize: {
            value: 1024,
            min: 256,
            max: 4096,
            step: 256,
            label: "map",
          },
        }),
      },
      { collapsed: true }
    ),

    shadows: folder({
      bakeShadows: folder({ bakeShadowsShow: true }),

      softshadows: folder({
        softShadowsShow: false,
        softSize: { value: 12, min: 1, max: 50, step: 1, label: "size" },
        softSamples: { value: 8, min: 1, max: 32, step: 1, label: "samp" },
        softFocus: { value: 0.5, min: 0, max: 1, step: 0.01, label: "focus" },
      }),

      accumulativeShadows: folder(
        {
          accumulativeShadowsShow: false,
          accumulativeFrames: {
            value: 40,
            min: 1,
            max: 500,
            step: 1,
            label: "frames",
          },
          accumulativeAlphaTest: {
            value: 0.6,
            min: 0,
            max: 1,
            step: 0.01,
            label: "alpha",
          },
          accumulativeOpacity: {
            value: 0.9,
            min: 0,
            max: 1,
            step: 0.01,
            label: "opac",
          },
          accumulativeAmount: {
            value: 10,
            min: 0,
            max: 100,
            step: 0.01,
            label: "amt",
          },
          accumulativeColor: { value: "black", label: "col" },
          accumulativeScale: {
            value: 10,
            min: 1,
            max: 10,
            step: 1,
            label: "scale",
          },
          accumulativeSize: {
            value: 29,
            min: 1,
            max: 50,
            step: 1,
            label: "size",
          },
          accumulativeMapSize: {
            value: 1024,
            min: 256,
            max: 4096,
            step: 256,
            label: "map",
          },
          accumulativePosition: { value: [0, -0.95, 0], label: "pos" },

          // ...existing code...
          accumulativeDirLight: folder({
            accumulativeDirLightShow: false,
            accumulativeDirLightIntensity: {
              value: 1,
              min: 0,
              max: 10,
              step: 0.01,
              label: "int",
            },
            accumulativeDirLightColor: { value: "#ffffff", label: "col" },
            accumulativeDirLightCastShadow: { value: true, label: "shadow" },
            accumulativeDirLightShadowBias: {
              value: 0,
              min: -0.05,
              max: 0.05,
              step: 0.0001,
              label: "bias",
            },
            accumulativeDirLightPosition: {
              value: [5, 10, 5],
              label: "pos",
            },
            accumulativeDirLightSize: {
              value: 10,
              min: 1,
              max: 50,
              step: 1,
              label: "size",
            },
            accumulativeDirLightMapSize: {
              value: 1024,
              min: 256,
              max: 4096,
              step: 256,
              label: "map",
            },
          }),
          // ...existing code...
        },
        { collapsed: true }
      ),
    }),
  });

  return (
    <>
      {controls.bakeShadowsShow && <BakeShadows />}
      {controls.softShadowsShow && (
        <SoftShadows
          samples={controls.softSamples}
          size={controls.softSize}
          focus={controls.softFocus}
        />
      )}

      {controls.directionalLightShow && (
        <directionalLight
          ref={directionalLightRef}
          position={controls.directionalPosition}
          intensity={controls.directionalIntensity}
          color={controls.directionalColor}
          castShadow={controls.directionalCastShadow}
          shadow-bias={controls.directionalShadowBias}
        />
      )}

      {/* Accumulative */}
      {controls.accumulativeShadowsShow && (
        <AccumulativeShadows
          frames={controls.accumulativeFrames}
          alphaTest={controls.accumulativeAlphaTest}
          opacity={controls.accumulativeOpacity}
          color={controls.accumulativeColor}
          scale={controls.accumulativeScale}
          position={controls.accumulativePosition}
          size={controls.accumulativeSize}
          amount={controls.accumulativeAmount}
          mapSize={controls.accumulativeMapSize}
        >
          {controls.randomizedLightShow && (
            <RandomizedLight
              ref={RandomizedLightRef}
              amount={controls.randomizedAmount}
              radius={controls.randomizedRadius}
              ambient={controls.randomizedAmbient}
              intensity={controls.randomizedIntensity}
              position={controls.randomizedLightPosition}
              bias={controls.randomizedBias}
            />
          )}
          {controls.accumulativeDirLight && (
            <directionalLight
              ref={directionalLightRef}
              position={controls.directionalPosition}
              intensity={controls.directionalIntensity}
              color={controls.directionalColor}
              castShadow={controls.directionalCastShadow}
              shadow-bias={controls.directionalShadowBias}
            />
          )}
        </AccumulativeShadows>
      )}

      {controls.planeShow && (
        <mesh
          receiveShadow
          scale={controls.accumulativeScale}
          position={[
            controls.accumulativePosition[0],
            controls.accumulativePosition[1] + 0.01,
            controls.accumulativePosition[2],
          ]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry />
          <meshStandardMaterial color="grey" side={THREE.DoubleSide} />
        </mesh>
      )}
    </>
  );
}
