import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferTypeListComponent } from './transfer-type-list.component';


describe('TransferTypeListComponent', () => {
  let component: TransferTypeListComponent;
  let fixture: ComponentFixture<TransferTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferTypeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
