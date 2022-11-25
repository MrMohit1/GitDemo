import { Component, OnInit } from '@angular/core';
import { DbServiceService } from '../db-service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  email:any;
  name:any;
  feed:any;
  submit(){
    this.DbServiceService.feedback(this.email,this.name,this.feed).subscribe((response)=>alert(response));
    alert("Feedback send")
  }

  constructor(private DbServiceService:DbServiceService) { }

  ngOnInit(): void {
  }

}
