import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetailScanAndPayComponent } from './retail-scan-and-pay.component';


describe('QrcodeGenerateComponent', () => {
  let component: RetailScanAndPayComponent;
  let fixture: ComponentFixture<RetailScanAndPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailScanAndPayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailScanAndPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
