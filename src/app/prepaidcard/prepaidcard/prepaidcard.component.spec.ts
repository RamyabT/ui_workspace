import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrepaidCardComponent } from './prepaidcard.component';


describe('PrepaidCardComponent', () => {
  let component: PrepaidCardComponent;
  let fixture: ComponentFixture<PrepaidCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepaidCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrepaidCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
