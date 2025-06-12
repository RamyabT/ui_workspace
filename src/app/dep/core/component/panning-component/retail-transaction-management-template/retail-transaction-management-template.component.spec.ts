import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

//import { RetailTransferHistoryTemplateComponent } from './retail-transfer-history-template.component';
import { RetailTransactionManagementTemplateComponent } from './retail-transaction-management-template.component';

describe('RetailTransactionManagementTemplateComponent', () => {
  let component: RetailTransactionManagementTemplateComponent;
  let fixture: ComponentFixture<RetailTransactionManagementTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailTransactionManagementTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailTransactionManagementTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
