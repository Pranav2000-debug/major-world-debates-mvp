export const getPdfThumbnail = (publicId) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloudName}/image/upload/pg_1,w_400,h_260,c_fill/${publicId}.png`;
};
