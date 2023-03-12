import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-edit-prod-lists',
  templateUrl: './add-edit-prod-lists.component.html',
  styleUrls: ['./add-edit-prod-lists.component.scss']
})
export class AddEditProdListsComponent {

  list: Category[] = [];
  name!: FormControl;

  dialogTitle: string = "";
  dialogName: string = "";
  isEditing = false;

  constructor(
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.name = new FormControl('');
    if(this.data) {
      this.list = this.data.list;
      this.dialogTitle = this.data.dialogTitle;
      this.dialogName = this.data.dialogName;
    }
  }

  public addItem(item: string): void {
    switch (item) {
      case 'category':
        this.addCategory();
        break;
      case 'type':
        this.addCategory();
        break;
      default:
        this.addCategory();
    }
  }

  public editItem(item: string, id: string): void {
    switch (item) {
      case 'category':
        this.editCategory(id);
        break;
      case 'type':
        this.editCategory(id);
        break;
      default:
        this.editCategory(id);
    }
  }

  public deleteItem(item: string, id: string): void {
    switch (item) {
      case 'category':
        this.deleteCategory(id);
        break;
      case 'type':
        this.deleteCategory(id);
        break;
      default:
        this.deleteCategory(id);
    }
  }
  
  public addCategory(): void {
    if(this.name.value) {
      this.categoryService.addCategory(this.name.value).subscribe( res => {
        console.log("You added the category");
      });
    }
  }

  public editCategory(id: string): void {
    this.categoryService.deleteCategory(id).subscribe((res: any) => {
      console.log("You deleted the category");
    });
  }

  public deleteCategory(id: string): void {
    this.categoryService.deleteCategory(id).subscribe((res: any) => {
      console.log("You deleted the category");
    });
  }
}
