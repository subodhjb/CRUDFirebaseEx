import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/customer.service';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  submitted:boolean;
  showSuccessMassage:boolean;
  formControl = this.customerService.form.controls;
  constructor(private customerService:CustomerService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.submitted=true;
    if(this.customerService.form.valid){
    if(this.customerService.form.get('$key').value == null)
      this.customerService.insertCustomer(this.customerService.form.value);
      else
       this.customerService.updateCustomer(this.customerService.form.value);
    
      this.showSuccessMassage=true;
      setTimeout( () => this.showSuccessMassage = false,3000);
      this.submitted=false;
      this.customerService.form.reset();
     
    }

  }
  
   
}
