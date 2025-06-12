import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LOANAccountsListComponent } from './loan-accounts-list.component';



describe('LOANAccountsListComponent', () => {
  let component: LOANAccountsListComponent;
  let fixture: ComponentFixture<LOANAccountsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LOANAccountsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LOANAccountsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
