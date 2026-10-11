import { Pipe, PipeTransform } from '@angular/core';
import { filesize } from 'filesize';

@Pipe({
  name: 'filesize',
  standalone: false,
})
export class FilesizePipe implements PipeTransform {
  transform(bytes: number | null | undefined): string {
    return filesize(bytes ?? 0, { base: 2 });
  }
}
