import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Category } from 'src/app/models/category';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-add-edit-prod-dialog',
  templateUrl: './add-edit-prod-dialog.component.html',
  styleUrls: ['./add-edit-prod-dialog.component.scss']
})
export class AddEditProdDialogComponent implements OnInit {

  prodForm!: FormGroup;
  categories!: Category[];
  types!: Category[];
  brands!: Category[];
  materials!: Category[];
  currencies: string[] = ['Euro', 'Dollar', 'Pound'];

  imageChangedEvent: any = '';
  prodImage: any;

  dialogTitle: string = 'Add';
  actionBtn: string = 'Submit';
  isEditing = false;

  constructor( private fb : FormBuilder,
    private prodService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    // private dateAdapter: DateAdapter<Date>
    ) {
      // this.dateAdapter.setLocale('en-GB');
      // this.minDate = new Date();
  }

  ngOnInit(): void {
    this.prodForm = this.fb.group({
      category: new FormControl('', Validators.required),
      type: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(70)]),
      material: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      image: new FormControl(null),
      amount: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      currency: new FormControl('Euro', Validators.required),
      productCode: new FormControl(''),
      year: new FormControl(''),
      collectionName: new FormControl('', Validators.required),
      designer: new FormControl(''),
      isOnSale: new FormControl(false, Validators.required),
      sale: new FormControl(null)
    });

    this.prodForm.get('isOnSale')?.valueChanges.subscribe( value => {
      if(value) {
        this.prodForm.get('sale')?.setValidators(Validators.required);
      }
    });

    if(this.data) {
      this.dialogTitle = 'Add';
      this.isEditing = this.data.isEditing;
      this.categories = this.data.descriptionList.categories;
      this.types = this.data.descriptionList.types;
      this.brands = this.data.descriptionList.brands;
      this.materials = this.data.descriptionList.materials;
    }
  }

  get name(){
    return this.prodForm.get('name');
  }

  get category(){
    return this.prodForm.get('category');
  }

  get isOnSale(){
    return this.prodForm.get('isOnSale');
  }

  get sale(){
    return this.prodForm.get('sale');
  }

  public onImagePicked(event: Event): void {
    this.imageChangedEvent = event;
  }

  public imageCropped(event: ImageCroppedEvent) {
    this.prodImage = this.base64ToFile(
      event.base64,
      this.imageChangedEvent?.target?.files[0].name,
    )
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

  addProduct(): void {
    const image: File = this.prodImage;
    this.prodService.postProduct(this.prodForm.value, image).subscribe((res) => {
      console.log(res);
    })
  }
}
