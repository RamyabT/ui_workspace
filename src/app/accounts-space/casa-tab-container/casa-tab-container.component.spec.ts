import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasaTabContainerComponent } from './casa-tab-container.component';

describe('CasaTabContainerComponent', () => {
  let component: CasaTabContainerComponent;
  let fixture: ComponentFixture<CasaTabContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasaTabContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasaTabContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
