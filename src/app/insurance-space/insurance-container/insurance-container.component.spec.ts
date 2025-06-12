import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceContainerComponent } from './insurance-container.component';

describe('InsuranceContainerComponent', () => {
  let component: InsuranceContainerComponent;
  let fixture: ComponentFixture<InsuranceContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
