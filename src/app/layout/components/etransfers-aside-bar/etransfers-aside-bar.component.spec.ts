import { ComponentFixture, TestBed } from '@angular/core/testing';

import { eTransfersAsideBarComponent } from './etransfers-aside-bar.component';

describe('eTransfersAsideBarComponent', () => {
  let component: eTransfersAsideBarComponent;
  let fixture: ComponentFixture<eTransfersAsideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ eTransfersAsideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(eTransfersAsideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
