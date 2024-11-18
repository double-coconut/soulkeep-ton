import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toArray',
  standalone: true
})
export class ToArrayPipe implements PipeTransform {
  transform(value: number): any[] {
    if (isNaN(value)) {
      return [];
    }
    return [...new Array(value)];
  }
}
