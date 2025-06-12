import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobPhotoIdMatchFormComponent } from './cob-photo-id-match-form.component';

describe('CobPhotoIdMatchFormComponent', () => {
  let component: CobPhotoIdMatchFormComponent;
  let fixture: ComponentFixture<CobPhotoIdMatchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CobPhotoIdMatchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CobPhotoIdMatchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
