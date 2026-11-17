export function dataUrlToBlob(dataUrl: string): Blob {
  const [header, data] = dataUrl.split(',');
  if (!header || data === undefined) {
    throw new Error('Invalid image data.');
  }
  const mimeMatch = /data:(.*?);base64/.exec(header);
  const mime = mimeMatch?.[1] || 'image/jpeg';
  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mime });
}

export function extensionFromDataUrl(dataUrl: string, fallback = 'jpg'): string {
  const mimeMatch = /^data:(image\/[a-zA-Z0-9.+-]+);/.exec(dataUrl);
  const mime = mimeMatch?.[1] || '';
  if (mime.includes('png')) return 'png';
  if (mime.includes('webp')) return 'webp';
  if (mime.includes('jpeg') || mime.includes('jpg')) return 'jpg';
  return fallback;
}
