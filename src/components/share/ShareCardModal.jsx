import React, { useRef, useState } from 'react';
import { Share2, X, Download, Copy, Check, Sparkles, Loader2 } from 'lucide-react';
import { TRANSLATIONS } from '../../constants/translations';
import { convertTemp, convertWindSpeed } from '../../utils/weatherHelpers';

// High-fidelity card styles with inline CSS for html2canvas reliability
const cardThemes = {
  sunny: { bg: 'linear-gradient(145deg, #f59e0b, #ea580c)', text: '#ffffff', subtext: 'rgba(255,255,255,0.85)' },
  cloudy: { bg: 'linear-gradient(145deg, #64748b, #334155)', text: '#ffffff', subtext: 'rgba(255,255,255,0.85)' },
  foggy: { bg: 'linear-gradient(145deg, #71717a, #3f3f46)', text: '#ffffff', subtext: 'rgba(255,255,255,0.85)' },
  rainy: { bg: 'linear-gradient(145deg, #2563eb, #1e3a8a)', text: '#ffffff', subtext: 'rgba(255,255,255,0.85)' },
  snowy: { bg: 'linear-gradient(145deg, #06b6d4, #0369a1)', text: '#ffffff', subtext: 'rgba(255,255,255,0.85)' },
  stormy: { bg: 'linear-gradient(145deg, #7e22ce, #1e1b4b)', text: '#ffffff', subtext: 'rgba(255,255,255,0.85)' },
  unknown: { bg: 'linear-gradient(145deg, #475569, #1e293b)', text: '#ffffff', subtext: 'rgba(255,255,255,0.85)' },
  roast: { bg: 'linear-gradient(145deg, #dc2626, #7f1d1d)', text: '#ffffff', subtext: 'rgba(255,255,255,0.85)' },
};

export const ShareCardModal = ({
  isOpen,
  onClose,
  mood,
  activeData,
  locationName,
  lang,
  unit = 'metric',
  personality,
  isDarkMode,
}) => {
  const cardRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  if (!isOpen || !activeData || !mood) return null;

  const isRoast = personality === 'roast';
  const theme = isRoast ? cardThemes.roast : (cardThemes[mood.type] || cardThemes.unknown);

  const emojiMap = {
    sunny: '☀️',
    cloudy: '☁️',
    foggy: '🌫️',
    rainy: '🌧️',
    snowy: '❄️',
    stormy: '⛈️',
    unknown: '🌡️',
  };

  const weatherEmoji = emojiMap[mood.type] || '🌡️';

  const displayTemp = Math.round(convertTemp(activeData.temp, unit));
  const tempSymbol = unit === 'imperial' ? '°F' : '°C';
  const displayWind = Math.round(convertWindSpeed(activeData.wind, unit));
  const windUnit = unit === 'imperial' ? 'mph' : 'km/h';

  const handleCapture = async (action = 'share') => {
    if (!cardRef.current || capturing) return;
    setCapturing(true);

    try {
      const html2canvasModule = await import('html2canvas');
      const html2canvas = html2canvasModule.default || html2canvasModule;

      const canvas = await html2canvas(cardRef.current, {
        scale: 2.5,
        backgroundColor: null,
        useCORS: true,
        logging: false,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
          setCapturing(false);
          return;
        }

        if (action === 'download') {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `mizaji-weather-${Date.now()}.png`;
          a.click();
          URL.revokeObjectURL(url);
        } else if (action === 'share' && navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], 'mizaji.png', { type: 'image/png' })] })) {
          const file = new File([blob], 'mizaji-weather.png', { type: 'image/png' });
          await navigator.share({
            title: 'Mizaji | مزاجي',
            text: `${displayTemp}${tempSymbol} – "${mood.quote}"`,
            files: [file],
          });
        } else {
          // Clipboard fallback
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob }),
            ]);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch (clipErr) {
            // If clipboard write image fails, fallback to download
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `mizaji-weather-${Date.now()}.png`;
            a.click();
            URL.revokeObjectURL(url);
          }
        }
        setCapturing(false);
      }, 'image/png');
    } catch (err) {
      console.error('Capture card error:', err);
      setCapturing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Top Close */}
        <div className="w-full flex items-center justify-between mb-3 text-white">
          <span className="text-xs font-black uppercase tracking-wider opacity-80">
            {t.shareTitle}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* The Card To Be Captured */}
        <div
          ref={cardRef}
          style={{
            width: '320px',
            borderRadius: '28px',
            background: theme.bg,
            color: theme.text,
            padding: '28px 24px 22px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            fontFamily: "'Segoe UI', 'Plus Jakarta Sans', Cairo, sans-serif",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            boxSizing: 'border-box',
          }}
        >
          {/* Header watermark */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.1em',
              opacity: 0.7,
              textTransform: 'uppercase',
            }}
          >
            <span>MIZAJI • مزاجي</span>
            <span>{isRoast ? '🔥 ROAST' : 'WEATHER'}</span>
          </div>

          {/* Emoji Weather Icon */}
          <div style={{ fontSize: '54px', lineHeight: 1, marginBottom: '6px' }}>
            {weatherEmoji}
          </div>

          {/* Temperature */}
          <div
            style={{
              fontSize: '68px',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-3px',
              marginBottom: '4px',
            }}
          >
            {displayTemp}°
          </div>

          {/* Condition Label */}
          <div
            style={{
              fontSize: '15px',
              fontWeight: 700,
              opacity: 0.9,
              marginBottom: '10px',
            }}
          >
            {mood.label}
          </div>

          {/* Sarcastic / Roast Quote */}
          <div
            style={{
              fontSize: '13px',
              fontWeight: 600,
              fontStyle: 'italic',
              textAlign: 'center',
              lineHeight: 1.45,
              opacity: 0.9,
              marginBottom: '18px',
              padding: '0 8px',
            }}
          >
            "{mood.quote}"
          </div>

          {/* Meta metrics pills */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              paddingTop: '12px',
              borderTop: '1px solid rgba(255,255,255,0.2)',
              fontSize: '11px',
              fontWeight: 700,
              opacity: 0.85,
            }}
          >
            <span>💧 {Math.round(activeData.humidity)}%</span>
            <span>💨 {displayWind} {windUnit}</span>
            <span>📍 {locationName}</span>
          </div>
        </div>

        {/* Actions Button Bar */}
        <div className="w-full flex items-center gap-2 mt-4">
          <button
            onClick={() => handleCapture('share')}
            disabled={capturing}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white text-slate-900 font-extrabold text-xs shadow-lg hover:bg-white/90 transition-all disabled:opacity-50 active:scale-95"
          >
            {capturing ? <Loader2 size={16} className="animate-spin" /> : <Share2 size={16} />}
            <span>{lang === 'ma' ? 'بارطاجي' : lang === 'ar' ? 'مشاركة' : 'Share'}</span>
          </button>

          <button
            onClick={() => handleCapture('download')}
            disabled={capturing}
            aria-label="Download PNG"
            className="p-3 rounded-2xl bg-white/20 text-white font-bold text-xs hover:bg-white/30 transition-all disabled:opacity-50 active:scale-95"
          >
            <Download size={16} />
          </button>

          <button
            onClick={() => handleCapture('copy')}
            disabled={capturing}
            aria-label="Copy to Clipboard"
            className="p-3 rounded-2xl bg-white/20 text-white font-bold text-xs hover:bg-white/30 transition-all disabled:opacity-50 active:scale-95"
          >
            {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};
