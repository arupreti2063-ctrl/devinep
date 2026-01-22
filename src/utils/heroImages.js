// Utility function to get hero image based on route/path
export const getHeroImage = (pathname) => {
  const imageBasePath = '/images of the cover/Camera Roll'
  
  const heroImageMap = {
    '/': `${imageBasePath}/main lead picture.jpeg`, // Home
    '/about': `${imageBasePath}/devinepalpic1.jpeg`, // About
    '/works': `${imageBasePath}/main lead picture.jpeg`, // Works
    '/chhanda-gyan': `${imageBasePath}/devinepalpic2.jpeg`, // Chhanda Gyan
    '/lekhan-shilpa': `${imageBasePath}/devinepalpic3.jpeg`, // Lekhan Shilpa
    '/vigya-vichar': `${imageBasePath}/devinepalpic4.jpeg`, // Vigya Vichar
    '/admin': `${imageBasePath}/main lead picture.jpeg`, // Admin (fallback)
  }
  
  // Return mapped image or default
  return heroImageMap[pathname] || heroImageMap['/']
}

// Get all devinepalpic images for gallery
export const getGalleryImages = () => {
  const imageBasePath = '/images of the cover/Camera Roll'
  return [
    `${imageBasePath}/devinepalpic1.jpeg`,
    `${imageBasePath}/devinepalpic2.jpeg`,
    `${imageBasePath}/devinepalpic3.jpeg`,
    `${imageBasePath}/devinepalpic4.jpeg`,
  ]
}

// Get main lead picture
export const getMainLeadPicture = () => {
  return '/images of the cover/Camera Roll/main lead picture.jpeg'
}
