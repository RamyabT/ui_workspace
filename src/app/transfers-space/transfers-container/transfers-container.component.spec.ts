import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersContainerComponent } from './transfers-container.component';

describe('TransfersContainerComponent', () => {
  let component: TransfersContainerComponent;
  let fixture: ComponentFixture<TransfersContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfersContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
