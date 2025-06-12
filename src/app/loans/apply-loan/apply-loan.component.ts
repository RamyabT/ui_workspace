import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';


@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrls: ['./apply-loan.component.scss']
})
export class ApplyLoanComponent implements OnInit {
  applyLoan: string = 'applyLoan';

  constructor(
    protected _device: DeviceDetectorService,
    private _router:Router, 
  ) { }

  ngOnInit(): void {

  }

  goBack() {
    this._router.navigate(['home']);
  }

  applyNewLoan() {
    window.open('https://www.vancity.com/OnlineBanking/Rubix/App/', '_blank')
  }

}
