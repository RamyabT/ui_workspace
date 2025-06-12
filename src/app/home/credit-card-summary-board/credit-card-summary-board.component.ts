import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '@dep/services';
import { CreditcardService } from 'src/app/credit-cards/creditcard-service/creditcard.service';
import { CommonService } from 'src/app/foundation/validator-service/common-service';

@Component({
  selector: 'app-credit-card-summary-board',
  templateUrl: './credit-card-summary-board.component.html',
  styleUrls: ['./credit-card-summary-board.component.scss']
})
export class CreditCardSummaryBoardComponent implements OnInit {
  cardSummary: any;
  totalCreditLimit: any;
  remainingCredit: any;
  usedCredit: any;
  cardsCount: any;
  usedPercentage: any;

  constructor(
    private creditCardService: CreditcardService,
    public appConfig:AppConfigService
  ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.creditCardService.fetchCreditcardSummary().subscribe({
      next: (response) => {
        this.cardSummary = (response?.length > 0) ? response : [];
        if(this.cardSummary.length>0){
          this.cardsCount = response.length;
          this.cardSummary.forEach((element:any) => {
            this.totalCreditLimit =element.creditLimit;
            this.usedCredit = element.outstandingAmount;
            this.remainingCredit = this.totalCreditLimit-this.usedCredit;
            this.usedPercentage = Math.ceil( (this.usedCredit/this.totalCreditLimit)*100);
          });
        }
      }
    });
  }

}
