import { ComponentFixture, TestBed } from '@angular/core/testing';

import { eDocumentContextMenuComponent } from './edocument-context-menu.component';

describe('eDocumentContextMenuComponent', () => {
  let component: eDocumentContextMenuComponent;
  let fixture: ComponentFixture<eDocumentContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ eDocumentContextMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(eDocumentContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
