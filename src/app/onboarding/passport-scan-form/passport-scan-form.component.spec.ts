import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassportScanFormComponent } from './passport-scan-form.component';


describe('PassportScanFormComponent', () => {
  let component: PassportScanFormComponent;
  let fixture: ComponentFixture<PassportScanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassportScanFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassportScanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
