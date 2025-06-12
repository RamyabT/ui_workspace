import { Component, OnInit, inject } from '@angular/core';
import { AppConfigService } from '@dep/services';

@Component({
  selector: 'app-membership-home',
  templateUrl: './membership-home.component.html',
  styleUrls: ['./membership-home.component.scss']
})
export class MembershipHomeComponent implements OnInit {
  protected _appConfig: AppConfigService = inject(AppConfigService);


  protected chartData: any = [
    {
      "moneyIn": "411",
      "moneyOut": "123",
      "month": "AUG",
      "year": "2023"
    },
    {
      "moneyIn": "150",
      "moneyOut": "264",
      "month": "SEP",
      "year": "2023"
    },
    {
      "moneyIn": "550",
      "moneyOut": "50",
      "month": "OCT",
      "year": "2023"
    },
    {
      "moneyIn": "50",
      "moneyOut": "300",
      "month": "NOV",
      "year": "2023"
    },
    {
      "moneyIn": "400",
      "moneyOut": "200",
      "month": "DEC",
      "year": "2023"
    },
    {
      "moneyIn": "70",
      "moneyOut": "7",
      "month": "JAN",
      "year": "2024"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
