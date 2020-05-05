![CI](https://github.com/pweyrich/angular-material-extensions/workflows/CI/badge.svg?branch=master)

Extensions to the components provided by [@angular/material](https://material.angular.io/)

# Table

## MatCustomHeaderDirective
Enables a user to customize the order of columns via drag & drop on the table header cells.

### Usage
Add `matCustomHeader` directive to the header row.

```html
<mat-table [dataSource]="dataSource" class="mat-elevation-z8">
   <ng-container *ngFor="let column of columns; let i = index" [matColumnDef]="column">
       <mat-header-cell *matHeaderCellDef>
         {{ column }}
       </mat-header-cell>
       <mat-cell *matCellDef="let row"> {{ row[column] }}  </mat-cell>
   </ng-container>
   <mat-header-row *matHeaderRowDef="displayedColumns" matCustomHeader></mat-header-row>
   <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
</mat-table>
```

## MatSelectionColumnComponent
A component which registers both a header cell def and a cell def for a column that provides checkboxes to select rows using a SelectionModel.

### Usage
```js
dataSource = [1,2,3];
displayedColumns = ['select', 'data'];
selection = new SelectionModel<number>(true);
```

```html
<mat-table [dataSource]="dataSource">
   <mat-selection-column name="select" [selection]="selection"></mat-selection-column>
   <ng-container matColumnDef="data">
       <mat-header-cell *matHeaderCellDef>Data</mat-header-cell>
       <mat-cell *matCellDef="let row"> {{ row }} </mat-cell>
   </ng-container>
   <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
   <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
</mat-table>
```
