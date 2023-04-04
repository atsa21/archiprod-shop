import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProdCategoryComponent } from './add-prod-category.component';

describe('AddEditProdListsComponent', () => {
  let component: AddProdCategoryComponent;
  let fixture: ComponentFixture<AddProdCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProdCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProdCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
