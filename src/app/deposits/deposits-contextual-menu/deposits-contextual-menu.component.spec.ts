import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositsContextualMenuComponent } from './deposits-contextual-menu.component';

describe('DepositsContextualMenuComponent', () => {
  let component: DepositsContextualMenuComponent;
  let fixture: ComponentFixture<DepositsContextualMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositsContextualMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositsContextualMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
