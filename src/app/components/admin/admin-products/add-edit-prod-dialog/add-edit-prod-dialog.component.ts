import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Category } from 'src/app/models/category';

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
  currencies: string[] = ['Euro', 'Dollar', 'Pound'];

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
      name: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(70)]),
      category: new FormControl('', Validators.required),
      type: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(70)]),
      image: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      amount: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      currency: new FormControl('', Validators.required),
      productCode: new FormControl(''),
      year: new FormControl(''),
      collection: new FormControl(''),
      designer: new FormControl(''),
      onSale: new FormControl(false, Validators.required),
    });

    if(this.data) {
      this.dialogTitle = 'Add';
      this.isEditing = this.data.isEditing;
      this.categories = this.data.descriptionList.categories;
      this.types = this.data.descriptionList.types;
      this.brands = this.data.descriptionList.brands;
    }

    this.getCategories();
  }

  get name(){
    return this.prodForm.get('name');
  }

  get category(){
    return this.prodForm.get('category');
  }

  getCategories(): any {

  }
}
