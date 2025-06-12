import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloginHeaderComponent } from './prelogin-header.component';

describe('PreloginHeaderComponent', () => {
  let component: PreloginHeaderComponent;
  let fixture: ComponentFixture<PreloginHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreloginHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreloginHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
