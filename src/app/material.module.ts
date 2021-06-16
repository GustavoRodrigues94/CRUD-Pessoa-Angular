import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  imports: [
    MatIconModule,
    MatStepperModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule
  ],
  exports: [
    MatIconModule,
    MatStepperModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule
  ]
})
export class MaterialModule {}
