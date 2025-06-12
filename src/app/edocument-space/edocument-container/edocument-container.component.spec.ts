import { ComponentFixture, TestBed } from '@angular/core/testing';

import { eDocumentContainerComponent } from './edocument-container.component';

describe('eDocumentContainerComponent', () => {
  let component: eDocumentContainerComponent;
  let fixture: ComponentFixture<eDocumentContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ eDocumentContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(eDocumentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
