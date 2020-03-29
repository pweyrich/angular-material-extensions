import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  MatColumnDef,
  MatTable,
  MatTableModule
} from '@angular/material/table';
import { MatSelectionColumnComponent } from './selection-column.component';
import { noop } from 'rxjs';

const matTableStub: Partial<MatTable<number>> = {
  addColumnDef: (columnDef: MatColumnDef) => noop(),
  removeColumnDef: (columnDef: MatColumnDef) => noop(),
  dataSource: [1, 2, 3]
};

describe('MatSelectionColumnComponent: ', () =>
{
  let fixture: ComponentFixture<MatSelectionColumnComponent<number>>;
  let component: MatSelectionColumnComponent<number>;

  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      imports:      [MatTableModule],
      declarations: [MatSelectionColumnComponent],
      providers: [{
        provide: MatTable,
        useValue: matTableStub
      }]
    });

    fixture = TestBed.createComponent<MatSelectionColumnComponent<number>>(MatSelectionColumnComponent);
    component = fixture.componentInstance;
  });

  it('should create', () =>
  {
    expect(component).toBeTruthy();
  });

  it('should register itself in the table during intialization', () =>
  {
    const matTable = TestBed.inject(MatTable);
    const addColumnDefSpy = spyOn(matTable, 'addColumnDef');

    component.ngOnInit();

    expect(addColumnDefSpy).toHaveBeenCalledTimes(1);
  });

  it('should unregister itself in the table when it is destroyed', () =>
  {
    const matTable = TestBed.inject(MatTable);
    const removeColumnDefSpy = spyOn(matTable, 'removeColumnDef');

    component.ngOnDestroy();

    expect(removeColumnDefSpy).toHaveBeenCalledTimes(1);
  });
});
