import { ComponentFixture, TestBed } from '@angular/core/testing';

import { eDocumentModuleHeaderComponent } from './edocument-module-header.component';

describe('eDocumentModuleHeaderComponent', () => {
  let component: eDocumentModuleHeaderComponent;
  let fixture: ComponentFixture<eDocumentModuleHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ eDocumentModuleHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(eDocumentModuleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
