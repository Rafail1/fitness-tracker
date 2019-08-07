import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firedate'
})
export class FiredatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return this.formatDate(new Date(value.seconds * 1000));
  }
  formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

}
