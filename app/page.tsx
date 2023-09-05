import Hero from '@/components/landing-ui/hero'
import LandingHeader from '@/components/landing-ui/header'
import React from 'react'
import "../app/globals.css";


export default function LandingPage() {
  const containerStyle = {
    // border: '5px solid red',
    backgroundImage: 'url(/so-white.png)', // Assuming the image is a PNG. Adjust the extension if it's different.
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    minHeight: '100vh',
};

  return (
    <div style={containerStyle}>


      
      <LandingHeader/>
      
      <Hero />

      

      <footer>
      </footer>

    

    </div>
    
  )
}
