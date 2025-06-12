import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepOktaSignInComponent } from './dep-okta-sign-in.component';

describe('DepOktaSignInComponent', () => {
  let component: DepOktaSignInComponent;
  let fixture: ComponentFixture<DepOktaSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepOktaSignInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepOktaSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
