import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RetailManageBeneficiaryTemplateComponent } from './retail-manage-beneficiary-template.component';

describe('RetailManageBeneficiaryTemplateComponent', () => {
  let component: RetailManageBeneficiaryTemplateComponent;
  let fixture: ComponentFixture<RetailManageBeneficiaryTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailManageBeneficiaryTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailManageBeneficiaryTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
