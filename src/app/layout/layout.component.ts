import { Component, OnInit, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    protected activeSpaceInfoService:ActiveSpaceInfoService,
    protected deviceMgr: DeviceDetectorService
  ) { 
  }

  ngOnInit(): void {}

}
