import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, CategoryType } from 'src/app/models/products/category.interface';
import { Subject, take, takeUntil } from 'rxjs';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { SnackBarService } from 'src/app/services/snack-bar-service/snack-bar.service';
import { CapitalizeFirstLetterPipe } from 'src/app/pipes/capitalizeFirstLetter/capitalize-first-letter.pipe';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss'],
  providers: [ CapitalizeFirstLetterPipe ]
})
export class AddEditCategoryComponent {
  categories: Category[] = [];
  types: CategoryType[] = [];
  brands: any[] = [];
  categoryForm!: FormGroup;

  item!: FormControl;
  newMaterial!: FormControl;
  newShape!: FormControl;
  newExtras!: FormControl;

  dialogTitle: string = "";
  dialogName: string = "";
  isEditing = false;
  id: string = '';

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: DialogRef<AddEditCategoryComponent>,
    private fb: FormBuilder,
    private snack: SnackBarService
    ) { }

  ngOnInit(): void {
    this.item = new FormControl('');
    this.newMaterial = new FormControl('');
    this.newShape = new FormControl('');
    this.newExtras = new FormControl('');
    if(this.data) {
      this.categories = this.data.list;
      this.brands = this.data.brands;
      this.categories.forEach( item => item.isEditing = false);
      this.isEditing = this.data.isEditing;
      this.initCategoryForm();
    }
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: new FormControl('', Validators.required),
      typeName: new FormControl({value:'', disabled: this.isEditing ? true : false}, [Validators.required, Validators.minLength(2), Validators.maxLength(70)]),
      brands: new FormControl({value:[], disabled: this.isEditing ? true : false}, Validators.required),
      materials: new FormControl({value:[], disabled: this.isEditing ? true : false}, Validators.required),
      shapes: new FormControl({value:[], disabled: this.isEditing ? true : false}, Validators.required),
      extras: new FormControl({value: this.isEditing ? ['no extras'] : [], disabled: this.isEditing ? true : false}, Validators.required)
    });

    if(this.dialogName === 'type') {
      this.getControl('name').valueChanges.subscribe((selected: any) => {
        const selectedCategory = this.categories.find( el => el.name === selected);
        if(typeof selectedCategory?.id === 'string') {
          this.id = selectedCategory?.id;
          if(this.isEditing) {
            this.getCategoryTypes();
            this.resetDetails();
          }
        }
      });
      if(this.isEditing){
        this.getControl('typeName').valueChanges.subscribe((selected: any) => {
          const selectedType = this.types.find(el => el.typeName === selected);
          this.getControl('brands').setValue(selectedType?.brands);
          this.getControl('materials').setValue(selectedType?.materials);
          this.getControl('shapes').setValue(selectedType?.shapes);
          this.getControl('extras').setValue(selectedType?.extras);

          this.getControl('brands').enable();
          this.getControl('materials').enable();
          this.getControl('shapes').enable();
          this.getControl('extras').enable();
        })
      }
    }

    // if(this.isEditing) {
    //   this.getControl('category').valueChanges.subscribe( selectedValue => {
    //     if(selectedValue) {
    //       this.getCategoryTypes(selectedValue);
    //       this.resetDetails();
    //     }
    //   });
    //   this.getControl('type').valueChanges.subscribe( selectedValue => {
    //     if(selectedValue) {
    //       this.getArraysByType(selectedValue);
    //     }
    //   })
    // }
  }

  getControl(control: string): AbstractControl {
    const formControl = this.categoryForm.get(control);
    return formControl!;
  }

  getControlInvalid(control: string): boolean {
    return this.getControl(control).touched && this.getControl(control).invalid;
  }

  getCategoryTypes(): void {
    this.categoryService.getCategoryById(this.id).pipe(take(1)).subscribe( res => {
      this.types = res.data.type;
      this.getControl('typeName').enable();
    })
  }

  resetDetails(): void {
    // this.getControl('brands').setValue('');
    // this.getControl('brands').setValue([]);
    // this.getControl('materials').setValue([]);

    // this.getControl('details.shape').disable();
    // this.getControl('details.materials').disable();
    // this.getControl('details.materials').disable();
  }

  addItem(item: string, control: FormControl): void {
    if(control.value) {
      const initValue = this.getControl(item).value;
      const newList = [...initValue, control.value];
      this.getControl(item).setValue(newList);
      control.setValue('');
    }
  }

  removeItem(item: string, control: AbstractControl): void {
    if(control.value) {
      const controlValue = control.value;
      const newList = controlValue.filter((el: any) => el !== item);
      control.setValue(newList);
    }
  }

  addCategory(): void {
    if(this.categoryForm.valid) {
      this.categoryService.addCategory(this.categoryForm.value).pipe(takeUntil(this.destroy$)).subscribe(res => {
        this.snack.openSnackBar('You added new category!', 'success');
        this.dialogRef.close();
      });
    }
  }

  addType(): void {
    if(this.categoryForm.valid) {
      this.categoryService.addType(this.categoryForm.value, this.id).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
        this.dialogRef.close();
      });
    }
  }

  editType(): void {
    if(this.categoryForm.valid) {
      const type = this.getControl('typeName').value;
      this.categoryService.editType(this.categoryForm.value, this.id).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
        this.dialogRef.close();
      });
    }
  }

  public deleteCategory(id: string): void {
    this.categoryService.deleteCategory(id).subscribe((res: any) => {
      this.categories = this.categories.filter( el => el.id != id);
    });
  }
}
