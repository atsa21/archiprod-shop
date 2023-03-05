import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit {

  categotyForm !: FormGroup;
  categories: string[] = [];

  dialogTitle : string = "Add Todo";
  actionBtn : string = "Submit";
  userId: string | null = '';
  key: any;

  constructor( private fb : FormBuilder,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogReg: MatDialogRef<AddEditCategoryComponent>,
    private snackbar: SnackBarService,
    ) { }

  ngOnInit(): void {
    this.categotyForm = this.fb.group({
      name: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(70)]),
      type: new FormControl(''),
    });

    if(this.editData) {
      this.dialogTitle = "Edit Category";
      this.actionBtn = "Save";
      // this.categotyForm.controls['name'].setValue(this.editData);
      this.key = this.editData.key;
    }
  }

  get name(){
    return this.categotyForm.get('name');
  }
  
  public addCategory(): void {
    this.categoryService.postCategory(this.categotyForm);
  }
}
