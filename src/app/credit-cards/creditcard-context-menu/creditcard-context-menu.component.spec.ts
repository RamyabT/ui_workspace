import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditcardContextMenuComponent } from './creditcard-context-menu.component';

describe('CreditcardContextMenuComponent', () => {
  let component: CreditcardContextMenuComponent;
  let fixture: ComponentFixture<CreditcardContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditcardContextMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditcardContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
