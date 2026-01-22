import React, { useState, useRef, useEffect } from 'react'

const AudioPlayer = ({ audioUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime)
      const updateDuration = () => setDuration(audio.duration)
      
      audio.addEventListener('timeupdate', updateTime)
      audio.addEventListener('loadedmetadata', updateDuration)
      
      return () => {
        audio.removeEventListener('timeupdate', updateTime)
        audio.removeEventListener('loadedmetadata', updateDuration)
      }
    }
  }, [audioUrl])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSeek = (e) => {
    if (audioRef.current) {
      const seekTime = (e.target.value / 100) * duration
      audioRef.current.currentTime = seekTime
      setCurrentTime(seekTime)
    }
  }

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  if (!audioUrl) {
    return (
      <div className="bg-parchment-100 rounded-lg p-4 text-center">
        <p className="text-parchment-600 font-devanagari">ऑडियो उपलब्ध छैन</p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-saffron-50 to-sandalwood-50 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
      {title && (
        <h4 className="text-base sm:text-lg font-bold text-saffron-700 mb-3 sm:mb-4 font-devanagari">{title}</h4>
      )}
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={togglePlay}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-saffron-500 text-white hover:bg-saffron-600 active:scale-95 transition-all flex items-center justify-center shadow-md hover:shadow-lg flex-shrink-0 min-w-[44px] min-h-[44px]"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5 sm:ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <input
            type="range"
            min="0"
            max="100"
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
            className="w-full h-2 sm:h-2.5 bg-parchment-300 rounded-lg appearance-none cursor-pointer accent-saffron-500 touch-none sm:touch-auto"
            style={{ WebkitAppearance: 'none', appearance: 'none' }}
          />
          <div className="flex justify-between text-xs sm:text-sm text-parchment-600 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer
