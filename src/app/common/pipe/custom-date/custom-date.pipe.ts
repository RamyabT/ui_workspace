import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  private userTimezone = '';
  constructor() {
    this.userTimezone = moment.tz.guess();
  }
  transform(
    value: string | moment.Moment, 
    format: string = 'dd MMM yyyy', from: string = this.userTimezone, to: string = this.userTimezone) : string {
    console.log(value)
    console.log(moment(value).tz(this.userTimezone).format(format));
    // let date;
    // if (typeof value === 'string' && value !== '') {
    //   date = moment(value);
    // } else if (moment.isMoment(value)) {
    //   date = value;
      
    // } else {
    //   date = moment();
    // }
    let date;
    if (typeof value === 'string' && value !== '') {
      date = moment.tz(value, 'YYYY-MM-DD HH:mm:ss', from).utc().tz(to);
    } else if (moment.isMoment(value)) {
      date = value.tz();
      date = moment.tz(value.format('YYYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD HH:mm:ss', from).utc().tz(to);
    } else {
      date = moment();
      date = moment.tz(moment().format('YYYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD HH:mm:ss', from).utc().tz(to);
    }
    console.log(date.format('dd MMM yyyy HH:mm'));
    
    return date.format(format);
  }
}