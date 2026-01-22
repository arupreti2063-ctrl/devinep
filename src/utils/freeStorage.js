/**
 * नि:शुल्क Storage Alternative - Imgur API प्रयोग गरेर
 * Imgur ले नि:शुल्क image hosting दिन्छ, public uploads को लागि authentication चाहिँदैन
 * Free tier: Unlimited uploads, 200MB per image
 */

/**
 * Imgur मा image upload गर्ने function (नि:शुल्क, auth चाहिँदैन)
 * @param {File} file - Upload गर्ने image file
 * @returns {Promise<string>} - Image URL
 */
export const uploadImageToImgur = async (file) => {
  try {
    // File लाई base64 मा convert गर्ने
    const base64 = await fileToBase64(file)
    
    // Imgur मा upload गर्ने
    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        'Authorization': 'Client-ID 546c25a59c58ad7', // Public Imgur client ID (नि:शुल्क प्रयोग गर्न सकिन्छ)
      },
      body: base64
    })

    const data = await response.json()
    
    if (data.success) {
      return data.data.link // Image URL फर्काउँछ
    } else {
      throw new Error(data.data?.error || 'Upload failed')
    }
  } catch (error) {
    console.error('Imgur upload error:', error)
    throw error
  }
}

/**
 * Audio file upload गर्ने - Firestore मा base64 को रूपमा भण्डारण गर्ने (सानो files को लागि)
 * ठूलो audio files को लागि नि:शुल्क audio hosting service प्रयोग गर्ने सुझाव
 * @param {File} file - Audio file
 * @returns {Promise<string>} - Base64 data URL
 */
export const uploadAudioAsBase64 = async (file) => {
  try {
    // File size जाँच गर्ने (Firestore को लागि 1MB सम्म मात्र)
    if (file.size > 1024 * 1024) {
      throw new Error('Audio file too large. Maximum size: 1MB. Consider using a free audio hosting service.')
    }
    
    const base64 = await fileToBase64(file)
    return base64 // "data:audio/mp3;base64,..." जस्तो data URL फर्काउँछ
  } catch (error) {
    console.error('Audio upload error:', error)
    throw error
  }
}

/**
 * Alternative: नि:शुल्क hosting service मा audio upload गर्ने
 * Temporary solution - Firestore मा base64 को रूपमा भण्डारण
 * Production को लागि: SoundCloud API वा self-hosted solution विचार गर्ने
 */
export const uploadAudio = async (file) => {
  return await uploadAudioAsBase64(file)
}

/**
 * File लाई base64 string मा convert गर्ने function
 * @param {File} file - Convert गर्ने file
 * @returns {Promise<string>} - Base64 string
 */
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

/**
 * File upload गर्ने function (image वा audio)
 * स्वचालित रूपमा सही method छान्छ
 * @param {File} file - Upload गर्ने file
 * @param {string} type - 'image' वा 'audio'
 * @returns {Promise<string>} - File URL
 */
export const uploadFile = async (file, type = 'image') => {
  if (type === 'image') {
    return await uploadImageToImgur(file)
  } else if (type === 'audio') {
    return await uploadAudio(file)
  } else {
    throw new Error('Unsupported file type. Use "image" or "audio"')
  }
}
