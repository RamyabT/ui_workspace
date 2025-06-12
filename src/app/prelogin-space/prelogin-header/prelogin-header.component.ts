import { Component, inject, OnInit } from '@angular/core';
import { ActiveSpaceInfoService } from '@dep/core';
import { SkinManager } from '@dep/ui';

@Component({
  selector: 'app-prelogin-header',
  templateUrl: './prelogin-header.component.html',
  styleUrls: ['./prelogin-header.component.scss']
})
export class PreloginHeaderComponent implements OnInit {
  protected skinManager: SkinManager = inject(SkinManager);

  constructor(    protected _activeSpaceInfo: ActiveSpaceInfoService  ) { }

  ngOnInit(): void {
  }

}
