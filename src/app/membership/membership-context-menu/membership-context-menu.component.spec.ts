import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasaContextMenuComponent } from './casa-context-menu.component';

describe('CasaContextMenuComponent', () => {
  let component: CasaContextMenuComponent;
  let fixture: ComponentFixture<CasaContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasaContextMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasaContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
