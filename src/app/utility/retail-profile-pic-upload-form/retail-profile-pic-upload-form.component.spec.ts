import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailProfilePicUploadFormComponent } from './retail-profile-pic-upload-form.component';

describe('RetailProfilePicUploadFormComponent', () => {
  let component: RetailProfilePicUploadFormComponent;
  let fixture: ComponentFixture<RetailProfilePicUploadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailProfilePicUploadFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailProfilePicUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
