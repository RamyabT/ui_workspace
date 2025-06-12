import { ComponentFixture, TestBed } from '@angular/core/testing';
import { eDocumentAsideBarComponent } from './edocument-aside-bar.component';


describe('eDocumentAsideBarComponent', () => {
  let component: eDocumentAsideBarComponent;
  let fixture: ComponentFixture<eDocumentAsideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ eDocumentAsideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(eDocumentAsideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
