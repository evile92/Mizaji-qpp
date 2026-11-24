import React from 'react';

const ATMOSPHERE_GRADIENTS = {
  sunny: {
    dark: 'radial-gradient(circle at 85% 5%, rgba(245, 158, 11, 0.18) 0%, transparent 55%), radial-gradient(circle at 10% 45%, rgba(202, 138, 4, 0.10) 0%, transparent 50%)',
    light: 'radial-gradient(circle at 85% 5%, rgba(252, 211, 77, 0.35) 0%, transparent 55%), radial-gradient(circle at 10% 45%, rgba(254, 240, 138, 0.25) 0%, transparent 50%)',
  },
  cloudy: {
    dark: 'radial-gradient(circle at 15% 15%, rgba(100, 116, 139, 0.18) 0%, transparent 55%), radial-gradient(circle at 85% 50%, rgba(51, 65, 85, 0.16) 0%, transparent 50%)',
    light: 'radial-gradient(circle at 15% 15%, rgba(148, 163, 184, 0.28) 0%, transparent 55%), radial-gradient(circle at 85% 50%, rgba(203, 213, 225, 0.28) 0%, transparent 50%)',
  },
  foggy: {
    dark: 'radial-gradient(circle at 50% 15%, rgba(161, 161, 170, 0.15) 0%, transparent 60%)',
    light: 'radial-gradient(circle at 50% 15%, rgba(212, 212, 216, 0.35) 0%, transparent 60%)',
  },
  rainy: {
    dark: 'radial-gradient(ellipse at top, rgba(37, 99, 235, 0.22) 0%, transparent 55%), radial-gradient(circle at 85% 35%, rgba(30, 64, 175, 0.16) 0%, transparent 50%)',
    light: 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.24) 0%, transparent 55%), radial-gradient(circle at 85% 35%, rgba(96, 165, 250, 0.20) 0%, transparent 50%)',
  },
  snowy: {
    dark: 'radial-gradient(circle at 30% 10%, rgba(34, 211, 238, 0.16) 0%, transparent 55%), radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.12) 0%, transparent 50%)',
    light: 'radial-gradient(circle at 30% 10%, rgba(103, 232, 249, 0.30) 0%, transparent 55%), radial-gradient(circle at 80% 50%, rgba(191, 219, 254, 0.25) 0%, transparent 50%)',
  },
  stormy: {
    dark: 'radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.22) 0%, transparent 55%), radial-gradient(circle at 80% 60%, rgba(88, 28, 135, 0.16) 0%, transparent 50%)',
    light: 'radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.22) 0%, transparent 55%), radial-gradient(circle at 80% 60%, rgba(192, 132, 252, 0.18) 0%, transparent 50%)',
  },
};

const ROAST_GRADIENT =
  'radial-gradient(circle at 85% 8%, rgba(220, 38, 38, 0.26) 0%, transparent 52%), radial-gradient(circle at 12% 55%, rgba(234, 88, 12, 0.16) 0%, transparent 50%)';

export const WeatherAtmosphere = React.memo(({ type, isDarkMode, personality }) => {
  const isRoast = personality === 'roast';
  const backgroundImage = isRoast
    ? ROAST_GRADIENT
    : (ATMOSPHERE_GRADIENTS[type]?.[isDarkMode ? 'dark' : 'light'] || 'none');

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
      style={{ backgroundImage }}
    />
  );
});
