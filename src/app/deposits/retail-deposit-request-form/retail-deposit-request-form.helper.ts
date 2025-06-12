import { Injectable } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup } from "@angular/forms";
import {
	BaseFpxComponentState,
	BaseFpxFormHelper,
	HttpProviderService,
	IHttpSuccessPayload,
	RoutingInfo,
	BaseFpxChangeHandler,
	BaseFpxControlEventHandler,
	HttpRequest,
	SpinnerService,
	ILookupResponse,
	FpxModal,
	FpxCurrencyFormatterDirective,
	FpxCurrenyFormatterPipe,
	FpxResetHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { DepositrequestService } from '../depositrequest-service/depositrequest.service';
import { Depositrequest } from '../depositrequest-service/depositrequest.model';
import { MomentService } from 'src/app/foundation/validator-service/moment-service';
import { AppConfigService } from '@dep/services';
import { CurrencyPipe } from '@angular/common';
export class RetailDepositRequestFormState extends BaseFpxComponentState {
	showSuggestion: boolean = false;
	availableBalanceVariable: any;
	debitPayloadVarriable: any;
	fromCurrencyVariable: any;
	productPayloadVarriable: any;
	toCurrencyVariable: any;
	depositDate: any = {
		minDate: new Date("01-07-2023"),
		maxDate: new Date("31-07-2023"),
	}
	availableBalanceVal: any
	depositAmount: any = {
		isCurrEditable: false,
		CurrencyList: [{ id: 'INR', text: 'INR' }],
		amountInWords: false,
		initCurrency: '',
		defaultFetch: false,
	}
	interestRateDisplay: any
	maturityAmountDisplay: any
	interestAmountDisplay: any

	termsFlag: any = {
		textPosition: "after",
		ckValues: { checked: "Y", unchecked: "N" }
	}
	chargesAmount: any = {
		isCurrEditable: false,
		CurrencyList: [],
		amountInWords: false,
		initCurrency: '',
		defaultFetch: false,
	}
	maxAmount: any
	minAmount: any
	fxRates: any = {
		creditAmount: "",
		debitAmount: "",
		exchangeRate: ""
	}

}





@Injectable()

export class RetailDepositRequestFormHelper extends BaseFpxFormHelper<RetailDepositRequestFormState> {

	constructor(private retailDepositRequestFormService: DepositrequestService, private currencyFormat: FpxCurrenyFormatterPipe,
		private _moment: MomentService, private _appConfig: AppConfigService, private _httpProvider: HttpProviderService, private _router: Router) {
		super(new RetailDepositRequestFormState());
	}

	override doPreInit(): void {
		this.setServiceCode("RETAILOPENNEWDEPOSIT");
	}

	public handleFormOnLoad() {
		// WRITE CODE HERE TO HANDLE
		this.setAmountCurrencyList('depositAmount', [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }]);
		this.setStaticDropdown('depositCurrency', [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrencyDesc }]);
		this.setVariable(this.state.depositDate.minDate, new Date());
		this.setHidden('availableBalanceGroup', true);
		this.setValue('depositDate', this._moment.getInstance().format('yyyy-MM-DD'));
		this.setReadonly('depositDate', true);
		this.setHidden('creditAccount', true);
		this.setHidden('maturityDetailsGroup', true);
		this.setHidden('fxRates', true);
		this.setHidden('charity', true);
		this.setHidden('charityPercentage', true);
		this.setValue('maturityInstructions', '3');
		this.setValue('termsFlag',null);
		this.setValue('interestpaymentfrequency','5');
		
		
	}
	public handleFormOnPostsubmit(response: any, routingInfo: any) {
		// WRITE CODE HERE TO HANDLE
		if (response.success) {
			let res: any = response.success?.body?.depositrequest;
			routingInfo.setQueryParams({
				response: res
			});
		}
		else if (response.error) {
			let error: any = response.error.error;
			routingInfo.setQueryParams({
				response: error,
				serviceCode: this.serviceCode.value
			});
		}
		return response;
	}
	public handleFormOnPresubmit(payload: any) {
		// WRITE CODE HERE TO HANDLE
		let depositAmount: any = payload.depositAmount.amount;
		let depositCurrency: any = payload.depositAmount.currencyCode;
		payload.depositAmount = depositAmount;
		payload.depositCurrency = depositCurrency;
	}
	public onProductCodeDataReceived: BaseFpxControlEventHandler = (payload: any) => {
		// WRITE CODE HERE TO HANDLE 
		if (payload) {
			this.setVariable('productPayloadVarriable', payload);
			this.reset('depositAmount', "");
			this.setHidden('maturityDetailsGroup', true);
			//this.reset('interestpaymentfrequency', "");
			this.reset('tenorInMonths', "");
			let data: any = [];
			let unitText: any = "";
			if (payload.depositparameters.tenorUnit == 'M') {
				unitText = " Month";
			}
			else {
				unitText = " Year";
			}
			for (let i = payload.depositparameters.minimumUnits; i <= payload.depositparameters.maximumUnits; i++) {
				if (i == 1) data.push({ id: String(i), text: i + unitText });
				else data.push({ id: String(i), text: i + unitText + 's' });
			}
			this.setStaticDropdown('tenorInMonths', data);
			let currencyList: any = [];
			payload.depositsallowedcurrencies.forEach((element: any) => {
				currencyList.push({ id: element.currency.currencyCode, text: element.currency.currencyName })
			});
			this.setStaticDropdown('depositCurrency', currencyList);
			this.setValue('depositCurrency', currencyList[0]?.id);
			if (payload?.depositparameters?.charityEnabled == "1") {
				this.setHidden('charity', false);
				this.setHidden('charityPercentage', false);
				this.setServiceCode("RETAILOPENNEWDEPOSITCHARITY");
			}
			else {
				this.setHidden('charity', true);
				this.setHidden('charityPercentage', true);
				this.setServiceCode("RETAILOPENNEWDEPOSIT");
			}
		}
	}
	public handleDepositCurrencyOnvalueChange: BaseFpxChangeHandler = (
		name: string,
		status: FormControlStatus,
		value: any,
		formGroup: FormGroup
	) => {
		// WRITE CODE HERE TO HANDLE 
		//tool generated code based on Orchestration Instructions

		this.state.toCurrencyVariable = value;
		this.setVariable('toCurrencyVariable', value);
	}


	public onExchangeRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {
		if (this.state.toCurrencyVariable == this.state.fromCurrencyVariable) {
			this.setHidden('fxRates', true)
		}
		else if(this.state.toCurrencyVariable == null || this.state.toCurrencyVariable == undefined || this.state.fromCurrencyVariable == null || this.state.fromCurrencyVariable == undefined){
			this.setHidden('fxRates', true)
		}
		if (this.formGroup.controls['depositAmount'].hasError('insufficient_balance_error')) {
			this.setErrors('depositAmount', 'insufficient_balance_error');
		} else if (this.formGroup.controls['depositAmount'].value.amount < this.state.productPayloadVarriable.depositparameters.minimumAmount) {
			this.setErrors('depositAmount', 'minAmount', { minAmount: this.state.productPayloadVarriable.depositparameters.minimumAmount + " " + this.state.toCurrencyVariable })
			this.setHidden('fxRates', true)
		}
		else if (this.formGroup.controls['depositAmount'].value.amount > this.state.productPayloadVarriable.depositparameters.maximumAmount) {
			this.setErrors('depositAmount', 'maxAmount', { maxAmount: this.state.productPayloadVarriable.depositparameters.maximumAmount + " " + this.state.toCurrencyVariable })
			this.setHidden('fxRates', true)
		}
		else {
			if (this.state.toCurrencyVariable != this.state.fromCurrencyVariable) {
				if (!this.formGroup.controls['depositAmount'].value.amount || !this.state.fromCurrencyVariable) {
					this.setHidden('fxRates', true)
				}
				else {
					this.setHidden('fxRates', false);
				}
			}

		}
		if (payload) {
			this.setHidden('maturityInfo', true);
			this.setValue('exchangeRate', Number(payload.exchangeRate));
			this.setValue('baseRate', Number(payload.exchangeRate));
			// this.setValue('chargesAmount', 25);
			this.state.fxRates.exchangeRate  = '1' + " " + this.state.toCurrencyVariable + " = " +  " " + payload.exchangeRate + " "+this.state.fromCurrencyVariable;
	      	this.state.fxRates.debitAmount = payload.debitAmount +" "+this.state.fromCurrencyVariable ;
    		this.state.fxRates.creditAmount = payload.creditAmount +" "+ this.state.toCurrencyVariable;
      
		}
	}

	public onDebitAccountDataReceived: BaseFpxControlEventHandler = (payload: any) => {
		// WRITE CODE HERE TO HANDLE 
		if (payload) {
			////this.reset('interestpaymentfrequency', "");
			this.reset('depositAmount', "");
			this.reset('creditAccount', "");
			this.setHidden('maturityDetailsGroup', true);
			this.setHidden('fxRates', true);
			this.setHidden('availableBalanceGroup', false);
			let avlBal: any = payload.accountCurrency + " " + this.currencyFormat.transform(payload.availableBalance, payload.accountCurrency);
			this.state.availableBalanceVal = avlBal;
			// this.setCommonFormInput('accountCurrency',payload.accountCurrency);
			// this.setCommonFormInput('availableBalance',avlBal);
			this.setVariable('fromCurrencyVariable', payload.accountCurrency);
			this.setVariable('availableBalanceVariable', payload.availableBalance);

		}
	}
	public handleDepositAmountOnvalueChange: BaseFpxChangeHandler = (
		name: string,
		status: FormControlStatus,
		value: any,
		formGroup: FormGroup
	) => {
		// WRITE CODE HERE TO HANDLE 
		//tool generated code based on Orchestration Instructions
			if(value.amount){
			//this.reset('interestpaymentfrequency', "");
			this.setHidden('fxRates', true);
			}
		
	}


	private _reset: FpxResetHandler = (payload: any) => {
		this.formGroup.reset();
		this.handleFormOnLoad();
	  }


	public handleTenorInMonthsOnvalueChange: BaseFpxChangeHandler = (
		name: string,
		status: FormControlStatus,
		value: any,
		formGroup: FormGroup
	) => {
		// WRITE CODE HERE TO HANDLE 
		//tool generated code based on Orchestration Instructions
		if (value) {
			//this.reset('interestpaymentfrequency', "");
			this.setHidden('maturityDetailsGroup', true);
			this.setValue('interestpaymentfrequency',this.getValue('interestpaymentfrequency'));

		}
	}
	public onInterestpaymentfrequencyDataReceived: BaseFpxControlEventHandler = (payload: any) => {
		// WRITE CODE HERE TO HANDLE 
		if (payload) {
			this.setHidden('maturityDetailsGroup', false);
			this.state.interestRateDisplay = payload.interestRate + '%'
			this.state.maturityAmountDisplay =  this.currencyFormat.transform(payload.maturityAmount, this.state.toCurrencyVariable)+" "+this.state.toCurrencyVariable;
			this.state.interestAmountDisplay = this.currencyFormat.transform(payload.interestAmount, this.state.toCurrencyVariable)+" "+this.state.toCurrencyVariable;
		}
	}
	public handleMaturityInstructionsOnvalueChange: BaseFpxChangeHandler = (
		name: string,
		status: FormControlStatus,
		value: any,
		formGroup: FormGroup
	) => {
		// WRITE CODE HERE TO HANDLE 
		//tool generated code based on Orchestration Instructions
		this.reset('creditAccount', "");
		if (value == 3) {
			this.setHidden('creditAccount', true);
		}
		else {
			this.setHidden('creditAccount', false);
		}
	}
	public handleTermsFlagOnvalueChange: BaseFpxChangeHandler = (
		name: string,
		status: FormControlStatus,
		value: any,
		formGroup: FormGroup
	  ) => {
		if(value =="N"){
		  this.setValue('termsFlag',null)
		}
	  }

	public override doPostInit(): void {
		this.addResetHandler('reset', this._reset);
		this.addControlEventHandler("productCodeDataReceived", this.onProductCodeDataReceived);
		this.addValueChangeHandler("depositCurrency", this.handleDepositCurrencyOnvalueChange);
		this.addControlEventHandler("debitAccountDataReceived", this.onDebitAccountDataReceived);
		this.addValueChangeHandler("depositAmount", this.handleDepositAmountOnvalueChange);
		this.addValueChangeHandler("tenorInMonths", this.handleTenorInMonthsOnvalueChange);
		this.addControlEventHandler("interestpaymentfrequencyDataReceived", this.onInterestpaymentfrequencyDataReceived);
		this.addValueChangeHandler("maturityInstructions", this.handleMaturityInstructionsOnvalueChange);
		this.addControlEventHandler("exchangeRateReceived", this.onExchangeRateDataReceived);
		this.addValueChangeHandler('termsFlag', this.handleTermsFlagOnvalueChange);
		this.handleFormOnLoad();
	}


	public override preSubmitInterceptor(payload: Depositrequest): any {
		// WRITE CODE HERE TO HANDLE 
		this.handleFormOnPresubmit(payload);
		return payload;
	}


	public override postDataFetchInterceptor(payload: Depositrequest) {
		// WRITE CODE HERE TO HANDLE 
		return payload;
	}


	public override postSubmitInterceptor(response: any): RoutingInfo {
		console.log(response);
		let routingInfo: RoutingInfo = new RoutingInfo();
		this.handleFormOnPostsubmit(response, routingInfo);
		return routingInfo;
	}
	//$START_CUSTOMSCRIPT\n
	//$END_CUSTOMSCRIPT\n
}


