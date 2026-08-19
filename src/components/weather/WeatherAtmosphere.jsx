import React from 'react';

export const WeatherAtmosphere = ({ type, isDarkMode, personality }) => {
  const isRoast = personality === 'roast';
  const opacity = isDarkMode ? 'opacity-20' : 'opacity-35';

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 transition-all duration-1000">
      {/* Roast Mode: Intense Lava & Fire Embers */}
      {isRoast && (
        <div className="absolute inset-0 bg-gradient-to-t from-red-600/15 via-transparent to-orange-500/10 animate-pulse-slow">
          <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] bg-red-600/25 rounded-full blur-[120px] animate-float"></div>
          <div className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] bg-orange-600/20 rounded-full blur-[100px] animate-float-delayed"></div>
        </div>
      )}

      {/* Sunny Atmospheric Glow */}
      {type === 'sunny' && (
        <>
          <div className={`absolute -top-[15%] -right-[15%] w-[550px] h-[550px] ${isRoast ? 'bg-red-500' : (isDarkMode ? 'bg-amber-500' : 'bg-amber-300')} rounded-full blur-[120px] ${opacity} animate-pulse-slow`}></div>
          <div className={`absolute top-[30%] -left-[20%] w-[400px] h-[400px] ${isRoast ? 'bg-orange-600' : (isDarkMode ? 'bg-yellow-600' : 'bg-yellow-200')} rounded-full blur-[100px] opacity-15 animate-float`}></div>
        </>
      )}

      {/* Cloudy Sky Drifts */}
      {type === 'cloudy' && (
        <>
          <div className={`absolute top-[10%] -left-[15%] w-[450px] h-[350px] ${isRoast ? 'bg-red-900' : (isDarkMode ? 'bg-slate-700' : 'bg-slate-300')} rounded-full blur-[100px] ${opacity} animate-float`}></div>
          <div className={`absolute top-[45%] -right-[15%] w-[400px] h-[400px] ${isRoast ? 'bg-rose-950' : (isDarkMode ? 'bg-slate-800' : 'bg-slate-200')} rounded-full blur-[110px] opacity-20 animate-float-delayed`}></div>
        </>
      )}

      {/* Rainy Atmosphere */}
      {type === 'rainy' && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 opacity-15 animate-rain bg-[radial-gradient(#60a5fa_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className={`absolute top-[20%] right-[-10%] w-[450px] h-[450px] bg-blue-600 rounded-full blur-[120px] ${opacity} animate-float`}></div>
        </>
      )}

      {/* Snowy Frosted Aura */}
      {type === 'snowy' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-blue-500/10"></div>
          <div className={`absolute top-[-10%] left-[20%] w-[500px] h-[350px] bg-cyan-400 rounded-full blur-[110px] ${opacity} animate-float`}></div>
        </>
      )}

      {/* Thunderstorm Lightning Flash */}
      {type === 'stormy' && (
        <>
          <div className="absolute inset-0 bg-purple-900/15 animate-flash"></div>
          <div className={`absolute top-[15%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full blur-[130px] ${opacity} animate-float`}></div>
        </>
      )}
    </div>
  );
};
