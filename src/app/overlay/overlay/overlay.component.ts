import { Component, HostListener, OnInit } from '@angular/core';
import { BreakpointService, DeviceDetectorService } from '@dep/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {
  showOverlay = false;
  constructor(
  ) { }

  ngOnInit(): void {
    
  }

}
