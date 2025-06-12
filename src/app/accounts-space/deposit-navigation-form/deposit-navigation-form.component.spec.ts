import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositNavigationFormComponent } from './deposit-navigation-form.component';

describe('DepositNavigationFormComponent', () => {
  let component: DepositNavigationFormComponent;
  let fixture: ComponentFixture<DepositNavigationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositNavigationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositNavigationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
