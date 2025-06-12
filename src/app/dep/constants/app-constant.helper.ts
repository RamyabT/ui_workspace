import { Injectable } from "@angular/core";
import { APPCONSTANTS } from "./app-constant";

@Injectable()
export class AppConstantHelper {
    public overrideConstants(){
        APPCONSTANTS.baseCountryCode = "CAD";
        APPCONSTANTS.baseCountryCodeDesc = "CANADA";
        APPCONSTANTS.baseCurrency = "CAD";
        APPCONSTANTS.baseCurrencyDesc = "CANADIAN";
        APPCONSTANTS.enableSSLPinning = false;
        APPCONSTANTS.displayCurrencyAsSymbol = true;
        APPCONSTANTS.mainHeader.showUserInfo = false;
        APPCONSTANTS.mainHeader.showSearchBar = true;
        APPCONSTANTS.mainHeader.showPanNumber = true;
        APPCONSTANTS.mainHeader.showNotificationIcon = false;
        APPCONSTANTS.mainHeader.showEmailIcon = true;
        APPCONSTANTS.mainHeader.showUserAvator = true;
        APPCONSTANTS.promptLogoutConfirmation = true;
        APPCONSTANTS.requestLogoutFeedback = false;
        APPCONSTANTS.requiredAccountsSpaceNavigation = false;
        APPCONSTANTS.requiredInsuranceSpaceNavigation = false;
        APPCONSTANTS.enableViewCasaTransactionsInfo = false;
        APPCONSTANTS.landingPath = "home";
        APPCONSTANTS.redirectOnAuthFailure = ["home"];
        APPCONSTANTS.screenBusySpinnerImage = "tenant-config/10001/skins/images/spinner.gif";
        APPCONSTANTS.userProfile.showLastFailedLogin = false;
        APPCONSTANTS.contextMenuColCount = 7;
        APPCONSTANTS.currencyCodeMap = {
            "USD": "$",
            "CAD": "$",
            "SUFFIXCURRENCY": "USD"
        }

        APPCONSTANTS.checkHeaderRequired = (space: string) => {
            let required = undefined;
            if (
                space == "accounts-space" || space == "edocument-space" || 
                space == "payments-space" || space == "service-request-space" || 
                space == "transfers-space"
                ) {
                required = false;
            }

            return required;
        }

        APPCONSTANTS.getExchangeCurrency = (currency: string) => {
            let _currency:string = APPCONSTANTS.baseCurrency;
            if(currency != "USD"){
                _currency = "USD";
            }

            return _currency;
        }

        APPCONSTANTS.checkAppVersionUpdates = false;

        APPCONSTANTS.shareAccountInfoData = (account: any) => {
            console.log(account)

            let str = "Account holder: " + account.accountHolderName + "\n" +
                "Account number: " + account.accountNumber + "\n" +
                "Account type: " + account.accountTypeDesc + "\n" +
                "Financial institution name: " + (account?.bankName || " ") + "\n" +
                "Transit number: " + (account?.transitNumber || " ") + "\n" +
                "Institution number: " + (account?.institutionNumber || " ") + "\n" +
                "SWIFT/ BIC code: " + account?.BICCode;

                
            return str;
        }

        APPCONSTANTS.shareLoanInfoData = (account: any) => {
            let str = "Account holder: " + account.loanAccountName + "\n" +
            "Loan Account number: " + account.loanAccountNumber + "\n" +
            "Account Type: "+ account.accountTypeDesc + "\n"+
            "Financial Institution name: " + account.bankName + "\n" +
            "Transit Number: " + account.transitNumber + "\n" +
            "Institution Number: " + (account?.institutionNumber || " ") + "\n";
            return str;
        }

        APPCONSTANTS.contextMenuRestrictionRequired = true;
        APPCONSTANTS.enabledSearchServices = [
            {
                "serviceDescription": "Transfer between my accounts",
                "serviceCode": "RETAILTRANOAT"
            },
            {
                "serviceDescription": "Transfer to another member",
                "serviceCode": "RETAILTRANINTBT"
            },
            {
                "serviceDescription": "Scheduled Transfers",
                "serviceCode": "TRANSFERS"
            },
            {
                "serviceDescription": "Manage Sender Profile",
                "serviceCode": "RETAILETRANSFERREGISTRATIONEDIT"
            },
            {
                "serviceDescription": "View Interac Contacts",
                "serviceCode": "RETAILMANAGEETRANSFERCONTACT"
            },
            {
                "serviceDescription": "Add Interac Contacts",
                "serviceCode": "RETAILETRANSFERMANAGECONTACT"
            },
            {
                "serviceDescription": "Interac - Send Money",
                "serviceCode": "RETAILMANAGEETRANSFERSENDMONEY"
            },
            {
                "serviceDescription": "Interac - Request Money",
                "serviceCode": "RETAILMANAGEETRANSFERREQUESTMONEY"
            },
            {
                "serviceDescription": "Autodeposit",
                "serviceCode": "GETETRFAUTODEPOSIT"
            },
            {
                "serviceDescription": "E-transfer History",
                "serviceCode": "ETRANSFERS"
            },
            {
                "serviceDescription": "View Payee",
                "serviceCode": "BILLS"
            }

        ]
        APPCONSTANTS.mobEnabledSearchServices = [
            {
                "serviceDescription": "Transfer between my accounts",
                "serviceCode": "RETAILTRANOAT"
            },
            {
                "serviceDescription": "Transfer to another member",
                "serviceCode": "RETAILTRANINTBT"
            },
            {
                "serviceDescription": "Scheduled Transfers",
                "serviceCode": "MOBTRANSFERS"
            },
            {
                "serviceDescription": "Manage Sender Profile",
                "serviceCode": "RETAILETRANSFERREGISTRATIONEDIT"
            },
            {
                "serviceDescription": "View Interac Contacts",
                "serviceCode": "RETAILMANAGEETRANSFERCONTACT"
            },
            {
                "serviceDescription": "Add Interac Contacts",
                "serviceCode": "RETAILETRANSFERMANAGECONTACT"
            },
            {
                "serviceDescription": "Interac - Send Money",
                "serviceCode": "RETAILMANAGEETRANSFERSENDMONEY"
            },
            {
                "serviceDescription": "Interac - Request Money",
                "serviceCode": "RETAILMANAGEETRANSFERREQUESTMONEY"
            },
            {
                "serviceDescription": "Autodeposit",
                "serviceCode": "GETETRFAUTODEPOSIT"
            },
            {
                "serviceDescription": "E-transfer History",
                "serviceCode": "MOBETRANSFERS"
            },
            {
                "serviceDescription": "View Payee",
                "serviceCode": "MOBBILLS"
            }
        ]
        APPCONSTANTS.showOrganizationName = false;
    }
}
