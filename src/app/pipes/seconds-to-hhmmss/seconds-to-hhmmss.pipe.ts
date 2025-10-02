import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToHhmmss'
})
export class SecondsToHhmmssPipe implements PipeTransform {

  transform(totalSeconds: number): string {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  }
}