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

  public onImagePicked(event: Event): void {
    this.imageChangedEvent = event;
  }

  public imageCropped(event: ImageCroppedEvent) {
    this.logo = this.base64ToFile(
      event.base64,
      this.imageChangedEvent?.target?.files[0].name,
    );
    this.getControl('logo').setValue(this.logo);
  }

  private base64ToFile(data: any, filename: any) {
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

  public loadImageFailed() {
    console.log('Load image is filed');
  }

  addBrand(): void {
    const image: File = this.logo;
    this.brandService.postBrand(this.brandForm.value, image).pipe().subscribe((res) => {
      this.dialogRef.close();
      this.snack.openSnackBar('Product was added!', 'success');
    });
  }
}
