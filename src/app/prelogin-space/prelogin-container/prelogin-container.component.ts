import { Component, OnInit } from '@angular/core';
import { ActiveSpaceInfoService } from '@dep/core';

@Component({
  selector: 'app-prelogin-container',
  templateUrl: './prelogin-container.component.html',
  styleUrls: ['./prelogin-container.component.scss']
})
export class PreloginContainerComponent implements OnInit {

  onboardingClassName: string = ""
  constructor(
    protected _activeSpaceInfo: ActiveSpaceInfoService
  ) { }

  ngOnInit(): void {}

}
