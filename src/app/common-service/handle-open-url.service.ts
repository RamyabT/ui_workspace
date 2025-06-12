import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class HandleOpenUrlService {
handleOpenUrl$: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  constructor() { 
    this.listenIntent();
  }
  private listenIntent(){
    let self = this;
    window.handleOpenURL = async function(input: string) {
      if(input.indexOf('/callback') >= 0) {
        var authCode = self.getParameterByName('code', input);
        var state = self.getParameterByName('state', input);
        if(authCode) {
          self.handleOpenUrl$.next({
            hint: 'login_callback',
            authCode: authCode,
            state: state
          })
        } else {
          console.log('No authorization code found in URL.');
        }
      }
    }
  }
  private getParameterByName(name: any, url: any) {
    if (!url) url = window.location.href;
    name = name.replace(/[[]]/g, '\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
}
