import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrcodeGenerateComponent } from './qrcode-generate.component';


describe('QrcodeGenerateComponent', () => {
  let component: QrcodeGenerateComponent;
  let fixture: ComponentFixture<QrcodeGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrcodeGenerateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrcodeGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
