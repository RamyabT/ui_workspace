import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PrepaidcardService } from '../prepaidcard-service/prepaidcard.service';
import { Prepaidcard } from '../prepaidcard-service/prepaidcard.model';
import moment from 'moment';
import { Router } from '@angular/router';
import { AppConfigService } from '@dep/services';
import { PpCardService } from '../ppCard-service/ppCard.service';
import { PpCard } from '../ppCard-service/ppCard.model';

@Component({
  selector: 'app-prepaidcard-home',
  templateUrl: './prepaidcard-home.component.html',
  styleUrls: ['./prepaidcard-home.component.scss']
})
export class PrepaidcardHomeComponent implements OnInit {

  chartData: any;
  currentCard: Prepaidcard | undefined;
  prepaidcardDetails!: PpCard | undefined;
  currency: any = "";

  constructor(private prepaidcardService: PrepaidcardService,
    private _router: Router,
    private _appConfig: AppConfigService,
    private retailPCDetailsFormService: PpCardService,
    public cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.prepaidcardService.onChangePrepaidCard$.subscribe((prepaidcard: Prepaidcard) => {
      if(prepaidcard) {
        this.prepaidcardDetails = undefined;
        this.currentCard = prepaidcard;
        this.getPrepaidCardDetails();
      }
    });
  }

  getPrepaidCardDetails() {
    if(this.prepaidcardDetails && !this.currentCard?.cardRefNumber) return;
    let key: any = {
      cardReference: this.currentCard?.cardRefNumber,
    };
    setTimeout(() => {
      window.scrollTo(0,0);
    },100);
    this.retailPCDetailsFormService
      .findByKey(key)()
      .subscribe((res: any) => {
        this.prepaidcardDetails = res;
        this.currency = res?.balanceDetails[0].currency;
        this.cd.detectChanges();
        this.getAccountsInsights({
          'currency': this.currency,
          'currentSpendDate': moment()
        });
      });
  }



  getAccountsInsights(event: any) {
    if(!event.currency) return;
    let accountNumber = this.currentCard?.accountNumber;
    let payload = {
      fromDate: event.currentSpendDate.startOf('month').format('YYYY-MM-DD'),
      toDate: event.currentSpendDate.endOf('month').format('YYYY-MM-DD'),
      accountNumber: accountNumber,
      currencycode: event.currency
    }

    this.prepaidcardService.fetchPrepaidcardInsights(payload).subscribe({
      next: (response) => {
        // this.accountsInsights.set(accountNumber, response);
        this.chartData = undefined;
        this.chartData = (response?.length > 0) ? response : [{
          category: "",
          value: 100,
          currency: this._appConfig.baseCurrency
        }];
        this.cd.detectChanges();
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
      this.currentCard = this._appConfig.getData('prepaidCardData')
    }
    setTimeout(() => {
      this._router.navigate(['cards-space','display-shell','prepaidcard','retail-pc-transaction-summary-form'], {
        queryParams: {
          // accountNumber: this._accountNumber,
          cardReference: this.currentCard!.cardRefNumber
        },
      });
    });
  }
}
