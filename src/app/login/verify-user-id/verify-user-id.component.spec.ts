import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyUserIdComponent } from './verify-user-id.component';

describe('VerifyUserIdComponent', () => {
  let component: VerifyUserIdComponent;
  let fixture: ComponentFixture<VerifyUserIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyUserIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyUserIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
