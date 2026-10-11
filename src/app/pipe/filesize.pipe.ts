import { Pipe, PipeTransform } from '@angular/core';
import { filesize } from 'filesize';

@Pipe({
  name: 'filesize',
  standalone: false,
})
export class FilesizePipe implements PipeTransform {
  transform(bytes: number): string {
    return filesize(bytes, { base: 2 });
  }
}
