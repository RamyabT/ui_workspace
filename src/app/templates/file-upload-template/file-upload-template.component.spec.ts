import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadTemplateComponent } from './file-upload-template.component';

describe('FileUploadTemplateComponent', () => {
  let component: FileUploadTemplateComponent;
  let fixture: ComponentFixture<FileUploadTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploadTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
