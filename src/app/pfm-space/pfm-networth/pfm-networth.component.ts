import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/foundation/validator-service/common-service';

@Component({
  selector: 'app-pfm-networth',
  templateUrl: './pfm-networth.component.html',
  styleUrls: ['./pfm-networth.component.scss']
})
export class PfmNetworthComponent implements OnInit {

  protected networthData:any;
  protected seekingResponse: boolean = true;

  constructor(
    private _commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getNetworth();
  }

  getNetworth(){
    this.seekingResponse = true;
    this._commonService.fetchNetworth().subscribe({
      next: (res:any) => {
        this.networthData = res;
        this.seekingResponse = false;
      },
      error: (error) => {
        console.log("fetch networth issue");
        this.seekingResponse = false;
      }
    })
  }

}
