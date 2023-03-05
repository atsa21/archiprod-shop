import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProdDialogComponent } from './add-edit-prod-dialog.component';

describe('AddEditProdDialogComponent', () => {
  let component: AddEditProdDialogComponent;
  let fixture: ComponentFixture<AddEditProdDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditProdDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditProdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
