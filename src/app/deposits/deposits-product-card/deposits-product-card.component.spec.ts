import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositsProductCardComponent } from './deposits-product-card.component';

describe('DepositsProductCardComponent', () => {
  let component: DepositsProductCardComponent;
  let fixture: ComponentFixture<DepositsProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositsProductCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositsProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
