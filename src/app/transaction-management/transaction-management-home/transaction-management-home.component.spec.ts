import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionManagementHomeComponent } from './transaction-management-home.component';

describe('TransactionManagementHomeComponent', () => {
  let component: TransactionManagementHomeComponent;
  let fixture: ComponentFixture<TransactionManagementHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionManagementHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionManagementHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
