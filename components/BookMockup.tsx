import React from 'react';
import Image from 'next/image';

export function BookMockup() {
  return (
    <div className="relative w-64 md:w-80 aspect-[1/1.4] mx-auto group">
      <div className="absolute inset-0 rounded-r-3xl rounded-l-md shadow-[20px_20px_40px_rgba(0,0,0,0.3)] transition-all duration-700 ease-out group-hover:rotate-y-0 overflow-hidden"
           style={{ transform: 'perspective(1000px) rotateY(-15deg)', transformStyle: 'preserve-3d' }}>
        {/* Book spine lighting */}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/20 to-transparent z-10 mix-blend-overlay pointer-events-none" style={{ transform: 'translateZ(1px)' }}></div>
        
        <Image
          src="/cover-img.jpg"
          alt="كيف تكوني جميلة في عيون الآخرين"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 256px, 320px"
        />
      </div>
    </div>
  );
}
