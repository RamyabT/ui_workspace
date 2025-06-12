import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsSpaceRoutingModule } from './cards-space-routing.module';
import { CardsContainerComponent } from './cards-container/cards-container.component';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../dep/core/material.module';
import { FoundationModule } from '../foundation/foundation.module';
import { DebitCardTabContainerComponent } from './debitcard-tab-container/debitcard-tab-container.component';
import { DebitcardModule } from '../debit-card/debitcard.module';
import { CreditCardsModule } from '../credit-cards/credit-cards.module';
import { CreditCardTabContainerComponent } from './creditcard-tab-container/creditcard-tab-container.component';
import { PrepaidCardTabContainerComponent } from './prepaidcard-tab-container/prepaidcard-tab-container.component';
import { PrepaidcardModule } from '../prepaidcard/prepaidcard.module';
import { DebitcardNavigationFormComponent } from './debitcard-navigation-form/debitcard-navigation-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreditcardNavigationFormComponent } from './creditcard-navigation-form/creditcard-navigation-form.component';
import { PrepaidcardNavigationFormComponent } from './prepaidcard-navigation-form/prepaidcard-navigation-form.component';
import { CreditCardsAsideBarComponent } from '../layout/components/creditcards-aside-bar/creditcards-aside-bar.component';
import { CreditCardModuleHeaderComponent } from './creditcard-module-header/creditcard-module-header.component';


@NgModule({
  declarations: [
    CardsContainerComponent,
    DebitCardTabContainerComponent,
    CreditCardTabContainerComponent,
    PrepaidCardTabContainerComponent,
    DebitcardNavigationFormComponent,
    CreditcardNavigationFormComponent,
    PrepaidcardNavigationFormComponent,
    CreditCardsAsideBarComponent,
    CreditCardModuleHeaderComponent
  ],
  imports: [
    CommonModule,
    CardsSpaceRoutingModule,
    TranslateModule,
    FpxCoreModule,
    MaterialModule,
    DebitcardModule,
    FoundationModule,
    CreditCardsModule,
    PrepaidcardModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CardsSpaceModule { }
