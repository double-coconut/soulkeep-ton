import { Pipe, PipeTransform } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Pipe({
  name: 'withDelay',
  standalone: true
})
export class WithDelayPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): Observable<number> {
    return value === 100 ? of(100).pipe(delay(1000)) : of(value);
  }
}
