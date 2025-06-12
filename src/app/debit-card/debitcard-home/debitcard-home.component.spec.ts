import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitcardHomeComponent } from './debitcard-home.component';

describe('DebitcardHomeComponent', () => {
  let component: DebitcardHomeComponent;
  let fixture: ComponentFixture<DebitcardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitcardHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebitcardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
