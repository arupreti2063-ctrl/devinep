import React, { useState, useEffect } from 'react'
import { collection, doc, getDoc, setDoc, increment, onSnapshot } from 'firebase/firestore'
import { db } from '../config/firebase'

const LikeButton = ({ contentId, contentType }) => {
  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const likesRef = doc(db, 'likes', `${contentType}_${contentId}`)
    
    const unsubscribe = onSnapshot(likesRef, (snapshot) => {
      if (snapshot.exists()) {
        setLikes(snapshot.data().count || 0)
      }
    })

    // localStorage मा already liked छ कि भनेर जाँच गर्ने
    const likedItems = JSON.parse(localStorage.getItem('likedItems') || '{}')
    if (likedItems[`${contentType}_${contentId}`]) {
      setLiked(true)
    }

    return () => unsubscribe()
  }, [contentId, contentType])

  const handleLike = async () => {
    if (liked || loading) return

    setLoading(true)
    try {
      const likesRef = doc(db, 'likes', `${contentType}_${contentId}`)
      const likesSnap = await getDoc(likesRef)

      if (likesSnap.exists()) {
        await setDoc(likesRef, {
          count: increment(1),
          contentType,
          contentId,
          lastUpdated: new Date()
        }, { merge: true })
      } else {
        await setDoc(likesRef, {
          count: 1,
          contentType,
          contentId,
          lastUpdated: new Date()
        })
      }

      // localStorage मा liked को रूपमा mark गर्ने
      const likedItems = JSON.parse(localStorage.getItem('likedItems') || '{}')
      likedItems[`${contentType}_${contentId}`] = true
      localStorage.setItem('likedItems', JSON.stringify(likedItems))
      
      setLiked(true)
      setLikes(prev => prev + 1)
    } catch (error) {
      console.error('Error liking content:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={liked || loading}
      className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-semibold transition-all text-sm sm:text-base min-h-[44px] ${
        liked
          ? 'bg-saffron-500 text-white cursor-default'
          : 'bg-parchment-200 text-parchment-800 hover:bg-saffron-100 hover:text-saffron-700'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <span className="text-lg sm:text-xl">{liked ? '❤️' : '🤍'}</span>
      <span className="font-devanagari">{liked ? 'मन पराइयो' : 'मन पराउनुहोस्'}</span>
      {likes > 0 && (
        <span className={`ml-2 font-devanagari text-xs sm:text-sm ${liked ? 'text-white' : 'text-parchment-600'}`}>
          ({likes})
        </span>
      )}
    </button>
  )
}

export default LikeButton
