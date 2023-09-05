import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-inter',
});

const playfair_Display = Playfair_Display({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-inter',
});

const playfair_Display_italic = Playfair_Display({
    weight: '400',
    style: 'italic',
    subsets: ['latin'],
    variable: '--font-inter',
});

// ... (other imports)

interface ScrollingTextProps {
  direction?: 'left' | 'right';
  duration?: number;
}

const ScrollingText: React.FC<ScrollingTextProps> = ({ direction = 'left', duration = 40 }) => {
  const controls = useAnimation();
  const [initialPosition, setInitialPosition] = useState<number | null>(null);

  useEffect(() => {
    setInitialPosition(0);
  }, []);

  useEffect(() => {
    const scrollWidth = document.getElementById('scrollingText')?.offsetWidth;
    if (scrollWidth) {
      const startPosition = direction === 'left' ? 0 : -scrollWidth / 2;
      const endPosition = direction === 'left' ? -scrollWidth / 2 : 0;

      controls.start({
        x: [startPosition, endPosition],
        transition: {
          duration: duration,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear"
        }
      });
    }
  }, [controls, initialPosition, direction, duration]);

  return (
    <motion.div
      id="scrollingText"
      animate={controls}
      initial={{ x: initialPosition ?? 0 }}
      style={{ display: 'flex', flexDirection: 'row' }}
    >
      {[...Array(3)].map((_, index) => (
        <div key={index} style={{ display: 'flex', justifyContent: 'left',  }}>
          {/* content 1 */}
          <h2 className={`${playfair_Display.className} text-8xl text-gray-800 subpixel-antialiased`}>
            DESIGNER.
          </h2>
          <h2 className={`${playfair_Display_italic.className} text-7xl text-white subpixel-antialiased drop-shadow-[0_0px_0.7px_rgba(0,0,0,1)]`}>
            CODER.
          </h2>
          <h2 className={`${playfair_Display.className} text-8xl text-gray-800 subpixel-antialiased`}>
            CREATIVE.
          </h2>
          <h2 className={`${playfair_Display_italic.className} text-7xl text-white subpixel-antialiased drop-shadow-[0_0px_0.7px_rgba(0,0,0,1)]`}>
            ECCENTRIC?
          </h2>

          {/* duplicated content */}


          <h2 className={`${playfair_Display.className} text-6xl text-gray-800 subpixel-antialiased`}>
            DESIGNER.
          </h2>
          <h2 className={`${playfair_Display_italic.className} text-8xl text-white subpixel-antialiased drop-shadow-[0_0px_0.7px_rgba(0,0,0,1)]`}>
            CODER.
          </h2>
          <h2 className={`${playfair_Display.className} text-8xl text-gray-800 subpixel-antialiased`}>
            CREATIVE.
          </h2>
          <h2 className={`${playfair_Display_italic.className} text-6xl text-white subpixel-antialiased drop-shadow-[0_0px_0.7px_rgba(0,0,0,1)]`}>
            ECCENTRIC?
          </h2>
          
        </div>
      ))}
    </motion.div>
  );
};

export default ScrollingText;
