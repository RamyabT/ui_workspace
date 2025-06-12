import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepOktaCallbackComponent } from './dep-okta-callback.component';

describe('DepOktaCallbackComponent', () => {
  let component: DepOktaCallbackComponent;
  let fixture: ComponentFixture<DepOktaCallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepOktaCallbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepOktaCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
