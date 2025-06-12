import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RetailTransferHistoryTemplateComponent } from './retail-transfer-history-template.component';

describe('RetailTransferHistoryTemplateComponent', () => {
  let component: RetailTransferHistoryTemplateComponent;
  let fixture: ComponentFixture<RetailTransferHistoryTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailTransferHistoryTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailTransferHistoryTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
