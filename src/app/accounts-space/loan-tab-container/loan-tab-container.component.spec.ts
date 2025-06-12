import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanTabContainerComponent } from './loan-tab-container.component';

describe('LoanTabContainerComponent', () => {
  let component: LoanTabContainerComponent;
  let fixture: ComponentFixture<LoanTabContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanTabContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanTabContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
