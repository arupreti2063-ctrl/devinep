import React, { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

const CommentsSection = ({ contentId, contentType }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // contentId र contentType भएमात्र comments subscribe गर्ने
    if (!contentId || !contentType) {
      setComments([])
      return
    }

    const commentsRef = collection(db, 'comments')
    const q = query(
      commentsRef,
      orderBy('createdAt', 'desc')
    )
    
    // contentId र contentType अनुसार filter गर्ने, timeout सहित
    let timeoutId
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        clearTimeout(timeoutId)
        const commentsList = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(comment => 
            comment.contentId === contentId && comment.contentType === contentType
          )
        setComments(commentsList)
      },
      (error) => {
        console.error('Error fetching comments:', error)
        // Error भएमा empty comments राख्ने
      }
    )

    // Timeout fallback - ५ सेकेन्ड पछि empty comments set गर्ने
    timeoutId = setTimeout(() => {
      setComments([])
    }, 5000)

    return () => {
      clearTimeout(timeoutId)
      unsubscribe()
    }
  }, [contentId, contentType])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim() || !authorName.trim()) return

    setLoading(true)
    try {
      await addDoc(collection(db, 'comments'), {
        contentId,
        contentType,
        authorName,
        text: newComment,
        createdAt: serverTimestamp(),
      })
      setNewComment('')
      setAuthorName('')
    } catch (error) {
      console.error('Error adding comment:', error)
      alert('टिप्पणी थप्न असफल भयो')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return ''
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('ne-NP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="mt-6 sm:mt-8 card">
      <h3 className="text-xl sm:text-2xl font-bold text-saffron-700 mb-4 sm:mb-6 font-devanagari">
        टिप्पणीहरू ({comments.length})
      </h3>

      {/* Comment Form - नयाँ टिप्पणी थप्ने form */}
      <form onSubmit={handleSubmit} className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
        <div>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="तपाईंको नाम"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-parchment-300 focus:border-saffron-500 focus:outline-none font-devanagari text-base sm:text-lg min-h-[44px]"
            required
          />
        </div>
        <div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="टिप्पणी लेख्नुहोस्..."
            rows="3"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-parchment-300 focus:border-saffron-500 focus:outline-none font-devanagari resize-none text-base sm:text-lg"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary font-devanagari disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg w-full sm:w-auto min-h-[48px]"
        >
          {loading ? 'पठाइदैछ...' : 'टिप्पणी पठाउनुहोस्'}
        </button>
      </form>

      {/* Comments List - सबै टिप्पणीहरू list मा देखाउने */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-center text-parchment-600 font-devanagari py-8">
            अहिलेसम्म कुनै टिप्पणी छैन। पहिलो टिप्पणी गर्नुहोस्!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="border-l-4 border-saffron-400 pl-4 py-2 bg-parchment-50 rounded-r-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-saffron-700 font-devanagari">
                  {comment.authorName}
                </h4>
                <span className="text-sm text-parchment-600 font-devanagari">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <p className="text-parchment-700 font-devanagari leading-relaxed">
                {comment.text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default CommentsSection
