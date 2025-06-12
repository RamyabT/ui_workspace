import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUploadControlComponent } from './profile-upload-control.component';

describe('ProfileUploadControlComponent', () => {
  let component: ProfileUploadControlComponent;
  let fixture: ComponentFixture<ProfileUploadControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileUploadControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileUploadControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
