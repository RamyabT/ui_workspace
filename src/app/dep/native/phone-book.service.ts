import { Injectable } from "@angular/core";
import { Diagnostic } from "@awesome-cordova-plugins/diagnostic/ngx";
import { Contact, ContactFindOptions, Contacts } from "@ionic-native/contacts/ngx";

declare let navigator: any;

@Injectable({ providedIn: "root" })
export class PhoneBookService {
  phoneBookContact: any = [];
  inviteOthersLink = "";
  referalCode = "";
  rewardsRoutes = "";
  bonusRoutes = "";
  constructor(private contacts: Contacts, private diagnostic: Diagnostic) { }

  fetchContacts(options: any): Promise<any> {
    return this.contacts.find(options.fields);
  }

  pickContact():Promise<Contact>{
    return this.contacts.pickContact();
  }

  async requestContactAccess() {
    await this.diagnostic.requestContactsAuthorization().then((status: any) => {
      if (status === this.diagnostic.permissionStatus.GRANTED) {
        console.log("Contacts use is authorized");
        return true;
      } else {
        console.error("Access denied");
        return false;
      }
    });
  }
}
