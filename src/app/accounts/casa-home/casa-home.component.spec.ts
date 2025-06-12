import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasaHomeComponent } from './casa-home.component';

describe('CasaHomeComponent', () => {
  let component: CasaHomeComponent;
  let fixture: ComponentFixture<CasaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasaHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
