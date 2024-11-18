import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortTransform',
  standalone: true
})
export class SortPipe implements PipeTransform {
  transform(
    items?: any[],
    key: string = 'amount',
    sort: 'asc' | 'desc' = 'asc'
  ): any[] {
    if (!items?.length) {
      return [];
    }
    return items!.sort((a, b) =>
      sort === 'asc' ? a[key] - b[key] : b[key] - a[key]
    );
  }
}
