import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-document-checklist-ro-tmplt',
  templateUrl: './document-checklist-ro-tmplt.component.html',
  styleUrls: ['./document-checklist-ro-tmplt.component.scss']
})
export class DocumentChecklistRoTmplt {
  @Input() selectedData: any;
  @Input() index: number = 0;

  constructor(
  ) { }
}
