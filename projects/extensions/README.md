# Usage

Add `matCustomHeader` directive to the header row.

```
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
