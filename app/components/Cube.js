
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useControls } from 'leva';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

export default function Cube(props) {
    const { nodes, materials } = useGLTF('/models/cube.glb')

    const options = Array.from({ length: 56 }, (_, i) => 'glass_' + (i + 1) + '.png')
        .reduce((acc, curr) => {
            acc[curr.replace('.png', '')] = curr;
            return acc;
        }, {});


    const matcap = useControls('Cube Matcap', {
        matcap: {
            value: 'glass_16.png',
            options
        }
    })

    const [map] = useLoader(TextureLoader, [`/textures/matcaps/${matcap.matcap}`]);

    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={nodes.Cube.material}
            >
                <meshMatcapMaterial matcap={map} />
            </mesh>
        </group>
    )
}

useGLTF.preload('/models/cube.glb')
