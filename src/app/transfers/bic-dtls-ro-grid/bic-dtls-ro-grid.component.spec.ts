import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BicDtlsRoGridComponent } from './bic-dtls-ro-grid.component';

describe('BicDtlsRoGridComponent', () => {
  let component: BicDtlsRoGridComponent;
  let fixture: ComponentFixture<BicDtlsRoGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BicDtlsRoGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BicDtlsRoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
