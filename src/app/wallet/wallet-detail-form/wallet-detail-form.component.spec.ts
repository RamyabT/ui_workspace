import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletDetailFormComponent } from './wallet-detail-form.component';

describe('WalletDetailFormComponent', () => {
  let component: WalletDetailFormComponent;
  let fixture: ComponentFixture<WalletDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletDetailFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
