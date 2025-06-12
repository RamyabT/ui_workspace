import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loan-home',
  templateUrl: './loan-home.component.html',
  styleUrls: ['./loan-home.component.scss']
})
export class LoanHomeComponent implements OnInit {

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
