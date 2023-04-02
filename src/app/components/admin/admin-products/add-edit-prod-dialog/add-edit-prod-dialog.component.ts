import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product-service/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Category, Type } from 'src/app/models/category';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Brand } from 'src/app/models/brand.interface';
import { take } from 'rxjs';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { SnackBarService } from 'src/app/services/snack-bar-service/snack-bar.service';

@Component({
  selector: 'app-add-edit-prod-dialog',
  templateUrl: './add-edit-prod-dialog.component.html',
  styleUrls: ['./add-edit-prod-dialog.component.scss']
})
export class AddEditProdDialogComponent implements OnInit {

  prodForm!: FormGroup;
  categories!: Category[];
  types: Type[] = [];

  brands: Brand[] = [
    {id: '1', name: 'Flexform', country: 'Italy', website: 'http//:', logo: ''},
    {id: '2', name: 'Gaudi', country: 'Italy', website: 'http//:', logo: ''}
  ];

  materials: string[] = [];
  shapes: string[] = [];
  extras: string[] = [];

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
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddEditProdDialogComponent>,
    private snack: SnackBarService
    ) {
  }

  ngOnInit(): void {
    this.initForm();
    if(this.data) {
      this.isEditing = this.data.isEditing;
      this.categories = this.data.categories;
      if(this.isEditing){
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

  public initForm(): void {
    this.prodForm = this.fb.group({
      category: new FormControl('', Validators.required),
      type: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(70)]),
      brand: new FormControl('', Validators.required),
      collectionName: new FormControl('', Validators.required),
      material: new FormControl('', Validators.required),
      shape: new FormControl('', Validators.required),
      extras: new FormControl('', Validators.required),
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

    this.getControl('isOnSale').valueChanges.subscribe( value => {
      if(value) {
        this.prodForm.get('sale')?.setValidators(Validators.required);
      }
    });
    this.getControl('category').valueChanges.subscribe( selectedValue => {
      this.getCategoryTypes(selectedValue);
    });
    this.getControl('type').valueChanges.subscribe( selectedValue => {
      this.getArraysByType(selectedValue);
    })
  }

  public getControl(control: string): AbstractControl {
    const formControl = this.prodForm.get(control);
    return formControl!;
  }

  private getCategoryTypes(category: string): void {
    const selected = this.categories.find( el => el.name === category );
    const id = selected?.id;
    if(typeof id === 'string') {
      this.categoryService.getCategoryById(id).pipe(take(1)).subscribe( res => {
        this.types = res.data[0].type;
      })
    }
  }

  private getArraysByType(type: string): void {
    const selectedType = this.types.filter((el: any) => el.typeName === type);
    this.materials = selectedType[0].materials;
    this.shapes = selectedType[0].shapes;
    this.extras = selectedType[0].extras;
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
      this.dialogRef.close();
      this.snack.openSnackBar('Product was added!', 'success');
    })
  }

  updateProduct(): void {
    this.prodService.updateProduct(this.id, this.prodForm.value).subscribe((res) => {
      this.dialogRef.close();
      this.snack.openSnackBar('Product was updated!', 'success');
    })
  }
}
