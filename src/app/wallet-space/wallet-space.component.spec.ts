import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletSpaceComponent } from './wallet-space.component';

describe('WalletSpaceComponent', () => {
  let component: WalletSpaceComponent;
  let fixture: ComponentFixture<WalletSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletSpaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
