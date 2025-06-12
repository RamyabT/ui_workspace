import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewMsgsTmpltComponent } from './view-msgs-tmplt.component';


describe('ViewMsgsTmpltComponent', () => {
  let component: ViewMsgsTmpltComponent;
  let fixture: ComponentFixture<ViewMsgsTmpltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMsgsTmpltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMsgsTmpltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
