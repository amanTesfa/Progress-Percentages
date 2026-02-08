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

  const radius = 36
  const stroke = 8
  const normalizedRadius = radius - stroke / 2
  const circumference = 2 * Math.PI * normalizedRadius
  const strokeDashoffset = circumference - (percent / 100) * circumference

  return (
    <div className="flex flex-col md:flex-row gap-60 justify-center p-8 h-screen w-full items-center">
      <div id="box1" className="flex flex-col items-center bg-white/80 rounded-lg p-6 shadow">
        <label className="mb-2 text-sm text-gray-700">Duration (seconds)</label>
        <div className="flex gap-2 mb-4">
          <input
            type="number"
            min="0"
            step="0.1"
            value={seconds}
            onChange={(e) => setSeconds(parseFloat(e.target.value) || 0)}
            className="w-24 px-3 py-2 border rounded text-sm"
          />
          <button
            onClick={() => animateTo100(seconds)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Apply
          </button>
        </div>

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
              strokeDasharray={`${circumference} ${circumference}`}
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

      <div id="box2" className="flex items-center justify-center w-40 h-40 bg-gray-100 rounded">Percentage 2</div>
      <div id="box3" className="flex items-center justify-center w-40 h-40 bg-gray-100 rounded">Percentage 3</div>
    </div>
  )
}

export default App
