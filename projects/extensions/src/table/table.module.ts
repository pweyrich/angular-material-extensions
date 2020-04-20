import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CustomHeaderDirective } from './directives/custom-header.directive';
import { MatSelectionColumnComponent } from './selection-column/selection-column.component';


/** @description Exports all the extensions for material's table component. */
@NgModule({
  declarations: [
    CustomHeaderDirective,
    MatSelectionColumnComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule
  ],
  exports: [
    CustomHeaderDirective,
    MatSelectionColumnComponent
  ]
})
export class MatTableExtensionsModule { }
