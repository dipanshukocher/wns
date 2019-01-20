import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedService } from './shared.service';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmModelComponent } from './confirm-model/confirm-model.component';
import { ChartComponent } from './chart/chart.component';
import { NvD3Module } from 'ng2-nvd3';
// d3 and nvd3 should be included somewhere
import 'd3';
import 'nvd3';

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatListModule,
  MatProgressBarModule,
  MatTableModule,
  MatSelectModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatGridListModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatDividerModule,
  MatButtonToggleModule
} from '@angular/material';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatGridListModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatDividerModule,
    MatButtonToggleModule,
    ScrollDispatchModule,
    NvD3Module
  ],
  declarations: [
    FileUploaderComponent,
    ConfirmModelComponent,
    ChartComponent,
  ],
  schemas: [
  ],
  exports: [
    FileUploaderComponent,
    ConfirmModelComponent,
    ChartComponent,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatTabsModule,
    MatDividerModule,
    MatButtonToggleModule,
    ScrollDispatchModule,
    NvD3Module
  ],
  providers: [
    SharedService
  ],
  entryComponents: [ConfirmModelComponent]
})
export class SharedModule { }
