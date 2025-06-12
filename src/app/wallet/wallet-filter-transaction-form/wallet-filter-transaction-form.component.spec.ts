import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletFilterTransactionFormComponent } from './wallet-filter-transaction-form.component';

describe('WalletFilterTransactionFormComponent', () => {
  let component: WalletFilterTransactionFormComponent;
  let fixture: ComponentFixture<WalletFilterTransactionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletFilterTransactionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletFilterTransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
