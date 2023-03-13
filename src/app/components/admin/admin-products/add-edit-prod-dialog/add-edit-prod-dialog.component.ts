import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Category } from 'src/app/models/category';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CategoryService } from 'src/app/services/category.service';
import { map, take } from 'rxjs';
import { CategoryRes } from 'src/app/models/category-res';

@Component({
  selector: 'app-add-edit-prod-dialog',
  templateUrl: './add-edit-prod-dialog.component.html',
  styleUrls: ['./add-edit-prod-dialog.component.scss']
})
export class AddEditProdDialogComponent implements OnInit {

  prodForm!: FormGroup;
  categories!: Category[];
  types: Category[] = [
    { id: '111', name: 'Chair'}
  ];

  brands: Category[] = [
    {id: '111', name: 'Flexform'}
  ];

  materials: Category[] = [
    {id: '111', name: 'Wood'}
  ];

  currencies: string[] = ['Euro', 'Dollar', 'Pound'];

  imageChangedEvent: any = '';
  prodImage: any;
  editImage: string = '';

  dialogTitle: string = 'Add';
  actionBtn: string = 'Submit';
  isEditing = false;
  id: string = '';

  constructor( private fb : FormBuilder,
    private prodService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    // private dateAdapter: DateAdapter<Date>
    ) {
      // this.dateAdapter.setLocale('en-GB');
      // this.minDate = new Date();
  }

  ngOnInit(): void {
    this.getCategories();
    this.prodForm = this.fb.group({
      category: new FormControl('', Validators.required),
      type: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(70)]),
      brand: new FormControl('', Validators.required),
      collectionName: new FormControl('', Validators.required),
      material: new FormControl('', Validators.required),
      image: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      currency: new FormControl('Euro', Validators.required),
      productCode: new FormControl(''),
      year: new FormControl(''),
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
      this.isEditing = this.data.isEditing;
      if(this.isEditing){
        console.log(this.data);
        this.dialogTitle = 'Edit';
        this.prodForm.get('category')?.setValue(this.data.product.category);
        this.prodForm.get('type')?.setValue(this.data.product.type);
        this.prodForm.get('brand')?.setValue(this.data.product.brand);
        this.prodForm.get('collectionName')?.setValue(this.data.product.collectionName);
        this.prodForm.get('material')?.setValue(this.data.product.material);
        this.prodForm.get('image')?.setValue(this.data.product.image);
        this.prodForm.get('amount')?.setValue(this.data.product.amount);
        this.prodForm.get('price')?.setValue(this.data.product.price);
        this.prodForm.get('currency')?.setValue(this.data.product.currency);
        this.prodForm.get('isOnSale')?.setValue(this.data.product.isOnSale);
        this.editImage = this.data.product.imagePath;
        this.id = this.data.product.id;
      }
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

  updateProduct(): void {
    this.prodService.updateProduct(this.id, this.prodForm.value).subscribe((res) => {
      console.log(res);
    })
  }
}
