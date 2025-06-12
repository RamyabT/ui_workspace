import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChequeImageComponent } from './view-cheque-image.component';

describe('ViewChequeImageComponent', () => {
  let component: ViewChequeImageComponent;
  let fixture: ComponentFixture<ViewChequeImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewChequeImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewChequeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
