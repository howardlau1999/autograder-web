import { unparse } from 'papaparse';
import { downloadBlob } from './blob.downloader';

export function downloadCSV(data: any, filename: string) {
  const csv = unparse(data);
  downloadBlob(new Blob([csv], { type: 'text/csv' }), filename);
}
