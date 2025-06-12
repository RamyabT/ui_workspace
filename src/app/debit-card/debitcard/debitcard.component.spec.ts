import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebitCardComponent } from './debitcard.component';


describe('DebitCardComponent', () => {
  let component: DebitCardComponent;
  let fixture: ComponentFixture<DebitCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
