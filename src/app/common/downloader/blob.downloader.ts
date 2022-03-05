import { downloadURL } from './url.downloader';

export function downloadBlob(blob: Blob, filename: string) {
  const blobURL = URL.createObjectURL(blob);
  downloadURL(blobURL, filename);
  URL.revokeObjectURL(blobURL);
}
