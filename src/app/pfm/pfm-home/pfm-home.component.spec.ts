import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfmHomeComponent } from './pfm-home.component';

describe('PfmHomeComponent', () => {
  let component: PfmHomeComponent;
  let fixture: ComponentFixture<PfmHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PfmHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfmHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
