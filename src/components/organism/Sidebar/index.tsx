import React from 'react';
import Image from 'next/image'; 
import images from '@/assets/image';

export default function Sidebar() {
  return (
    <div className="bg-gray-900 w-64 h-screen border-2 border-white">
      <div className='flex flex-col items-center justify-center h-16 bg-gray-900'>
        {/* <h1 className='text-white text-2xl'>Sidebar</h1> */}
        <Image src={images.IMG_QUICKS} alt="logo" width={100} height={100} /> 
      </div>
    </div>
  );
}
