import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetailViewCasaTranDtlsFormComponent } from './retail-view-casa-tran-dtls-form.component';


describe('RetailViewCasaTranDtlsFormComponent', () => {
  let component: RetailViewCasaTranDtlsFormComponent;
  let fixture: ComponentFixture<RetailViewCasaTranDtlsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailViewCasaTranDtlsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailViewCasaTranDtlsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
