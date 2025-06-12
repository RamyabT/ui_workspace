import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteTransactionComponent } from './favourite-transaction.component';

describe('FavouriteTransactionComponent', () => {
  let component: FavouriteTransactionComponent;
  let fixture: ComponentFixture<FavouriteTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouriteTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
