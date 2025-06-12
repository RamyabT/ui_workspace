import { Component, Inject, OnInit } from '@angular/core';
import moment from 'moment';
import { Creditcard } from '../creditcard-service/creditcard.model';
import { CreditcardService } from '../creditcard-service/creditcard.service';
import { AppConfigService } from '@dep/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creditcard-home',
  templateUrl: './creditcard-home.component.html',
  styleUrls: ['./creditcard-home.component.scss']
})
export class CreditcardHomeComponent implements OnInit {

  private _appConfig: AppConfigService = Inject(AppConfigService);

  chartData: any = [{
    category: "",
    value: 100,
    currency: this._appConfig.baseCurrency
  }];
  currentCard: Creditcard | undefined;

  constructor(private creditcardService: CreditcardService,
    private _router: Router,
    ) { }

  ngOnInit(): void {
    this.creditcardService.onChangeCreditCard$.subscribe((debitcard: Creditcard) => {
      this.currentCard = debitcard;
      setTimeout(() => {
        this.getAccountsInsights(moment());
      }, 1000);
    });
  }


  getAccountsInsights(moment?: any) {
    let accountNumber = this.currentCard!.primaryCardAccNumber;
    let payload = {
      fromDate: moment.startOf('month').format('YYYY-MM-DD'),
      toDate: moment.endOf('month').format('YYYY-MM-DD'),
      accountNumber: accountNumber
    }

    this.creditcardService.fetchCreditCardInsights(payload).subscribe({
      next: (response) => {
        // this.accountsInsights.set(accountNumber, response);
        this.chartData = undefined;
        this.chartData = (response?.length > 0) ? response : [{
          category: "",
          value: 100,
          currency: this._appConfig.baseCurrency
        }];
      },
      error:(err) => {
        this.chartData = [{
          category: "",
          value: 100,
          currency: this._appConfig.baseCurrency
        }];
      },
    });
  }

  onClickViewTransaction() {
    if(!this.currentCard) {
      this.currentCard = this._appConfig.getData('creditCardData')
    }
    setTimeout(() => {
      this._router.navigate(['cards-space','display-shell','credit-cards','retail-cc-transcation-summary-form'], {
        queryParams: {
          // accountNumber: this._accountNumber,
          cardReference: this.currentCard!.cardRefNumber
        },
      });
    });
  }
}
