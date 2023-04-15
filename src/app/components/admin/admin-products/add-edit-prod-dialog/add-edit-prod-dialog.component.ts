import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product-service/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Category, Type } from 'src/app/models/products/category.interface';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Brand } from 'src/app/models/products/brand.interface';
import { take } from 'rxjs';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { SnackBarService } from 'src/app/services/snack-bar-service/snack-bar.service';
import { ProductCard } from 'src/app/models/products/product-card.interface';

@Component({
  selector: 'app-add-edit-prod-dialog',
  templateUrl: './add-edit-prod-dialog.component.html',
  styleUrls: ['./add-edit-prod-dialog.component.scss']
})
export class AddEditProdDialogComponent implements OnInit {

  prodForm!: FormGroup;
  
  categories!: Category[];
  types: Type[] = [];
  brands: Brand[] = [];

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
      this.brands = this.data.brands;
      if(this.isEditing){
        this.dialogTitle = 'Edit';
        this.getControl('category').setValue(this.data.product.category);
        this.getControl('type')?.setValue(this.data.product.type);
        this.getControl('brand')?.setValue(this.data.product.brand);
        this.getControl('collectionName')?.setValue(this.data.product.additionalInfo.collectionName);
        this.getControl('materials')?.setValue(this.data.product.additionalInfo.materials);
        this.getControl('shape')?.setValue(this.data.product.additionalInfo.shape);
        this.getControl('extras')?.setValue(this.data.product.additionalInfo.extras);
        this.getControl('image')?.setValue(this.data.product.imagePath);
        this.getControl('amount')?.setValue(this.data.product.total);
        this.getControl('price')?.setValue(this.data.product.price.amount);
        this.getControl('currency')?.setValue(this.data.product.price.currency);
        this.getControl('productCode')?.setValue(this.data.product.additionalInfo.productCode);
        this.getControl('year')?.setValue(this.data.product.additionalInfo.year);
        this.getControl('designer')?.setValue(this.data.product.additionalInfo.designer);
        this.getControl('isOnSale')?.setValue(this.data.product.additionalInfo.isOnSale);
        this.getControl('sale')?.setValue(this.data.product.additionalInfo.sale);
        this.id = this.data.product.id;
      }
    }
  }

  public initForm(): void {
    this.prodForm = this.fb.group({
      category: new FormControl('', Validators.required),
      type: new FormControl({value:'', disabled: true}, [Validators.required, Validators.minLength(2), Validators.maxLength(70)]),
      brand: new FormControl('', Validators.required),
      collectionName: new FormControl('', Validators.required),
      materials: new FormControl({value:[], disabled: true}, Validators.required),
      shape: new FormControl({value:'', disabled: true}, Validators.required),
      extras: new FormControl({value:[], disabled: true}, Validators.required),
      image: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      currency: new FormControl('Euro', Validators.required),
      productCode: new FormControl(''),
      year: new FormControl(''),
      designer: new FormControl(''),
      isOnSale: new FormControl(false),
      sale: new FormControl(null)
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

  inputValid(control: string): string {
    return this.getControl(control).value ? 'select-with-value' : '';
  }

  private getCategoryTypes(category: string): void {
    const selected = this.categories.find( el => el.name === category );
    const id = selected?.id;
    if(typeof id === 'string') {
      this.categoryService.getCategoryById(id).pipe(take(1)).subscribe( res => {
        this.types = res.data.type;
        this.getControl('type').enable();
      })
    }
  }

  private getArraysByType(type: string): void {
    const selectedType = this.types.filter((el: any) => el.typeName === type);
    if(selectedType[0]) {
      this.materials = selectedType[0].materials;
      this.shapes = selectedType[0].shapes;
      this.extras = selectedType[0].extras;
      this.getControl('materials').enable();
      this.getControl('shape').enable();
      this.getControl('extras').enable();
    }
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
    this.prodService.postProduct(this.prodForm.value, image).pipe().subscribe((res) => {
      this.dialogRef.close();
      this.snack.openSnackBar('Product was added!', 'success');
    });
  }

  updateProduct(): void {
    this.prodService.updateProduct(this.id, this.prodForm.value).subscribe((res) => {
      this.dialogRef.close();
      this.snack.openSnackBar('Product was updated!', 'success');
    });
  }
}
