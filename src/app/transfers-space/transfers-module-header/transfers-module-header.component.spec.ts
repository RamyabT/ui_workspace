import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransfersModuleHeaderComponent } from './transfers-module-header.component';


describe('TransfersModuleHeaderComponent', () => {
  let component: TransfersModuleHeaderComponent;
  let fixture: ComponentFixture<TransfersModuleHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfersModuleHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfersModuleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
