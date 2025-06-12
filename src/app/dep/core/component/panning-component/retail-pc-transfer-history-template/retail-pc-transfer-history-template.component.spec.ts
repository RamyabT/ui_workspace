import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RetailPcTransferHistoryTemplateComponent } from './retail-pc-transfer-history-template.component';

describe('RetailPcTransferHistoryTemplateComponent', () => {
  let component: RetailPcTransferHistoryTemplateComponent;
  let fixture: ComponentFixture<RetailPcTransferHistoryTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailPcTransferHistoryTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailPcTransferHistoryTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
