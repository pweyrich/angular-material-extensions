import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatSelectionColumnComponent } from './selection-column.component';
import { noop } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

const matTableStub: Partial<MatTable<number>> = {
  addColumnDef: noop,
  removeColumnDef: noop,
  dataSource: [1, 2, 3]
};

describe('MatSelectionColumnComponent: ', () => {
  let fixture: ComponentFixture<MatSelectionColumnComponent<number>>;
  let component: MatSelectionColumnComponent<number>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [MatSelectionColumnComponent],
      providers: [
        {
          provide: MatTable,
          useValue: matTableStub
        }
      ]
    });

    fixture = TestBed.createComponent<MatSelectionColumnComponent<number>>(
      MatSelectionColumnComponent
    );
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register itself in the table during initialization', () => {
    const matTable = TestBed.inject(MatTable);
    const addColumnDefSpy = spyOn(matTable, 'addColumnDef');

    component.ngOnInit();

    expect(addColumnDefSpy).toHaveBeenCalledTimes(1);
  });

  it('should unregister itself in the table when it is destroyed', () => {
    const matTable = TestBed.inject(MatTable);
    const removeColumnDefSpy = spyOn(matTable, 'removeColumnDef');

    component.ngOnDestroy();

    expect(removeColumnDefSpy).toHaveBeenCalledTimes(1);
  });

  it(`should update the columnDef's name with the value of the #name input`, () => {
    component.name = 'test';

    component.ngOnInit();

    expect(component.columnDef.name).toBe(component.name);
  });

  it(`should set the columnDef's name with a default value of 'select'`, () => {
    component.ngOnInit();
    expect(component.columnDef.name).toBe('select');
  });

  it(`should set the columnDef's header with the headerCellDef viewChild`, () => {
    component.ngOnInit();
    expect(component.columnDef.headerCell).toBe(component.headerCell);
  });

  it(`should set the columnDef's cell with the cellDef viewChild`, () => {
    component.ngOnInit();
    expect(component.columnDef.cell).toBe(component.cell);
  });

  describe('with SelectionModel', () => {
    let data: number[];
    beforeEach(() => {
      component.selection = new SelectionModel<number>(true);
      const matTable = TestBed.inject(MatTable);
      data = matTable.dataSource as number[];
    });

    it('should give information about the current state of selection via #isAllSelected', () => {
      expect(component.selection.selected.length).toBe(0);
      expect(component.selection.isEmpty()).toBe(true);
      expect(component.isAllSelected()).toBe(false);

      component.selection.select(...data); // select all

      expect(component.selection.selected.length).toBe(data.length);
      expect(component.selection.isEmpty()).toBe(false);
      expect(component.isAllSelected()).toBe(true);
    });

    it('should toggle all if the #masterToggle() is executed', () => {
      expect(component.isAllSelected()).toBe(false);
      expect(component.selection.selected.length).toBe(0);

      component.masterToggle();

      expect(component.isAllSelected()).toBe(true);
      expect(component.selection.selected.length).toBe(data.length);

      component.masterToggle();

      expect(component.isAllSelected()).toBe(false);
      expect(component.selection.selected.length).toBe(0);
    });
  });

  describe(`without SelectionModel`, () => {
    it(`should return false for #isAllSelected()`, () => {
      expect(component.selection).toBeUndefined();
      expect(component.isAllSelected()).toBe(false);
    });

    it(`should not do anything when executing the #masterToggle()`, () => {
      expect(component.isAllSelected()).toBe(false);

      component.masterToggle();

      expect(component.isAllSelected()).toBe(false);
    });
  });
});
