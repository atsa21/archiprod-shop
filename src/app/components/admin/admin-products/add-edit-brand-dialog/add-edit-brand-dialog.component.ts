import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-brand-dialog',
  templateUrl: './add-edit-brand-dialog.component.html',
  styleUrls: ['./add-edit-brand-dialog.component.scss']
})
export class AddEditBrandDialogComponent implements OnInit {

  brandForm!: FormGroup;

  dialogTitle = 'Add';
  isEditing = false;

  constructor( 
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddEditBrandDialogComponent>
    ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.brandForm = this.fb.group({
      name: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      website: new FormControl('', Validators.required),
      logo: new FormControl('', Validators.required)
    });
  }

  public getControl(control: string): AbstractControl {
    const formControl = this.brandForm.get(control);
    return formControl!;
  }

  addBrand(): void {

  }
}
