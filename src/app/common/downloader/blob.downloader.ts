export function downloadBlob(blob: Blob, filename: string) {
  const blobURL = URL.createObjectURL(blob);
  downloadURL(blobURL, filename);
  URL.revokeObjectURL(blobURL);
}

export function downloadURL(url: string, filename: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
}
