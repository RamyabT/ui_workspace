import { Component, OnInit } from '@angular/core';
import { APPCONSTANTS } from '@dep/constants';
import { UserAuthService } from '@dep/services';

@Component({
  selector: 'app-screen-busy',
  templateUrl: './screen-busy.component.html',
  styleUrls: ['./screen-busy.component.scss']
})
export class ScreenBusyComponent implements OnInit {
  protected screenBusySpinnerImage: string = "";
  
  constructor(
    protected _userService:UserAuthService
  ) { }

  ngOnInit(): void {
    this.screenBusySpinnerImage = APPCONSTANTS.screenBusySpinnerImage;
  }

}
