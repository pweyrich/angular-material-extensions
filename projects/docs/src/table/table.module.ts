import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionColumnComponent } from './selection-column/selection-column.component';
import { MatExtensionsTableModule } from '../../../extensions/src/table/table.module';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [SelectionColumnComponent],
  exports:      [
    SelectionColumnComponent
  ],
  imports: [
    CommonModule,
    MatExtensionsTableModule,
    MatTableModule
  ]
})
export class ExamplesTableModule { }
