import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailProfilePicPreviewFormComponent } from './retail-profile-pic-preview-form.component';

describe('RetailProfilePicPreviewFormComponent', () => {
  let component: RetailProfilePicPreviewFormComponent;
  let fixture: ComponentFixture<RetailProfilePicPreviewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailProfilePicPreviewFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailProfilePicPreviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
