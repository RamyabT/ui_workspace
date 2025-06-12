import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SslCertificateErrorComponent } from './ssl-certificate-error.component';

describe('MpinLoginFormComponent', () => {
  let component: SslCertificateErrorComponent;
  let fixture: ComponentFixture<SslCertificateErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SslCertificateErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SslCertificateErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
