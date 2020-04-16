import { Injectable } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';

export class CustomerService {
   

  constructor(private firebase:AngularFireDatabase) { }
  customerList :AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl(null),
    FullName : new FormControl('',Validators.required),
    Email : new FormControl('',Validators.email),
    Mobile : new FormControl('',[Validators.required,Validators.minLength(8)]),
    Location :new FormControl('',Validators.required)
  });

  getCustomers(){
    this.customerList=this.firebase.list('customer');
    return this.customerList.snapshotChanges();
  }
   
  insertCustomer(customer){
    this.customerList.push({
      FullName :customer.FullName ,
      Email :customer.Email,
      Mobile :customer.Mobile,
      Location : customer.Location

    });
  }


  populateForm(customer){
    this.form.setValue(customer);
  }

  updateCustomer(customer){
    this.customerList.update(customer.$key,
      {
      FullName :customer.FullName ,
      Email :customer.Email,
      Mobile :customer.Mobile,
      Location : customer.Location

    });
  }


  deleteCustomer($key:string){
    this.customerList.remove($key);
  }
}
