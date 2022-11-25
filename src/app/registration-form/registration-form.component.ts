import { Component, OnInit } from '@angular/core';
import { DbServiceService } from '../db-service.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  username:any;
  password:any;

  register(){
    this.DbServiceService.registertoserver(this.username,this.password).subscribe((response)=>alert(response));
  }

  constructor(private DbServiceService:DbServiceService) { }

  ngOnInit(): void {
  }

}
