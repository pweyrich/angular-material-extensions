import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import {
  MatColumnDef,
  MatCellDef,
  MatHeaderCellDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';

@Component({
  selector: 'mat-selection-column',
  templateUrl: './selection-column.component.html',
  styleUrls: ['./selection-column.component.scss']
})
export class MatSelectionColumnComponent<T> implements OnInit, OnDestroy {
  /** @description Name of the column */
  @Input() name: string;

  /** @description Reference to the selection model */
  @Input() selection: SelectionModel<T>;

  @ViewChild(MatColumnDef, { static: true }) columnDef: MatColumnDef;
  @ViewChild(MatCellDef, { static: true }) cell: MatCellDef;
  @ViewChild(MatHeaderCellDef, { static: true }) headerCell: MatHeaderCellDef;

  constructor(private table: MatTable<T>) {}

  public ngOnInit(): void {
    this.columnDef.name = this.name || 'select';
    this.columnDef.cell = this.cell;
    this.columnDef.headerCell = this.headerCell;
    this.table.addColumnDef(this.columnDef);
  }

  public ngOnDestroy(): void {
    this.table.removeColumnDef(this.columnDef);
  }

  private get data(): T[] {
    if (!this.table) {
      return [];
    }
    if (this.table.dataSource instanceof MatTableDataSource) {
      return this.table.dataSource.data || [];
    }
    // TODO: What about Observables?

    return (this.table.dataSource as T[]) || [];
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection?.selected.length || 0;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (!this.selection) {
      return;
    }
    this.isAllSelected()
      ? this.selection.clear()
      : this.selection.select(...this.data);
  }
}
