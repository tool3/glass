
import { TorusKnot as TorusKnotDrei } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { useControls } from 'leva';
import React from 'react';
import { TextureLoader } from 'three';

export default function TorusKnot(props) {

    const options = Array.from({ length: 56 }, (_, i) => 'glass_' + (i + 1) + '.png')
        .reduce((acc, curr) => {
            acc[curr.replace('.png', '')] = curr;
            return acc;
        }, {});


    const matcap = useControls('TorusKnot Matcap', {
        matcap: {
            value: 'glass_16.png',
            options
        }
    })

    const [map] = useLoader(TextureLoader, [`/textures/matcaps/${matcap.matcap}`]);

    return (
        <group {...props} dispose={null}>
            <TorusKnotDrei args={[10, 1, 512, 16, 5, 3]}>
                <meshMatcapMaterial matcap={map} />
            </TorusKnotDrei>
        </group >
    )
}
