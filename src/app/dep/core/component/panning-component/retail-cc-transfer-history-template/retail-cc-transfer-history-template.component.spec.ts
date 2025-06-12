import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RetailCcTransferHistoryTemplateComponent } from './retail-cc-transfer-history-template.component';

describe('RetailCcTransferHistoryTemplateComponent', () => {
  let component: RetailCcTransferHistoryTemplateComponent;
  let fixture: ComponentFixture<RetailCcTransferHistoryTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailCcTransferHistoryTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailCcTransferHistoryTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
