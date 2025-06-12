import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';

@Component({
  selector: 'app-casa-accounts-etransfer-list',
  templateUrl: './casa-accounts-etransfer-list.component.html',
  styleUrls: ['./casa-accounts-etransfer-list.component.scss']
})
export class CasaAccountsEtransferListComponent implements OnInit, AfterViewInit {
  portfolioData: any = [
    {
      category: "Deposit to",
      type: "banking",
      data: [],
      showHeader: true
    }
  ];
  data!: Casaaccount;
  isSaveEnabled: boolean = false;
  

  constructor(
    private dialogRef: MatDialogRef<CasaAccountsEtransferListComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
  ) {}

  ngOnInit(): void {
    this.portfolioData[0].data = this.dialogData.accountsList; // Populate with passed data
  }

  ngAfterViewInit(): void {
    // Any additional setup after view initialization
  }

  close(): void {
    this.dialogRef.close();
  }

  onAccept() {
    let payload = {
      action: 1,
      data:this.data
    }
    this.dialogRef.close(payload);
  }

  onDecline(){
    this.dialogRef.close(0);
  }

  

  selectAccount(selectedAccount: Casaaccount): void {
    // let payload = {
    //   action: 1,
    //   data: selectedAccount
    // }
    this.data=selectedAccount;
    this.isSaveEnabled = true;
    // this.dialogRef.close({ action: 'select', data: selectedAccount });
    // this.dialogRef.close(payload);
  }
}
