import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-pending-chores',
  templateUrl: './member-pending-chores.component.html',
  styleUrls: ['./member-pending-chores.component.scss']
})
export class MemberPendingChoresComponent implements OnInit {


  pendingchorelist : any = {
    choresname : "Gardening",
    nickname : "Adam sandler" ,
    amount   : "730.50",
    memberimg      : "./assets/fb/member.png",
    currency : "CAD",
    duedate  : "2025-03-03" 
  }
  constructor() { }

  ngOnInit(): void {
  }

}
