import React from 'react';

export function BookMockup() {
  return (
    <div className="relative w-64 md:w-80 aspect-[1/1.4] mx-auto group">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D2A26] to-[#1A1A1A] rounded-r-3xl rounded-l-md shadow-[20px_20px_40px_rgba(0,0,0,0.3)] transition-all duration-700 ease-out group-hover:rotate-y-0"
           style={{ transform: 'perspective(1000px) rotateY(-15deg)', transformStyle: 'preserve-3d' }}>
        {/* Book spine lighting */}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/10 to-transparent rounded-l-md z-10" style={{ transform: 'translateZ(1px)' }}></div>
        
        {/* Decorative Border */}
        <div className="absolute inset-[6px] border border-gold/40 rounded-r-2xl rounded-l z-20 flex flex-col items-center justify-between py-10 px-6 text-center text-white" style={{ transform: 'translateZ(2px)' }}>
          
          <div className="px-3 py-1 border border-gold rounded-full bg-gold/10 text-xs font-arabic text-gold tracking-widest">
            النسخة الذهبية
          </div>
          
          <div className="space-y-6">
            <div className="text-4xl opacity-80">🌹</div>
            <h3 className="text-3xl md:text-4xl font-bold font-arabic leading-snug">
              كيف تكوني <br /> جميلة <br />
              <span className="text-gold font-light mt-2 block">في عيون الآخرين</span>
            </h3>
          </div>
          
          <div className="space-y-2">
            <div className="w-12 h-[1px] bg-gold/50 mx-auto"></div>
            <p className="text-sm font-arabic text-white/80 tracking-wider">نورة محمد النجار</p>
          </div>
        </div>
      </div>
    </div>
  );
}
