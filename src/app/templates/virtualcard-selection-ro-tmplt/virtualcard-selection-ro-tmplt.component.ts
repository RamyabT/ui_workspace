import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppConfigService } from '@dep/services';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-virtualcard-selection-ro-tmplt',
  templateUrl: './virtualcard-selection-ro-tmplt.component.html',
  styleUrls: ['./virtualcard-selection-ro-tmplt.component.scss']
})
export class VirtualCardSelectionRoTmplt {
  cardImagePath: string = 'assets/images/cards/';
  @Input()  selectedData:any;
  @Input() index: number = 0;
  constructor() { }
  
}
