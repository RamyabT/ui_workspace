import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';

@Component({
  selector: 'app-fb-children-home',
  templateUrl: './fb-children-home.component.html',
  styleUrls: ['./fb-children-home.component.scss']
})
export class FbChildrenHomeComponent implements OnInit {
  childrenData: any;
   
  valueToSend: boolean = false;
  
  
  constructor(protected _device: DeviceDetectorService, private appConfig  : AppConfigService) { }

  ngOnInit(): void {
  this.childrenData =   JSON.parse(this.appConfig.getData('childrenData'));
  this.valueToSend = true;
  }
 

}
