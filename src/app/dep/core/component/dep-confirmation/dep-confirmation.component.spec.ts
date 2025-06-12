import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepConfirmationComponent } from './dep-confirmation.component';

describe('DepConfirmationComponent', () => {
  let component: DepConfirmationComponent;
  let fixture: ComponentFixture<DepConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
