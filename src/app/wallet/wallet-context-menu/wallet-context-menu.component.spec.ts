import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletContextMenuComponent } from './wallet-context-menu.component';

describe('WalletContextMenuComponent', () => {
  let component: WalletContextMenuComponent;
  let fixture: ComponentFixture<WalletContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletContextMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
