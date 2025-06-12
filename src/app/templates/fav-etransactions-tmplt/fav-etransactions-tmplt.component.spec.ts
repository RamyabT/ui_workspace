import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavEtransactionsTmpltComponent } from './fav-etransactions-tmplt.component';

describe('FavEtransactionsTmpltComponent', () => {
  let component: FavEtransactionsTmpltComponent;
  let fixture: ComponentFixture<FavEtransactionsTmpltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavEtransactionsTmpltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavEtransactionsTmpltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
