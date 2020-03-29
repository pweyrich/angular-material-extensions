import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectionColumnComponent } from './selection-column/selection-column.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';


/**
 * @description Exports all the extensions for material's table component
 */
@NgModule({
  declarations: [
    MatSelectionColumnComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule
  ],
  exports: [
    MatSelectionColumnComponent
  ]
})
export class MatExtensionsTableModule { }
