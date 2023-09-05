'use client'

import React from 'react'
import Wave from 'react-wavify'
import ScrollingText from '@/components/landing-ui/scrollingtext'


const HeroSection: React.FC = () => {
    const heroStyle = {
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative' as 'relative'
    };

    const waveStyle = {
        position: 'absolute' as 'absolute',
        bottom: -240,
        width: '100%', // Ensure the wave spans the full width of the container
        height: '70vh'

      };
      const backgroundWaveStyle = {
        ...waveStyle,
        opacity: 0.4,
        transform: 'translateX(0%)',  // Offset to the right using transform
        zIndex: -1
    };
    
    
    

    const HeroWave = () => (
    <Wave fill='#AEC3B0'
          paused={false}
          style={waveStyle}
          options={{
            height: 40,
            amplitude: 150,
            speed: 0.05,
            points: 3
          }}
    />)

    const BackgroundWave = () => (
      <Wave fill='#AEC3B0'
            paused={false}
            style={backgroundWaveStyle}
            options={{
              height: 50,
              amplitude: 150,
              speed: 0.04,
              points: 4,
            phase: 30 
            }}
      />
  );
  

  return (
    <section style={heroStyle}>
      
      
      <BackgroundWave />
      <HeroWave/> 
      <div className="flex flex-col">
        <ScrollingText direction='right' duration={80}/>
        <ScrollingText direction='left' duration = {100}/>
        <ScrollingText direction='right'duration={120}/>
      </div>

    </section>

    
  );
}

export default HeroSection;
