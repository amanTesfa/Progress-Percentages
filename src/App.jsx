import React, { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [seconds, setSeconds] = useState(1)
  const [percent, setPercent] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // Simple, easy-to-read animation using setInterval
  function animateTo100(durationSec) {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    setPercent(0)
    const dur = Number(durationSec)
    if (!dur || dur <= 0) {
      setPercent(100)
      return
    }

    const durationMs = dur * 1000
    const start = Date.now()
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / durationMs, 1)
      setPercent(Math.round(progress * 100))
      if (progress >= 1) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }, 50)
  }

  const radius = 80
  const stroke = 15
  const normalizedRadius = radius - stroke 
  const circumference = 2 * Math.PI * normalizedRadius
  const strokeDashoffset = circumference - (percent / 100) * circumference

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-cyan-50 to-green-100 flex justify-center py-8">
      <div className="flex  flex-col gap-8  bg-white/80 shadow-xl rounded-3xl p-8 items-center max-w-6xl w-full mx-4">
        {/* Controls and Progress 1 */}
        <div className="flex flex-col items-center justify-center w-full max-w-xs mb-8 md:mb-0">
          <label className="mb-3 text-base font-semibold text-cyan-700 tracking-wide">Duration (seconds)</label>
          <div className="flex gap-2 mb-6 w-full justify-center">
            <input
              type="number"
              min="0"
              step="0.1"
              value={seconds}
              onChange={(e) => setSeconds(parseFloat(e.target.value) || 0)}
              className="w-24 px-4 py-2 border-2 border-cyan-300 focus:border-cyan-500 rounded-lg text-base shadow-sm outline-none transition"
            />
            <button
              onClick={() => animateTo100(seconds)}
              className="px-5 py-2 bg-cyan-500 text-white rounded-lg font-semibold shadow hover:bg-cyan-600 transition"
            >
              Animate
            </button>
          </div>
        </div>
        <div className="md:flex md:flex-row gap-8 w-full justify-center">
        {/* Progress 1 */}
        <div id="box1" className="flex flex-col justify-center items-center p-6 rounded-2xl bg-white/70 shadow-md w-full max-w-xs">
            <label className="mb-3 text-base font-semibold text-cyan-700 tracking-wide">Circular Progress</label>
          <div className="relative">
          <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
            <circle
              stroke="#e5e7eb"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke="#16a34a"
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              style={{ strokeDashoffset }}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-medium">{percent}%</span>
          </div>
        </div>
      </div>

        {/* Progress 2 */}
        <div id="box2" className="flex flex-col justify-center p-6 rounded-2xl bg-white/70 shadow-md w-full max-w-xs">
          <label className="mb-3 text-base font-semibold text-cyan-700 tracking-wide">Horizontal Progress</label>
          <div className="w-64 h-7 bg-cyan-100 border-2 border-cyan-300 rounded-full overflow-hidden mb-4 shadow-inner">
            <div
              className="h-full bg-linear-to-r from-cyan-400 to-green-400 transition-all duration-200"
              style={{ width: percent + '%' }}
            ></div>
          </div>
          <span className="text-lg font-bold text-cyan-700">{percent}%</span>
        </div>
        {/* Progress 3 */}
        <div id="box3" className="flex flex-col justify-center p-6 rounded-2xl bg-white/70 shadow-md w-full max-w-xs">
          <label className="mb-3 text-base font-semibold text-cyan-700 tracking-wide">Wave Progress</label>
          <div className="relative w-40 h-40 mb-4">
          <svg viewBox="0 0 160 160" className="absolute top-0 left-0 w-full h-full">
            <defs>
              <clipPath id="wave-clip">
                <circle cx="80" cy="80" r="75" />
              </clipPath>
            </defs>
            <g clipPath="url(#wave-clip)">
              {(() => {
                // 155 is the  starting Y position of the wave. by default the Y starts at the bottom  of 80, the same to X, at the top most the value of y is 5
                const waveY = 155 - (percent * 1.5);
                const controlY = waveY - 10 * Math.sin(percent / 10);
                return (
                  <path
                    d={`
                      M0,${waveY}
                      Q40,${controlY},80,${waveY}
                      T160,${waveY}
                      V160 H0 Z
                    `}
                    fill="#16a34a"
                    style={{ transition: 'd 0.2s'}}
                  />
                );
              })()}
            </g>
            <circle cx="80" cy="80" r="75" fill="none" stroke="#e5e7eb" strokeWidth="4" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-medium text-cyan-700">{percent}%</span>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default App
