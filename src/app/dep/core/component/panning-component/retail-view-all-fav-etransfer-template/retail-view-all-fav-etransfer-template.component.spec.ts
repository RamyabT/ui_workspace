import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RetailViewAllFavETransferTemplateComponent } from './retail-view-all-fav-etransfer-template.component';


describe('RetailViewAllFaTransferTemplateComponent', () => {
  let component: RetailViewAllFavETransferTemplateComponent;
  let fixture: ComponentFixture<RetailViewAllFavETransferTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailViewAllFavETransferTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailViewAllFavETransferTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
