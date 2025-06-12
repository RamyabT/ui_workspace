import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailMyProfileFormComponent } from './retail-my-profile-form.component';

describe('RetailMyProfileFormComponent', () => {
  let component: RetailMyProfileFormComponent;
  let fixture: ComponentFixture<RetailMyProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailMyProfileFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailMyProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
