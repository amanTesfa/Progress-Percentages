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
    <div className="md:flex md:flex-row justify-center p-8 h-screen w-full ">
      <div id="box1" className="flex flex-col items-center p-6 min-w-xl">
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
            className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-green-600"
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

      <div id="box2" className="flex flex-col items-center p-6 min-w-xl">
        <label className="mb-2 text-sm text-gray-700">Horizontal Progress</label>
        <div className="w-64 h-6 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-green-500 transition-all duration-100"
            style={{ width: percent + '%' }}
          ></div>
        </div>
        <span className="text-lg font-medium">{percent}%</span>
      </div>
      <div id="box3" className="flex flex-col items-center p-6 min-w-xl">Percentage 3</div>
    </div>
  )
}

export default App
