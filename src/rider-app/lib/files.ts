const MAX_BYTES = 1_200_000;

export function readFileAsDataUrl(file: File): Promise<{ name: string; dataUrl: string }> {
  return new Promise((resolve, reject) => {
    if (file.size > MAX_BYTES) {
      reject(new Error('File is too large. Please use an image under ~1MB.'));
      return;
    }
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please upload an image file (JPG or PNG).'));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      resolve({ name: file.name, dataUrl: String(reader.result) });
    };
    reader.onerror = () => reject(new Error('Could not read that file.'));
    reader.readAsDataURL(file);
  });
}
