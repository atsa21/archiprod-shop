import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { take } from 'rxjs';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-add-edit-prod-lists',
  templateUrl: './add-edit-prod-lists.component.html',
  styleUrls: ['./add-edit-prod-lists.component.scss']
})
export class AddEditProdListsComponent {

  categories: Category[] = [];
  categoryForm!: FormGroup;
  brandForm!: FormGroup;
  item!: FormControl;

  dialogTitle: string = "";
  dialogName: string = "";
  isEditing = false;
  id: string = '';

  constructor(
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: DialogRef<AddEditProdListsComponent>,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.item = new FormControl('');
    if(this.data) {
      this.dialogTitle = this.data.dialogTitle;
      this.dialogName = this.data.dialogName;
      this.categories = this.data.list;
      this.categories.forEach( item => item.isEditing = false);
      this.isEditing = this.data.isEditing;
      this.dialogName === 'type' ? this.initCategoryForm() : this.initBrandForm();
    }
  }

  public initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: new FormControl('', Validators.required),
      typeName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(70)]),
      materials: new FormControl(null, Validators.required),
      shapes: new FormControl(null, Validators.required),
      extras: new FormControl(null, Validators.required)
    });

    this.getControl('name')?.valueChanges.subscribe( selected => {
      const selectedCategory = this.categories.find( el => el.name === selected);
      if(selectedCategory?.id) {
        this.id = selectedCategory.id;
      }
    })
  }

  public initBrandForm(): void {
    this.brandForm = this.fb.group({
      name: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      website: new FormControl('', Validators.required),
      logo: new FormControl('', Validators.required)
    });
  }

  public getControl(control: string): AbstractControl | null {
    return this.dialogName === 'type' ? this.categoryForm.get(control) : this.brandForm.get(control);
  }

  // public addItem(item: string): void {
  //   item ==='category' ? this.addCategory() : this.addCategory();
  // }

  public editItem(item: string, id: string): void {
    // switch (item) {
    //   case 'category':
    //     this.editCategory(id);
    //     break;
    //   case 'type':
    //     this.editCategory(id);
    //     break;
    //   default:
    //     this.editCategory(id);
    // }
  }

  public deleteCategory(id: string): void {
    this.categoryService.deleteCategory(id).subscribe((res: any) => {
      console.log("You deleted the category");
    });
  }
  
  public addCategory(): void {
    if(this.item.valid) {
      this.categoryService.addCategory(this.item.value).subscribe( res => {
        console.log("You added the category");
        this.dialogRef.close();
      });
    }
  }

  public addCategoryType(): void {
    console.log(this.categoryForm.value);
    // if(this.categoryForm.valid) {
    //   this.categoryService.addCategoryType(this.categoryForm.value, this.id).subscribe( res => {
    //     console.log(res.message);
    //     this.dialogRef.close();
    //   });
    // }
  }

  // public editType(id: string): void {
  //   this.categoryService.deleteCategory(id).subscribe((res: any) => {
  //     console.log("You deleted the category");
  //   });
  // }

  // public deleteType(id: string): void {
  //   this.categoryService.deleteCategory(id).subscribe((res: any) => {
  //     console.log("You deleted the category");
  //   });
  // }

  public addBrand(): void {
    
  }
}
