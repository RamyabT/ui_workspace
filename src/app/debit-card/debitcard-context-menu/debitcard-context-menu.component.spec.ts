import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitcardContextMenuComponent } from './debitcard-context-menu.component';

describe('DebitcardContextMenuComponent', () => {
  let component: DebitcardContextMenuComponent;
  let fixture: ComponentFixture<DebitcardContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitcardContextMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebitcardContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
