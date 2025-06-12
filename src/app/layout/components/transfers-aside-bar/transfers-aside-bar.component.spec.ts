import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersAsideBarComponent } from './transfers-aside-bar.component';

describe('TransfersAsideBarComponent', () => {
  let component: TransfersAsideBarComponent;
  let fixture: ComponentFixture<TransfersAsideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfersAsideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfersAsideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
