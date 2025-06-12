import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletAccDtlListTmpltComponent } from './wallet-acc-dtl-list-tmplt.component';

describe('WalletAccDtlListTmpltComponent', () => {
  let component: WalletAccDtlListTmpltComponent;
  let fixture: ComponentFixture<WalletAccDtlListTmpltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletAccDtlListTmpltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletAccDtlListTmpltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
