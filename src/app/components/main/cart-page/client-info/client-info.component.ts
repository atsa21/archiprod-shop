import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent implements OnInit {

  orderForm!: FormGroup;

  center: google.maps.LatLngLiteral = {
    lat: 50.450001,
    lng: 30.523333
  };
  display: any;
  inputOptions: Options = new Options({componentRestrictions: { country: 'UA' }});
  mapOptions: google.maps.MapOptions = {
    center: this.center,
    zoom: 10,
    mapTypeControl: false,
  };

  @Output() orderEmitter = new EventEmitter<any>();

  constructor( private fb : FormBuilder) {}

  ngOnInit(): void {
      this.initForm();
  }

  initForm(): void {
    this.orderForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(70)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      comment: new FormControl('', [Validators.maxLength(256)]),
      address: new FormControl('', Validators.required)
    });
    this.orderForm.statusChanges.subscribe(() => {
      this.orderEmitter.emit(this.orderForm);
    })
  }

  getControl(controlName: string): AbstractControl {
    const formControl = this.orderForm.get(controlName);
    return formControl!;
  }

  getIsControlInvalid(controlName: string): boolean {
    return this.getControl(controlName).touched && this.getControl(controlName).invalid;
  }

  moveMap(event: google.maps.MapMouseEvent): void {
    if (event.latLng != null) {
      this.center = (event.latLng.toJSON());
    };
  }

  move(event: google.maps.MapMouseEvent): void {
    if (event.latLng != null) {
      this.display = event.latLng.toJSON();
    } 
  }

  onChangedMapMarker(event: any): void {
    this.center.lat = event.latLng.lat();
    this.center.lng = event.latLng.lng();
    this.getAddress(this.center.lat, this.center.lng);
  }

  onAddressChange(address: Address): void {
    this.center = {
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng()
    };
    this.getControl('address').setValue(address.formatted_address);
  }

  getAddress(lat: any, lng: any): void {
    const searchLocation = {
      location: { 
        lat: lat, 
        lng: lng 
      }
    };
    const googleGeocoder = new google.maps.Geocoder();
    googleGeocoder.geocode(searchLocation, (res) => {
      if(res) {
        this.getControl('address').setValue(res[0].formatted_address);
      }
    })
  }
}
