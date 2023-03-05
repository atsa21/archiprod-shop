import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-add-edit-prod-dialog',
  templateUrl: './add-edit-prod-dialog.component.html',
  styleUrls: ['./add-edit-prod-dialog.component.scss']
})
export class AddEditProdDialogComponent implements OnInit {

  prodForm !: FormGroup;
  categories: string[] = ['work', 'study', 'home', 'hobbies', 'other'];

  dialogTitle : string = "Add Todo";
  actionBtn : string = "Submit";
  userId: string | null = '';
  key: any;

  constructor( private fb : FormBuilder,
    private prodService: ProductService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogReg: MatDialogRef<AddEditProdDialogComponent>,
    private snackbar: SnackBarService,
    // private dateAdapter: DateAdapter<Date>
    ) {
      // this.dateAdapter.setLocale('en-GB');
      // this.minDate = new Date();
  }

  ngOnInit(): void {
    // this.userId = localStorage.getItem('userId');
    this.prodForm = this.fb.group({
      category: new FormControl('', Validators.required),
      task: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(70)]),
      date: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required),
      checked: false
    });

    if(this.editData) {
      this.dialogTitle = "Edit Todo";
      this.actionBtn = "Save";
      const date = new Date(this.editData.date);
      this.prodForm.controls['category'].setValue(this.editData.category);
      this.prodForm.controls['task'].setValue(this.editData.task);
      this.prodForm.controls['date'].setValue(date);
      this.prodForm.controls['priority'].setValue(this.editData.priority);
      this.key = this.editData.key;
    }
  }

  get category(){
    return this.prodForm.get('category');
  }

  get date(){
    return this.prodForm.get('date');
  }

  get priority(){
    return this.prodForm.get('priority');
  }

  get task(){
    return this.prodForm.get('task');
  }

  get tags(){
    return this.prodForm.get('tags');
  }
}
