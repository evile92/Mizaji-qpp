import { useCallback, useRef } from 'react';

export const useSoundEffects = () => {
  const audioCtxRef = useRef(null);

  // Initialize or get Web Audio Context
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }, []);

  // Play impactful Roast Mode "Boom & Flame" sound synthesized locally
  const playRoastSound = useCallback(() => {
    try {
      // Haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate([80, 40, 150]);
      }

      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // 1. Deep Sub-bass Drop (Vine Boom style punch)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.5);

      gain.gain.setValueAtTime(0.9, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.85);

      // 2. Punch Transient / Noise Burst (Flame impact)
      const bufferSize = ctx.sampleRate * 0.3;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(80, now + 0.3);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.35);
    } catch (e) {
      console.warn('Web Audio synthesis not supported or muted:', e);
    }
  }, [getAudioContext]);

  // Subtle tap sound for copying excuse or selecting days
  const playTapSound = useCallback(() => {
    try {
      if (navigator.vibrate) {
        navigator.vibrate(35);
      }
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.08);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {
      // Ignore
    }
  }, [getAudioContext]);

  // Gentle 3-note harmonic chime for prayer arrival alerts
  const playPrayerChime = useCallback(() => {
    try {
      if (navigator.vibrate) {
        navigator.vibrate([120, 60, 120]);
      }
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 warm triad

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * 0.16;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.exponentialRampToValueAtTime(0.22, start + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.9);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.95);
      });
    } catch (e) {
      // Ignore audio errors when muted/blocked
    }
  }, [getAudioContext]);

  return {
    playRoastSound,
    playTapSound,
    playPrayerChime,
  };
};
