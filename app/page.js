'use client';

import { Environment, Html, OrbitControls, Stats, useProgress } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Leva, useControls } from 'leva';
import { Perf } from 'r3f-perf';
import React, { Suspense, useEffect, useState } from 'react';
import Credits from './components/Credit';
import Debug from './components/Debug';
import Glass from './components/Glass';
import './index.scss';

function Loader() {
    const { progress } = useProgress();

    const style = {
        backdropFilter: 'blur(10px)',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }

    return (
        <Html style={style} center className='overlay'>
            <div className="title-wrapper">
                <div className="title">GLASS</div>
                <div className="loading">{progress.toFixed(2)} % loaded</div>
            </div>
        </Html>
    );
}

function FPS({ fps }) {
    return fps ? <Stats className="stats" /> : null
}

export default function Page() {
    const [active, setActive] = useState(false);


    useEffect(() => {
        addEventListener('debug', () => setActive(true))
        addEventListener('debugClose', () => setActive(false))
        return () => {
            removeEventListener('debug', () => setActive(true))
            addEventListener('debugClose', () => setActive(false))
        }
    }, [])

    const { fps, perf, background } = useControls({
        fps: { value: false, color: 'red' },
        perf: false,
        background: 'black',
    });

    const bloom = useControls('bloom', {
        enabled: true,
        intensity: 3,
        luminanceThreshold: 0.1,
        luminanceSmoothing: 0.1,
    }, { collapsed: true, order: 1 })

    return (
        <>
            <Leva hidden={!active} />
            <FPS fps={fps} />
            <Debug />
            <Credits />

            <Canvas 
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
                camera={{ frustumCulled: true, fov: 50, position: [0, 0,  200], zoom: 25, }}>

                <color attach="background" args={[background]} />

                <Suspense fallback={<Loader />}>

                    {perf ? <Perf align="top-right" /> : null}
                    <Suspense fallback={null}>
                        <Glass />
                    </Suspense>
                    <Environment files="./textures/environments/studio_small_03_2k.hdr" resolution={340} />


                    <OrbitControls dampingFactor={0.3} minZoom={10} maxZoom={100} target={[0, 0, 0]} />
                    <EffectComposer autoClear={false}>
                        {bloom.enabled ?
                            <Bloom
                                intensity={bloom.intensity}
                                luminanceThreshold={bloom.luminanceThreshold}
                                luminanceSmoothing={bloom.luminanceSmoothing}
                                height={1024} /> :
                            null}
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </>
    );
}
