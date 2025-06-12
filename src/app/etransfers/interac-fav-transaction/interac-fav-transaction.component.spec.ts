import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteracFavTransactionComponent } from './interac-fav-transaction.component';

describe('InteracFavTransactionComponent', () => {
  let component: InteracFavTransactionComponent;
  let fixture: ComponentFixture<InteracFavTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteracFavTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteracFavTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
