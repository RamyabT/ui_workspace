import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitCardTabContainerComponent } from './debitcard-tab-container.component';

describe('DebitCardTabContainerComponent', () => {
  let component: DebitCardTabContainerComponent;
  let fixture: ComponentFixture<DebitCardTabContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitCardTabContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebitCardTabContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
