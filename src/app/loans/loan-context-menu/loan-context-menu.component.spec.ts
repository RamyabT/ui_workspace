import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanContextMenuComponent } from './loan-context-menu.component';

describe('LoanContextMenuComponent', () => {
  let component: LoanContextMenuComponent;
  let fixture: ComponentFixture<LoanContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanContextMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
