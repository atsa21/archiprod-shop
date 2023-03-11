import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProdListsComponent } from './add-edit-prod-lists.component';

describe('AddEditProdListsComponent', () => {
  let component: AddEditProdListsComponent;
  let fixture: ComponentFixture<AddEditProdListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditProdListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditProdListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
