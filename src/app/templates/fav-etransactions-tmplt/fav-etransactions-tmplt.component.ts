import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fav-etransactions-tmplt',
  templateUrl: './fav-etransactions-tmplt.component.html',
  styleUrls: ['./fav-etransactions-tmplt.component.scss']
})
export class FavEtransactionsTmpltComponent implements OnInit {

  @Input("index") index:number = 0;
  @Input("selectedData") selectedData:any = {};
  
  constructor() { }

  ngOnInit(): void {
  }

}
