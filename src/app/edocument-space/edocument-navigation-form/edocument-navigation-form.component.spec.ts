import { ComponentFixture, TestBed } from '@angular/core/testing';

import { eDocumentNavigationFormComponent } from './edocument-navigation-form.component';

describe('eDocumentNavigationFormComponent', () => {
  let component: eDocumentNavigationFormComponent;
  let fixture: ComponentFixture<eDocumentNavigationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ eDocumentNavigationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(eDocumentNavigationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
