import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RetailDcTransferHistoryTemplateComponent } from './retail-dc-transfer-history-template.component';

describe('RetailDcTransferHistoryTemplateComponent', () => {
  let component: RetailDcTransferHistoryTemplateComponent;
  let fixture: ComponentFixture<RetailDcTransferHistoryTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailDcTransferHistoryTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailDcTransferHistoryTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
