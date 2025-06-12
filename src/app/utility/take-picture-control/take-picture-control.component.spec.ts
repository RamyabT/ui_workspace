import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakePictureControlComponent } from './take-picture-control.component';

describe('TakePictureControlComponent', () => {
  let component: TakePictureControlComponent;
  let fixture: ComponentFixture<TakePictureControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakePictureControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakePictureControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
