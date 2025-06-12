import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailEtransferAutodepositViewComponent } from './retail-etransfer-autodeposit-view.component';

describe('RetailEtransferAutodepositViewComponent', () => {
  let component: RetailEtransferAutodepositViewComponent;
  let fixture: ComponentFixture<RetailEtransferAutodepositViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailEtransferAutodepositViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailEtransferAutodepositViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
