import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansContextualMenuComponent } from './loans-contextual-menu.component';

describe('LoansContextualMenuComponent', () => {
  let component: LoansContextualMenuComponent;
  let fixture: ComponentFixture<LoansContextualMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoansContextualMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoansContextualMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
