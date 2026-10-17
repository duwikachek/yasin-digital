const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export const isCloudinaryConfigured = Boolean(
  CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET
);

export const isImgbbConfigured = Boolean(IMGBB_API_KEY);

export const isImageHostingConfigured = isCloudinaryConfigured || isImgbbConfigured;

export const imageProvider = isCloudinaryConfigured
  ? 'cloudinary'
  : isImgbbConfigured
    ? 'imgbb'
    : null;

export const imageProviderLabel = {
  cloudinary: 'Cloudinary',
  imgbb: 'imgbb',
}[imageProvider] || 'Penyimpanan lokal';

async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );

  if (!res.ok) throw new Error(`Cloudinary menolak upload (HTTP ${res.status})`);
  const data = await res.json();
  if (!data?.secure_url) throw new Error('Cloudinary tidak mengembalikan URL gambar');
  return data.secure_url;
}

async function uploadToImgbb(file) {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error(`imgbb menolak upload (HTTP ${res.status})`);
  const data = await res.json();
  if (!data?.success) throw new Error(data?.error?.message || 'imgbb gagal mengunggah gambar');
  return data.data?.display_url || data.data?.url;
}

export async function uploadImage(file) {
  if (isCloudinaryConfigured) return uploadToCloudinary(file);
  if (isImgbbConfigured) return uploadToImgbb(file);
  throw new Error('Hosting gambar belum dikonfigurasi (Cloudinary/imgbb).');
}
