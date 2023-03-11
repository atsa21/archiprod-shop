import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { CategoryRes } from 'src/app/models/category-res';
import { CategoryService } from 'src/app/services/category.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-add-edit-prod-lists',
  templateUrl: './add-edit-prod-lists.component.html',
  styleUrls: ['./add-edit-prod-lists.component.scss']
})
export class AddEditProdListsComponent {
  categotyForm !: FormGroup;
  categories: any[] = [];

  title : string = "Categories";
  actionBtn : string = "Submit";
  userId: string | null = '';
  isEditing = false;

  constructor( private fb : FormBuilder,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogReg: MatDialogRef<AddEditProdListsComponent>,
    private snackbar: SnackBarService,
    ) { }

  ngOnInit(): void {
    this.categotyForm = this.fb.group({
      name: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(70)])
    });
    this.getCategories();
    // if(this.data) {
    //   this.isEditing = this.data.isEditing;
    //   this.categories = this.data;
    //   this.dialogTitle = "Edit Category";
    //   this.actionBtn = "Save";
    // }
  }

  get name(){
    return this.categotyForm.get('name');
  }

  // private setEditingData(category: any[]) {
  //   this.dialogTitle = "Edit Category";
  //   this.actionBtn = "Save";
  //   this.categories = ''
  // }

  private getCategories(): void {
    this.categoryService.getAllCategories()
      .pipe(map((data) => {
        return data.data.map( (res: CategoryRes) => {
          return {
            id: res._id,
            name: res.name
          }
        })
      }))
      .subscribe(data => {
        this.categories = data;
    })
  }
  
  public addCategory(): void {
    if(this.categotyForm.valid) {
      this.categoryService.addCategory(this.categotyForm.value).subscribe( res => {
        const id = res.categoryId;
      });
    }
  }

  public deleteCategory(id: string): void {
    this.categoryService.deleteCategory(id).subscribe((res: any) => {
      console.log("You deleted the category");
    });
  }
}
