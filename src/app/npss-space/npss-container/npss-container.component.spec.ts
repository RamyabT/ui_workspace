import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpssContainerComponent } from './npss-container.component';

describe('NpssContainerComponent', () => {
  let component: NpssContainerComponent;
  let fixture: ComponentFixture<NpssContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpssContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NpssContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
