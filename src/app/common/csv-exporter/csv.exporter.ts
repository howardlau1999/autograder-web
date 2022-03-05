import { unparse } from 'papaparse';
import { downloadBlob } from '../downloader/blob.downloader';

export function exportCSV(data: any, filename: string) {
  const csv = unparse(data);
  downloadBlob(new Blob([csv], { type: 'text/csv' }), filename);
}
