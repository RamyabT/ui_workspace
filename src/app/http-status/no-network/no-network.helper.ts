import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import {
 
  BaseFpxComponentState,
  BaseFpxFormHelper,
} from '@fpx/core';


export class NoNetworkState extends BaseFpxComponentState {

}

@Injectable()
export class NoNetworkHelper extends BaseFpxFormHelper<NoNetworkState> {
  constructor(
    private _router : Router
  ) {
    super(new NoNetworkState());
  }

 
}
