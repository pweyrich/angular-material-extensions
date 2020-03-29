import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatSelectionColumnComponent } from './selection-column.component';

describe('MatSelectionColumnComponent: ', () =>
{
  let fixture: ComponentFixture<MatSelectionColumnComponent<any>>;
  let component: MatSelectionColumnComponent<any>;
  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      imports:      [MatTableModule],
      declarations: [MatSelectionColumnComponent]
    });

    fixture = TestBed.createComponent(MatSelectionColumnComponent);
    component = fixture.componentInstance;
  });

  xit('should create', () =>
  {
    expect(component).toBeTruthy();
  });
});
