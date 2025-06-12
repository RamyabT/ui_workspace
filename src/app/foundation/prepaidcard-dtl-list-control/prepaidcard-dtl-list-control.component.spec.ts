import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitcardDtlListControlComponent } from './prepaidcard-dtl-list-control.component';

describe('DebitcardDtlListControlComponent', () => {
  let component: DebitcardDtlListControlComponent;
  let fixture: ComponentFixture<DebitcardDtlListControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitcardDtlListControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebitcardDtlListControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
