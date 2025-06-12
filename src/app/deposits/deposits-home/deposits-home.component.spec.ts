import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositsHomeComponent } from './deposits-home.component';

describe('DepositsHomeComponent', () => {
  let component: DepositsHomeComponent;
  let fixture: ComponentFixture<DepositsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositsHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
