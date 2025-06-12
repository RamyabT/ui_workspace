import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditCardsListComponent } from './creditcards-list.component'; 

describe('CreditCardsListComponent', () => {
    let component: CreditCardsListComponent;
    let fixture: ComponentFixture<CreditCardsListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          declarations: [ CreditCardsListComponent ]
        })
        .compileComponents();
    
        fixture = TestBed.createComponent(CreditCardsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
    
      it('should create', () => {
        expect(component).toBeTruthy();
      });
})