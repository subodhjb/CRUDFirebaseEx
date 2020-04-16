import { Component, OnInit } from '@angular/core';

import { CustomerService } from 'src/app/shared/customer.service';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor( private customerService:CustomerService) { }
  searchText:string="";
  showDeleteMassage:boolean;
  customerArray=[];

  ngOnInit() {
    this.customerService.getCustomers().subscribe(
      list =>{
        this.customerArray = list.map(item =>{
          return{
            $key :item.key,
            ...item.payload.val()
          };
        });
      });
  }

  onDelete($key){
  if(confirm('Are you shure to delete this record')){
  this.customerService.deleteCustomer($key);
  this.showDeleteMassage=true;
  setTimeout ( () =>this.showDeleteMassage = false,3000);
   }
  }
  filterCondition(customer){
    return customer.FullName.toLowerCase().indexOf(this.searchText.toLowerCase()) !=-1;
  }
}
