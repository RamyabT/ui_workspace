import { Component, OnInit, inject } from '@angular/core';
import { DebitcardService } from '../debitcard-service/debitcard.service';
import { Debitcard } from '../debitcard-service/debitcard.model';
import moment from 'moment';
import { Router } from '@angular/router';
import { AppConfigService } from '@dep/services';

@Component({
  selector: 'app-debitcard-home',
  templateUrl: './debitcard-home.component.html',
  styleUrls: ['./debitcard-home.component.scss']
})
export class DebitcardHomeComponent implements OnInit {
  private _appConfig: AppConfigService = inject(AppConfigService);

  chartData: any = [{
    category: "",
    value: 100,
    currency: this._appConfig.baseCurrency
  }];
  currentCard: Debitcard | undefined;

  constructor(private debitcardService: DebitcardService,
    private _router: Router) { }

  ngOnInit(): void {
    this.debitcardService.onChangeDebitCard$.subscribe((debitcard: Debitcard) => {
      this.currentCard = debitcard;
      setTimeout(() => {
        this.getAccountsInsights(moment());
      }, 1000);
    });
  }


  getAccountsInsights(moment?: any) {
    let accountNumber = this.currentCard?.accountNumber;
    let payload = {
      fromDate: moment.startOf('month').format('YYYY-MM-DD'),
      toDate: moment.endOf('month').format('YYYY-MM-DD'),
      accountNumber: accountNumber
    }

    this.debitcardService.fetchDebitCardInsights(payload).subscribe({
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
      this.currentCard = this._appConfig.getData('debitCardData')
    }
    setTimeout(() => {
      this._router.navigate(['cards-space','display-shell','debit-card','retail-dc-transaction-summary'], {
        queryParams: {
          // accountNumber: this._accountNumber,
          cardReference: this.currentCard!.cardRefNumber
        },
      });
    });
  }
}
