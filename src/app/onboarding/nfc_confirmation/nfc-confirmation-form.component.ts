import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoIdMatchService } from '../photoidmatch-service/photoidmatch.service';


interface ConfirmationData {
  name: string;
  email: string;
}

@Component({
  selector: 'app-nfc-confirmation-form',
  templateUrl: './nfc-confirmation-form.component.html',
  styleUrls: ['./nfc-confirmation-form.component.scss']
})


export class NfcConfirmationFormComponent implements OnInit {

  confirmationData!: ConfirmationData;
  dtls: any;
  confirm:boolean=true;
  
  constructor(private route: ActivatedRoute ,private photoIdMatchService:PhotoIdMatchService) { }

  ngOnInit(): void {
    this.dtls= this.photoIdMatchService.resultDetails
    // if(this.dtls === null){
    //   this.confirm=false;
    // }else{
    //   this.confirm=true;
    // }
  }

}
