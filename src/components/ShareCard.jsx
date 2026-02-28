import React, { useRef, useState } from 'react';
import { Share2, X, Download, Copy, Check } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

// Inline styles only — html2canvas ignores Tailwind classes
const cardStyles = {
  wrapper: {
    width: '360px',
    borderRadius: '28px',
    overflow: 'hidden',
    fontFamily: "'Segoe UI', sans-serif",
    position: 'relative',
  },
  inner: (bg) => ({
    padding: '32px 28px 28px',
    background: bg,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    position: 'relative',
  }),
  brand: (color) => ({
    position: 'absolute',
    top: '16px',
    right: '20px',
    fontSize: '12px',
    fontWeight: '800',
    letterSpacing: '0.1em',
    color,
    opacity: 0.6,
    textTransform: 'uppercase',
  }),
  temp: (color) => ({
    fontSize: '80px',
    fontWeight: '900',
    lineHeight: 1,
    color,
    letterSpacing: '-4px',
  }),
  label: (color) => ({
    fontSize: '18px',
    fontWeight: '700',
    color,
    opacity: 0.85,
  }),
  quote: (color) => ({
    fontSize: '13px',
    fontStyle: 'italic',
    color,
    opacity: 0.75,
    textAlign: 'center',
    maxWidth: '280px',
    lineHeight: 1.5,
    marginTop: '4px',
  }),
  meta: (color) => ({
    display: 'flex',
    gap: '16px',
    marginTop: '12px',
  }),
  metaItem: (color) => ({
    fontSize: '12px',
    color,
    opacity: 0.7,
    fontWeight: '600',
  }),
};

const CARD_THEMES = {
  sunny: { bg: 'linear-gradient(135deg, #fbbf24, #f97316)', text: '#fff', shadow: 'rgba(249,115,22,0.4)' },
  cloudy: { bg: 'linear-gradient(135deg, #94a3b8, #64748b)', text: '#fff', shadow: 'rgba(100,116,139,0.4)' },
  foggy: { bg: 'linear-gradient(135deg, #d1d5db, #9ca3af)', text: '#1f2937', shadow: 'rgba(156,163,175,0.4)' },
  rainy: { bg: 'linear-gradient(135deg, #3b82f6, #1e40af)', text: '#fff', shadow: 'rgba(59,130,246,0.4)' },
  snowy: { bg: 'linear-gradient(135deg, #a5f3fc, #67e8f9)', text: '#0f172a', shadow: 'rgba(103,232,249,0.4)' },
  stormy: { bg: 'linear-gradient(135deg, #7c3aed, #1e1b4b)', text: '#fff', shadow: 'rgba(124,58,237,0.4)' },
  unknown: { bg: 'linear-gradient(135deg, #6b7280, #374151)', text: '#fff', shadow: 'rgba(107,114,128,0.4)' },
  roast: { bg: 'linear-gradient(135deg, #dc2626, #7f1d1d)', text: '#fff', shadow: 'rgba(220,38,38,0.5)' },
};

export const ShareCard = ({ mood, temp, humidity, wind, location, quote, lang, personality, onClose }) => {
  const cardRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const t = TRANSLATIONS[lang];

  const theme = personality === 'roast' ? CARD_THEMES.roast : (CARD_THEMES[mood.type] || CARD_THEMES.unknown);
  const Icon = mood.icon;

  const captureAndShare = async (action = 'share') => {
    setCapturing(true);
    try {
      // Dynamically import html2canvas only when needed
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
        logging: false,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        if (action === 'download') {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `mizaji-weather-${Date.now()}.png`;
          a.click();
          URL.revokeObjectURL(url);
        } else if (action === 'share' && navigator.share) {
          const file = new File([blob], 'mizaji-weather.png', { type: 'image/png' });
          await navigator.share({
            title: 'Mizaji Weather',
            text: `${Math.round(temp)}° – "${quote}" 🌤️`,
            files: [file],
          });
        } else {
          // Fallback: copy to clipboard
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      }, 'image/png');
    } catch (err) {
      console.error('Share error:', err);
    } finally {
      setCapturing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-sm animate-in slide-in-from-bottom-4 fade-in">
        {/* Close */}
        <div className="flex justify-end mb-3">
          <button onClick={onClose} className="p-2 bg-white/20 text-white rounded-full hover:bg-white/30">
            <X size={18} />
          </button>
        </div>

        {/* The card that will be captured */}
        <div ref={cardRef} style={cardStyles.wrapper}>
          <div style={cardStyles.inner(theme.bg)}>
            <span style={cardStyles.brand(theme.text)}>Mizaji</span>

            {/* Icon emoji fallback since lucide won't render in canvas */}
            <div style={{ fontSize: '56px', lineHeight: 1 }}>
              {mood.type === 'sunny' ? '☀️'
                : mood.type === 'cloudy' ? '☁️'
                : mood.type === 'foggy' ? '🌫️'
                : mood.type === 'rainy' ? '🌧️'
                : mood.type === 'snowy' ? '❄️'
                : mood.type === 'stormy' ? '⛈️'
                : '🌡️'}
            </div>

            <div style={cardStyles.temp(theme.text)}>{Math.round(temp)}°</div>
            <div style={cardStyles.label(theme.text)}>{mood.label}</div>
            <div style={cardStyles.quote(theme.text)}>"{quote}"</div>

            <div style={cardStyles.meta(theme.text)}>
              {humidity !== '-' && (
                <span style={cardStyles.metaItem(theme.text)}>💧 {humidity}%</span>
              )}
              {wind !== '-' && (
                <span style={cardStyles.metaItem(theme.text)}>💨 {Math.round(wind)} km/h</span>
              )}
              {location && (
                <span style={cardStyles.metaItem(theme.text)}>📍 {location}</span>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => captureAndShare('share')}
            disabled={capturing}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white text-slate-800 font-bold text-sm hover:bg-white/90 transition-all disabled:opacity-50"
          >
            <Share2 size={16} />
            {capturing ? '...' : (lang === 'ma' ? 'شارك' : lang === 'ar' ? 'مشاركة' : 'Share')}
          </button>

          <button
            onClick={() => captureAndShare('download')}
            disabled={capturing}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/20 text-white font-bold text-sm hover:bg-white/30 transition-all disabled:opacity-50"
          >
            <Download size={16} />
          </button>

          <button
            onClick={() => captureAndShare('copy')}
            disabled={capturing}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/20 text-white font-bold text-sm hover:bg-white/30 transition-all disabled:opacity-50"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};
