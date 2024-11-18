import { Pipe, PipeTransform } from '@angular/core';
import { toHoursMinutesAndSeconds } from '@common/utils/utils';
import { Observable, of, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

@Pipe({
  name: 'countDown',
  standalone: true
})
export class CountDownPipe implements PipeTransform {
  transform(remainingTime: number | undefined, handleRefresh: () => void, component: any): Observable<string> {
    let timeToShow = '00h 00m 00s';
    if (!remainingTime) {
      return of(timeToShow);
    }
    let initialSeconds = remainingTime / 1000;
    return timer(0, 1000)
      .pipe(
        map(() => {
          initialSeconds -= 1;
          if (initialSeconds === 0) {
            handleRefresh.call(component);
            return timeToShow;
          }
          const { h, m, s } = toHoursMinutesAndSeconds(initialSeconds);
          return `${h}h ${m}m ${s}s`;
        }),
        takeWhile(() => initialSeconds >= 0)
      );

  }


}
