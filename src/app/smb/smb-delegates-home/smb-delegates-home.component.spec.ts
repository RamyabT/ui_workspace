import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmbDelegatesHomeComponent } from './smb-delegates-home.component';

describe('SmbDelegatesHomeComponent', () => {
  let component: SmbDelegatesHomeComponent;
  let fixture: ComponentFixture<SmbDelegatesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmbDelegatesHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmbDelegatesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
