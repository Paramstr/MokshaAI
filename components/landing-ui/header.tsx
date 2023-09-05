'use client'

import Link from 'next/link';
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Inter, Playfair_Display } from 'next/font/google'



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




const LandingHeader = () => {
    

    return (
        <header>
            <div  className="flex justify-between p-11 align-top ">
                <div className="flex justify-between ">
                    <h2 className={`${playfair_Display.className} text-6xl text-gray-800 subpixel-antialiased`}>
                        PARAM.
                    </h2>
                    {/* <h2 className={`${playfair_Display.className} text-6xl text-white subpixel-antialiased drop-shadow-[0_0px_0.7px_rgba(0,0,0,1)]`}>
                        text
                    </h2> */}
                </div>
                <div className='flex-col items-end pt-3'>
                    <Link href="/param-chat"> {/* Linking to the param-chat.tsx page */}
                        <button className={`${playfair_Display.className} text-md`}>AI PARAM CHATBOT</button>
                    </Link>

                    <h2 className='self-end text-2xl'>RESUME</h2>
                </div>
            </div>
        </header>
    );
};

export default LandingHeader;
