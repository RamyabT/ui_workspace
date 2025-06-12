import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpssHomeeComponent } from './npss-home.component';

describe('NpssHomeeComponent', () => {
  let component: NpssHomeeComponent;
  let fixture: ComponentFixture<NpssHomeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpssHomeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NpssHomeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
