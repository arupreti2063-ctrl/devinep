// Utility to initialize Firestore collections
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

/**
 * Initialize all required Firestore collections
 * Collections are created automatically when first document is added,
 * but this function ensures they exist with initial structure
 */
export const initializeCollections = async () => {
  try {
    console.log('Initializing Firestore collections...')

    // Collection names
    const collections = [
      'poems',
      'articles',
      'externalList',
      'comments',
      'likes'
    ]

    // Initialize each collection with a placeholder document if empty
    for (const collectionName of collections) {
      try {
        // Check if collection exists by trying to read a document
        // If collection is empty, create an initial placeholder
        const placeholderRef = doc(db, collectionName, '_initialized')
        const docSnap = await getDoc(placeholderRef)

        if (!docSnap.exists()) {
          // Create a placeholder document to initialize the collection
          await setDoc(placeholderRef, {
            initialized: true,
            createdAt: new Date(),
            note: 'Collection initialized - this document can be deleted'
          })
          console.log(`✓ Collection '${collectionName}' initialized`)
        } else {
          console.log(`✓ Collection '${collectionName}' already exists`)
        }
      } catch (error) {
        console.error(`Error initializing collection '${collectionName}':`, error)
      }
    }

    console.log('All collections initialized successfully!')
    return { success: true, message: 'Collections initialized' }
  } catch (error) {
    console.error('Error initializing collections:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Initialize collections with sample data structure
 * This creates example documents showing the expected structure
 */
export const initializeWithSampleData = async () => {
  try {
    console.log('Initializing collections with sample data structure...')

    // Sample poem structure
    const samplePoem = {
      title: 'Sample Poem Title',
      content: 'This is a sample poem content...',
      excerpt: 'Sample excerpt',
      category: 'छन्द',
      audioUrl: '',
      imageUrl: '',
      published: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Sample article structure
    const sampleArticle = {
      title: 'Sample Article Title',
      content: 'This is a sample article content...',
      excerpt: 'Sample excerpt',
      category: 'लेख',
      imageUrl: '',
      published: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Sample external list item structure
    const sampleExternalItem = {
      title: 'Sample Publication/Award',
      description: 'Sample description',
      year: '2026',
      type: 'publication', // or 'award'
      link: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Sample comment structure
    const sampleComment = {
      postId: '',
      postType: 'poem', // or 'article'
      author: 'Anonymous',
      content: 'Sample comment',
      createdAt: new Date()
    }

    // Sample like structure
    const sampleLike = {
      postId: '',
      postType: 'poem', // or 'article'
      count: 0,
      lastUpdated: new Date()
    }

    // Create sample documents (only if collections are empty)
    const collections = [
      { name: 'poems', sample: samplePoem },
      { name: 'articles', sample: sampleArticle },
      { name: 'externalList', sample: sampleExternalItem },
      { name: 'comments', sample: sampleComment },
      { name: 'likes', sample: sampleLike }
    ]

    for (const { name, sample } of collections) {
      try {
        const sampleRef = doc(db, name, '_sample_structure')
        const docSnap = await getDoc(sampleRef)

        if (!docSnap.exists()) {
          await setDoc(sampleRef, {
            ...sample,
            _isSample: true,
            _note: 'This is a sample structure document - can be deleted'
          })
          console.log(`✓ Sample structure created for '${name}'`)
        }
      } catch (error) {
        console.error(`Error creating sample for '${name}':`, error)
      }
    }

    console.log('Sample data structures created!')
    return { success: true, message: 'Sample data structures created' }
  } catch (error) {
    console.error('Error initializing sample data:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Clean up initialization documents
 * Removes the placeholder/sample documents created during initialization
 */
export const cleanupInitializationDocs = async () => {
  try {
    console.log('Cleaning up initialization documents...')

    const collections = ['poems', 'articles', 'externalList', 'comments', 'likes']
    const { deleteDoc } = await import('firebase/firestore')

    for (const collectionName of collections) {
      try {
        const initRef = doc(db, collectionName, '_initialized')
        const sampleRef = doc(db, collectionName, '_sample_structure')

        const initSnap = await getDoc(initRef)
        const sampleSnap = await getDoc(sampleRef)

        if (initSnap.exists()) {
          await deleteDoc(initRef)
          console.log(`✓ Removed initialization doc from '${collectionName}'`)
        }

        if (sampleSnap.exists()) {
          await deleteDoc(sampleRef)
          console.log(`✓ Removed sample doc from '${collectionName}'`)
        }
      } catch (error) {
        console.error(`Error cleaning up '${collectionName}':`, error)
      }
    }

    console.log('Cleanup completed!')
    return { success: true, message: 'Cleanup completed' }
  } catch (error) {
    console.error('Error during cleanup:', error)
    return { success: false, error: error.message }
  }
}
