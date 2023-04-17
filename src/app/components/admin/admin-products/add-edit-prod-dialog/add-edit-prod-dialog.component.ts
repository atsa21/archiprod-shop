import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product-service/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Category, CategoryType } from 'src/app/models/products/category.interface';
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
  types: CategoryType[] = [];
  brands: Brand[] = [];

  materials: string[] = [];
  shapes: string[] = [];
  extras: string[] = [];

  currencies: string[] = ['Euro', 'Dollar', 'Pound'];
  units: string[] = ['mm', 'cm'];

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
        const product: ProductCard = this.data.product;
        this.getControl('category').setValue(product.category);
        this.getControl('type').setValue(this.data.product.type);
        this.getControl('image').setValue(this.data.product.imagePath);
        this.getControl('brand').setValue(product.brand);

        this.getControl('dimensions.height').setValue(product.dimensions.height);
        this.getControl('dimensions.width').setValue(product.dimensions.width);
        this.getControl('dimensions.depth').setValue(product.dimensions.depth);
        this.getControl('dimensions.diameter').setValue(product.dimensions.diameter);
        this.getControl('dimensions.measurementUnits').setValue(product.dimensions.measurementUnits);

        this.getControl('price.fullPrice').setValue(product.price.fullPrice);
        this.getControl('price.currency').setValue(product.price.currency);
        this.getControl('price.isOnSale').setValue(product.price.isOnSale);
        this.getControl('price.discount').setValue(product.price.discount);

        this.getControl('details.collectionName').setValue(product.details.collectionName);
        this.getControl('details.shape').setValue(this.data.product.details.shape);
        this.getControl('details.materials').setValue(this.data.product.details.materials);
        this.getControl('details.extras').setValue(this.data.product.details.extras);
        this.getControl('details.productCode').setValue(product.details.productCode);
        if(product.details.year) {
          this.getControl('details.year').setValue(product.details.year);
        }

        this.getControl('inStock').setValue(product.inStock);
        this.id = product.id as string;
      }
    }
  }

  public initForm(): void {
    this.prodForm = this.fb.group({
      category: new FormControl('', Validators.required),
      type: new FormControl({value:'', disabled: true}, [Validators.required, Validators.minLength(2), Validators.maxLength(70)]),
      image: new FormControl(null, Validators.required),
      brand: new FormControl('', Validators.required),
      dimensions : this.fb.group({
        height: new FormControl(null, Validators.required),
        width: new FormControl(null),
        depth: new FormControl(null),
        diameter: new FormControl(null),
        measurementUnits: new FormControl('mm', Validators.required),
      }),
      price: this.fb.group({
        fullPrice: new FormControl(null, Validators.required),
        currency: new FormControl('Euro', Validators.required),
        isOnSale: new FormControl(false, Validators.required),
        discount: new FormControl(null),
        discountedPrice: new FormControl(null)
      }),
      details: this.fb.group({
        collectionName: new FormControl('', Validators.required),
        shape: new FormControl({value:'', disabled: true}, Validators.required),
        materials: new FormControl({value:[], disabled: true}, Validators.required),
        extras: new FormControl({value:[], disabled: true}, Validators.required),
        productCode: new FormControl('', Validators.required),
        year: new FormControl(null),
      }),
      inStock: new FormControl(null, Validators.required)
    });

    this.getControl('category').valueChanges.subscribe( selectedValue => {
      if(selectedValue) {
        this.getCategoryTypes(selectedValue);
        this.resetDetails();
      }
    });
    this.getControl('type').valueChanges.subscribe( selectedValue => {
      if(selectedValue) {
        this.getArraysByType(selectedValue);
      }
    })
  }

  getControl(control: string): AbstractControl {
    const formControl = this.prodForm.get(control);
    return formControl!;
  }

  resetDetails(): void {
    this.getControl('details.shape').setValue('');
    this.getControl('details.materials').setValue([]);
    this.getControl('details.extras').setValue([]);

    this.getControl('details.shape').disable();
    this.getControl('details.materials').disable();
    this.getControl('details.extras').disable();
  }

  getCategoryTypes(category: string): void {
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
      this.getControl('details.shape').enable();
      this.getControl('details.materials').enable();
      this.getControl('details.extras').enable();
    }
  }

  getDescountedPrice(discount: number): number {
    const fullPrice = this.getControl('price.fullPrice').value;
    const discountInAmount = (fullPrice / 100) * discount;
    const finalPrice = Math.round(fullPrice - discountInAmount);
    this.getControl('price.discountedPrice').setValue(finalPrice);
    return finalPrice;
  }

  onImagePicked(event: Event): void {
    this.imageChangedEvent = event;
    this.getControl('image').setValue(this.imageChangedEvent);
  }

  imageCropped(event: ImageCroppedEvent) {
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
    this.snack.openSnackBar('Load image is filed', 'error');
  }

  addProduct(): void {
    const image: File = this.prodImage;
    this.prodService.postProduct(this.prodForm.value, image).pipe().subscribe((res) => {
      this.dialogRef.close();
      this.snack.openSnackBar('Product was added!', 'success');
    });
  }

  updateProduct(): void {
    if(this.prodImage) {
      this.getControl('image').setValue(this.prodImage);
    }
    this.prodService.updateProduct(this.id, this.prodForm.value).subscribe((res) => {
      this.dialogRef.close();
      this.snack.openSnackBar('Product was updated!', 'success');
    });
  }
}
