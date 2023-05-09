import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { BrandService } from 'src/app/services/brands-service/brand.service';
import { SnackBarService } from 'src/app/services/snack-bar-service/snack-bar.service';

@Component({
  selector: 'app-add-edit-brand-dialog',
  templateUrl: './add-edit-brand-dialog.component.html',
  styleUrls: ['./add-edit-brand-dialog.component.scss']
})
export class AddEditBrandDialogComponent implements OnInit {

  brandForm!: FormGroup;
  imageChangedEvent: any = '';
  logo: any;
  currentYear: number = new Date().getFullYear();
  id: string = '';

  dialogTitle = 'Add';
  isEditing = false;

  constructor( 
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddEditBrandDialogComponent>,
    private brandService: BrandService,
    private snack: SnackBarService
    ) {
  }

  ngOnInit(): void {
    this.initForm();
    if(this.data.isEditing) {
      this.isEditing = this.data.isEditing;
      this.dialogTitle = 'Edit';
      this.id = this.data.brand.id;
      this.getControl('name').setValue(this.data.brand.name);
      this.getControl('year').setValue(this.data.brand.year);
      this.getControl('country').setValue(this.data.brand.country);
      this.getControl('website').setValue(this.data.brand.website);
      this.getControl('logo').setValue(this.data.brand.logo);
    }
  }

  public initForm(): void {
    this.brandForm = this.fb.group({
      name: new FormControl('', Validators.required),
      year: new FormControl(null, [Validators.required, Validators.max(this.currentYear)]),
      country: new FormControl('', Validators.required),
      website: new FormControl('', Validators.required),
      logo: new FormControl('', Validators.required)
    });
  }

  getControl(control: string): AbstractControl {
    const formControl = this.brandForm.get(control);
    return formControl!;
  }

  public onImagePicked(event: Event): void {
    this.imageChangedEvent = event;
  }

  public imageCropped(event: ImageCroppedEvent): void {
    this.logo = this.base64ToFile(
      event.base64,
      this.imageChangedEvent?.target?.files[0].name,
    );
  }

  private base64ToFile(data: any, filename: any): File {
    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
  
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new File([u8arr], filename, { type: mime });
  }

  public loadImageFailed(): void {
    this.snack.openSnackBar('Load image is filed', 'error');
  }

  addBrand(): void {
    const image: File = this.logo;
    this.brandService.postBrand(this.brandForm.value, image).pipe().subscribe((res) => {
      this.dialogRef.close();
      this.snack.openSnackBar('Brand was added!', 'success');
    });
  }

  updateBrand(): void {
    if(this.logo) {
      this.getControl('logo').setValue(this.logo);
    }
    this.brandService.updateBrand(this.id, this.brandForm.value).subscribe((res) => {
      this.dialogRef.close();
      this.snack.openSnackBar('Brand was updated!', 'success');
    });
  }
}
