import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletFilterReceivedFormComponent } from './wallet-filter-received-form.component';

describe('WalletFilterReceivedFormComponent', () => {
  let component: WalletFilterReceivedFormComponent;
  let fixture: ComponentFixture<WalletFilterReceivedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletFilterReceivedFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletFilterReceivedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
