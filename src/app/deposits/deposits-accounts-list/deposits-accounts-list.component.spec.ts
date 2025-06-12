import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepositsAccountsListComponent } from './deposits-accounts-list.component';



describe('DepositsAccountsListComponent', () => {
  let component: DepositsAccountsListComponent;
  let fixture: ComponentFixture<DepositsAccountsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositsAccountsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositsAccountsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
