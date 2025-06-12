import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersHomeComponent } from './transfers-home.component';

describe('TransfersHomeComponent', () => {
  let component: TransfersHomeComponent;
  let fixture: ComponentFixture<TransfersHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfersHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfersHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
