import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ruleAbsoluteValue',
  standalone: true
})
export class ToArrayPipe implements PipeTransform {
  transform(value: number): number {
    return Math.abs(1 - value);
  }
}
