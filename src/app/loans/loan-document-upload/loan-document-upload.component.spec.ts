import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoanDocumentUploadComponent } from './loan-document-upload.component';


describe('LoanDetailsComponent', () => {
  let component: LoanDocumentUploadComponent;
  let fixture: ComponentFixture<LoanDocumentUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanDocumentUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanDocumentUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
