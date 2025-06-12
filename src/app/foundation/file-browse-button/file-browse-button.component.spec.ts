import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileBrowseButtonComponent } from './file-browse-button.component';

describe('FileBrowseButtonComponent', () => {
  let component: FileBrowseButtonComponent;
  let fixture: ComponentFixture<FileBrowseButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileBrowseButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileBrowseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
