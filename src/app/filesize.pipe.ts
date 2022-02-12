import { Pipe, PipeTransform } from '@angular/core';
import * as filesize from 'filesize';

@Pipe({
  name: 'filesize',
})
export class FilesizePipe implements PipeTransform {
  transform(bytes: number): string {
    return filesize(bytes);
  }
}
