import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import { etransfercontactlogtemplateHelper } from './retail-etransfercontactlog-template.helper';
import { EtransfercontactlogService } from '../etransfercontactlog-service/etransfercontactlog.service';
import { Etransfercontactlog } from '../etransfercontactlog-service/etransfercontactlog.model';

@Component({
  selector: 'app-retail-etransfercontactlog-template',
  templateUrl: './retail-etransfercontactlog-template.component.html',
  styleUrls: ['./retail-etransfercontactlog-template.component.scss'],
  providers: [etransfercontactlogtemplateHelper]
})
export class etransfercontactlogtemplateComponent extends BaseFpxROGridComponent<Etransfercontactlog, etransfercontactlogtemplateHelper> {
    @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;
  
  private observer: any;
  constructor(
    protected etransfercontactlogtemplateHelper: etransfercontactlogtemplateHelper,
    protected etransfercontactlogService: EtransfercontactlogService
  ) {
    super(etransfercontactlogtemplateHelper);
  }

  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT',]);
    this.setGridIdentifiers(['SELECT',]);
    this.setGridColumnTypes(['Checkbox',]);
    this.addGridDataService(this.etransfercontactlogService);
    this.setGridTitle('etransfercontactlogtemplate.title');
  }
  protected override doPostInit(): void {
    this.observer = new IntersectionObserver(entries => {
      var entry = entries[0];
      if (entry.isIntersecting && !this.fpxRoGrid?.loading) {
        this._helper.loadMore();
      }
    }, {
      rootMargin: '0px',
      threshold: 0.9
    });

    this.observer.observe(this.loadMore.nativeElement);
  }
}
