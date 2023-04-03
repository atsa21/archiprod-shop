import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { Subject, takeUntil } from 'rxjs';
import { DialogRef } from '@angular/cdk/dialog';
import { SnackBarService } from 'src/app/services/snack-bar-service/snack-bar.service';

@Component({
  selector: 'app-add-edit-prod-lists',
  templateUrl: './add-edit-prod-lists.component.html',
  styleUrls: ['./add-edit-prod-lists.component.scss']
})
export class AddEditProdListsComponent {

  categories: Category[] = [];
  categoryForm!: FormGroup;

  item!: FormControl;
  newMaterial!: FormControl;
  newShape!: FormControl;
  newExtras!: FormControl;

  dialogTitle: string = "";
  dialogName: string = "";
  isEditing = false;
  id: string = '';

  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: DialogRef<AddEditProdListsComponent>,
    private fb: FormBuilder,
    private snack: SnackBarService
    ) { }

  ngOnInit(): void {
    this.item = new FormControl('');
    this.newMaterial = new FormControl('');
    this.newShape = new FormControl('');
    this.newExtras = new FormControl('');
    if(this.data) {
      this.dialogTitle = this.data.dialogTitle;
      this.dialogName = this.data.dialogName;
      this.categories = this.data.list;
      this.categories.forEach( item => item.isEditing = false);
      this.isEditing = this.data.isEditing;
      this.initCategoryForm();
    }
  }

  public initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: new FormControl('', Validators.required),
      typeName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(70)]),
      materials: new FormControl([], Validators.required),
      shapes: new FormControl([], Validators.required),
      extras: new FormControl([], Validators.required)
    });

    // this.categoryForm?.valueChanges.subscribe( selected => {
    //   console.log(selected);
    // })

    this.getControl('name').valueChanges.subscribe( selected => {
      const selectedCategory = this.categories.find( el => el.name === selected);
      if(selectedCategory?.id) {
        this.id = selectedCategory.id;
      }
    })
  }

  public getControl(control: string): AbstractControl {
    const formControl = this.categoryForm.get(control);
    return formControl!;
  }

  public addItem(item: string, control: FormControl): void {
    if(control.value) {
      const initValue = this.getControl(item).value;
      const newList = [...initValue, control.value];
      this.getControl(item).setValue(newList);
      control.setValue('');
    }
  }

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

  public addCategory(): void {
    if(this.categoryForm.valid) {
      this.categoryService.addCategory(this.categoryForm.value).pipe(takeUntil(this.destroy)).subscribe(res => {
        this.snack.openSnackBar('You added new category!', 'success');
        this.dialogRef.close();
      });
    }
  }

  public addCategoryType(): void {
    if(this.categoryForm.valid) {
      this.categoryService.addCategoryType(this.categoryForm.value, this.id).pipe(takeUntil(this.destroy)).subscribe((res: any) => {
        console.log(res);
        this.dialogRef.close();
      });
    }
  }

  public deleteCategory(id: string): void {
    this.categoryService.deleteCategory(id).subscribe((res: any) => {
      this.categories = this.categories.filter( el => el.id != id);
    });
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
