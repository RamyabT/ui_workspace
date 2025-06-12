import { getCurrencySymbol } from "@angular/common";
import { AppConstantHelper } from "./app-constant.helper"
import { BehaviorSubject } from "rxjs";

const constantHelper: AppConstantHelper = new AppConstantHelper();

export class APPCONSTANTS {
    public static baseCountryCode: string = "CA";
    public static baseCountryCodeDesc: string = "Canada";
    public static baseCurrency: string = "CAD";
    public static baseCurrencyDesc: string = "Canadian Dollar";
    public static enableSSLPinning: boolean = false;
    public static settingsHybridMenus: any = [
        { serviceCode: "RETAILENABLEBIOMETRIC" },
        { serviceCode: "RETAILCHANGEMPIN" }
    ];
    public static storeURLs: any = {
        "android": "https://play.google.com/store/apps",
        "ios": "https://apps.apple.com/us/app"
    };
    public static enableApplePay: boolean = false;
    public static requiredAccountsSpaceNavigation: boolean = true;
    public static requiredInsuranceSpaceNavigation: boolean = false;

    public static displayCurrencyAsSymbol: boolean = false;

    public static mainHeader: any = {
        showUserInfo: true,
        showUserAvator: true,
        showPanNumber: false,
        showSearchBar: false,
        showNotificationIcon: false,
        showEmailIcon: false
    }
    public static promptLogoutConfirmation: boolean = false;
    public static requestLogoutFeedback: boolean = true;

    public static casaAdsRequired: boolean = true;
    public static enableViewCasaTransactionsInfo: boolean = true;

    public static landingPath: string = "home";
    public static redirectOnAuthFailure: string[] = ["home"];
    public static screenBusySpinnerImage: string = "spinner.svg";

    public static headerNavBackRequired$: BehaviorSubject<any> = new BehaviorSubject(false);
    public static checkHeaderRequired: (space: string) => boolean | undefined;

    public static contextMenuColCount: number = 5;

    public static userProfile: any = {
        showLastFailedLogin: true,
    }

    public static currencyCodeMap: any = {}

    public static getExchangeCurrency: (currancy: string) => string;

    public static checkAppVersionUpdates: boolean = true; //only for hybrid

    public static shareAccountInfoData = (account: any) => {
        let str = "Account holder: " + account.accountName + "\n" +
            "Account number: " + account.accountNumber + "\n" +
            "Account Type: " + account.accountTypeDesc + "\n" +
            "Bank name: " + (account?.bankName || " ") + "\n";
        return str;
    }

    public static shareLoanInfoData = (loan: any) => {
        let str = "Account holder: " + loan.loanAccountName + "\n" +
            "Loan Account number: " + loan.loanAccountNumber + "\n" +
            "Financial Institution name: " + loan.bankName + "\n" +
            "Transit Number: " + loan.transitNumber + "\n" +
            "Institution Number: " + (loan?.institutionNumber || " ") + "\n";
        return str;
    }

    public static contextMenuRestrictionRequired: boolean = true;
    public static enabledSearchServices: any = [];
    public static mobEnabledSearchServices: any = [];
    public static showOrganizationName: boolean;
    public static enableHeaderCloseBtn:boolean = true;

    public static appBlockCutCopyPaste: boolean = false;

    constructor() { }
}

constantHelper.overrideConstants();