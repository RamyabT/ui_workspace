import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ETransfersContainerComponent } from './e-transfers-container.component';

describe('ETransfersContainerComponent', () => {
  let component: ETransfersContainerComponent;
  let fixture: ComponentFixture<ETransfersContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ETransfersContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ETransfersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
