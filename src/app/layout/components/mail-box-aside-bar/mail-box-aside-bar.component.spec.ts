import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MailBoxAsideBarComponent } from './mail-box-aside-bar.component';


describe('MailBoxAsideBarComponent', () => {
  let component: MailBoxAsideBarComponent;
  let fixture: ComponentFixture<MailBoxAsideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailBoxAsideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailBoxAsideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
