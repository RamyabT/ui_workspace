import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpxCircularProgressComponent } from './fpx-circular-progress.component';

describe('FpxCircularProgressComponent', () => {
  let component: FpxCircularProgressComponent;
  let fixture: ComponentFixture<FpxCircularProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpxCircularProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FpxCircularProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
