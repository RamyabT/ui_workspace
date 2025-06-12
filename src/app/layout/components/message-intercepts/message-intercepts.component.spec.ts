import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageInterceptsComponent } from './message-intercepts.component';


describe('MessageInterceptsComponent', () => {
  let component: MessageInterceptsComponent;
  let fixture: ComponentFixture<MessageInterceptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageInterceptsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageInterceptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
