import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RetailManageDelegateTemplateComponent } from './retail-manage-delegate-template.component';


describe('RetailManageDelegateTemplateComponent', () => {
  let component: RetailManageDelegateTemplateComponent;
  let fixture: ComponentFixture<RetailManageDelegateTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailManageDelegateTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailManageDelegateTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
