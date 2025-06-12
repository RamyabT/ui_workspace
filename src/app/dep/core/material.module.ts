import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule, MAT_SELECT_CONFIG } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';

import { MatBadgeModule } from '@angular/material/badge';
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MAT_RIPPLE_GLOBAL_OPTIONS,
} from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  MatRadioModule,
  MAT_RADIO_DEFAULT_OPTIONS,
} from '@angular/material/radio';
import {
  MatCheckboxModule,
  MAT_CHECKBOX_DEFAULT_OPTIONS,
} from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { PortalModule } from '@angular/cdk/portal';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  exports: [
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatIconModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTableModule,
    MatDialogModule,
    PortalModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatExpansionModule
  ],
})
export class MaterialModule {}
