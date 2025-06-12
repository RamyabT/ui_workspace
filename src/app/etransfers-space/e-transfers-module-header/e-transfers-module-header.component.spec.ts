import { ComponentFixture, TestBed } from '@angular/core/testing';

import { eTransfersModuleHeaderComponent } from './e-transfers-module-header.component';

describe('eTransfersModuleHeaderComponent', () => {
  let component: eTransfersModuleHeaderComponent;
  let fixture: ComponentFixture<eTransfersModuleHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ eTransfersModuleHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(eTransfersModuleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
