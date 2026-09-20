import React, { useState, useEffect, useRef } from 'react';

export const InteractiveBoyAvatar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [eyeOffset, setEyeOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isWinking, setIsWinking] = useState(false);

  // Dynamic eye tracking of cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const faceCenterX = rect.left + rect.width / 2;
      const faceCenterY = rect.top + rect.height / 2 - 20;

      const deltaX = e.clientX - faceCenterX;
      const deltaY = e.clientY - faceCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxOffset = 5.5; // max pupil movement

      if (distance === 0) {
        setEyeOffset({ x: 0, y: 0 });
      } else {
        const factor = Math.min(distance / 200, 1) * maxOffset;
        setEyeOffset({
          x: (deltaX / distance) * factor,
          y: (deltaY / distance) * factor,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Natural blinking loop (every 3.8s)
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (!isWinking) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 180);
      }
    }, 3800);

    return () => clearInterval(blinkInterval);
  }, [isWinking]);

  const triggerWink = () => {
    setIsWinking(true);
    setTimeout(() => setIsWinking(false), 600);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Avatar Container */}
      <div
        ref={containerRef}
        className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center select-none"
      >
        {/* Ambient background glow circle */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-emerald-500/20 via-cyan-500/20 to-blue-600/30 blur-xl animate-pulse-slow" />

        {/* Outer orbital rings */}
        <div className="absolute inset-0 rounded-full border border-emerald-500/20 border-dashed animate-[spin_40s_linear_infinite]" />
        <div className="absolute -inset-2 rounded-full border border-cyan-500/15 animate-[spin_30s_linear_infinite_reverse]" />

        {/* Circular Avatar Backdrop (matching screenshot 1) */}
        <div
          onClick={triggerWink}
          className="relative w-48 h-48 sm:w-52 sm:h-52 rounded-full bg-[#111c38] border-2 border-emerald-500/30 shadow-inner overflow-hidden flex items-center justify-center cursor-pointer transition-transform active:scale-95"
          title="Click to wink"
        >
          
          {/* Detailed SVG Illustration of Boy with Blue Hoodie */}
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full transform translate-y-2"
          >
            <defs>
              <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              <linearGradient id="hoodieDark" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e40af" />
                <stop offset="100%" stopColor="#172554" />
              </linearGradient>
              <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffe4c4" />
                <stop offset="100%" stopColor="#fed7aa" />
              </linearGradient>
              <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1f2937" />
                <stop offset="100%" stopColor="#111827" />
              </linearGradient>
            </defs>

            {/* Blue Hoodie Shoulders & Body */}
            <path
              d="M30 200 C30 155 60 145 100 145 C140 145 170 155 170 200 Z"
              fill="url(#hoodieGrad)"
            />
            {/* Hoodie Collar / Hood Lining */}
            <path
              d="M65 145 C75 168 125 168 135 145 C120 178 80 178 65 145 Z"
              fill="url(#hoodieDark)"
            />
            {/* Hoodie Drawstrings */}
            <path d="M86 160 Q86 182 84 192" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M114 160 Q114 182 116 192" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="84" cy="193" r="2.5" fill="#60a5fa" />
            <circle cx="116" cy="193" r="2.5" fill="#60a5fa" />

            {/* Neck */}
            <path d="M85 130 L85 152 Q100 156 115 152 L115 130 Z" fill="#fed7aa" />

            {/* Ears */}
            <ellipse cx="61" cy="98" rx="8" ry="11" fill="#fed7aa" />
            <ellipse cx="61" cy="98" rx="4" ry="6" fill="#fdba74" />
            <ellipse cx="139" cy="98" rx="8" ry="11" fill="#fed7aa" />
            <ellipse cx="139" cy="98" rx="4" ry="6" fill="#fdba74" />

            {/* Face Shape */}
            <ellipse cx="100" cy="100" rx="38" ry="42" fill="url(#skinGrad)" />

            {/* Cheeks blush */}
            <ellipse cx="76" cy="109" rx="6" ry="3.5" fill="#fca5a5" opacity="0.45" />
            <ellipse cx="124" cy="109" rx="6" ry="3.5" fill="#fca5a5" opacity="0.45" />

            {/* Eyebrows */}
            <path d="M72 80 Q84 76 92 81" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path
              d={isWinking ? "M108 81 Q116 75 128 79" : "M108 81 Q116 76 128 80"}
              stroke="#1f2937"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />

            {/* LEFT EYE */}
            <g id="left-eye">
              {/* White Sclera */}
              <ellipse cx="82" cy="94" rx="9" ry="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.5" />
              {/* Iris & Pupil tracking cursor */}
              <g transform={`translate(${eyeOffset.x}, ${eyeOffset.y})`}>
                <circle cx="82" cy="94" r="5.2" fill="#0f766e" /> {/* Emerald-cyan iris */}
                <circle cx="82" cy="94" r="3.2" fill="#09090b" /> {/* Pupil */}
                <circle cx="80.5" cy="92.5" r="1.6" fill="#ffffff" /> {/* Catchlight */}
                <circle cx="83.8" cy="95.5" r="0.8" fill="#ffffff" opacity="0.8" />
              </g>

              {/* Eyelids (Palke) - Top Lid closing down on blink */}
              <path
                d="M72 94 Q82 83 92 94"
                stroke="#1f2937"
                strokeWidth="1.8"
                fill="none"
              />
              <path
                d={
                  isBlinking
                    ? "M72 94 Q82 102 92 94"
                    : "M72 94 Q82 86 92 94"
                }
                fill={isBlinking ? "#fed7aa" : "none"}
                stroke="#1f2937"
                strokeWidth={isBlinking ? 2.5 : 1.2}
              />
            </g>

            {/* RIGHT EYE */}
            <g id="right-eye">
              {/* White Sclera */}
              <ellipse cx="118" cy="94" rx="9" ry="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.5" />
              {/* Iris & Pupil */}
              {(!isBlinking && !isWinking) && (
                <g transform={`translate(${eyeOffset.x}, ${eyeOffset.y})`}>
                  <circle cx="118" cy="94" r="5.2" fill="#0f766e" />
                  <circle cx="118" cy="94" r="3.2" fill="#09090b" />
                  <circle cx="116.5" cy="92.5" r="1.6" fill="#ffffff" />
                  <circle cx="119.8" cy="95.5" r="0.8" fill="#ffffff" opacity="0.8" />
                </g>
              )}

              {/* Right Eyelid / Wink */}
              {isWinking ? (
                <path
                  d="M109 95 Q118 101 127 95"
                  stroke="#1f2937"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  fill="none"
                />
              ) : (
                <>
                  <path
                    d="M108 94 Q118 83 128 94"
                    stroke="#1f2937"
                    strokeWidth="1.8"
                    fill="none"
                  />
                  <path
                    d={
                      isBlinking
                        ? "M108 94 Q118 102 128 94"
                        : "M108 94 Q118 86 128 94"
                    }
                    fill={isBlinking ? "#fed7aa" : "none"}
                    stroke="#1f2937"
                    strokeWidth={isBlinking ? 2.5 : 1.2}
                  />
                </>
              )}
            </g>

            {/* Nose */}
            <path d="M100 97 Q102 106 97 108" stroke="#fdba74" strokeWidth="2.2" strokeLinecap="round" fill="none" />

            {/* Smiling Mouth (matching happy cartoon in screenshot 1) */}
            <path
              d="M87 117 Q100 131 113 117"
              fill="#ffffff"
              stroke="#b91c1c"
              strokeWidth="1.5"
            />
            <path
              d="M87 117 Q100 131 113 117 Z"
              fill="#ef4444"
              opacity="0.85"
            />
            <path
              d="M91 117 Q100 123 109 117"
              fill="#ffffff"
            />

            {/* Hair (Black/Dark, styled modern cut matching screenshot) */}
            <path
              d="M62 90 C55 60 75 42 100 42 C125 42 145 60 138 90 C136 75 125 66 116 68 C110 60 95 60 88 68 C80 66 65 74 62 90 Z"
              fill="url(#hairGrad)"
            />
            {/* Front fringe spikes */}
            <path
              d="M74 65 C82 50 96 55 98 68 C104 55 118 56 122 72 C128 65 136 72 135 84 C130 76 122 76 118 82 C114 74 102 75 97 83 C92 75 80 77 74 65 Z"
              fill="url(#hairGrad)"
            />
          </svg>
        </div>

        {/* Live interaction status badge */}
        <div className="absolute -bottom-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-emerald-500/40 text-[11px] font-medium text-emerald-400 shadow-lg backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Tracking cursor</span>
        </div>
      </div>
    </div>
  );
};
