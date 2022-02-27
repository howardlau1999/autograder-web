import { unparse } from 'papaparse';

export function exportCSV(data: any, filename: string) {
  const csv = unparse(data);
  const a = document.createElement('a');
  a.href = `data:text/csv;charset=utf-8,${encodeURI(csv)}`;
  a.target = '_blank';
  a.download = filename;
  a.click();
}
