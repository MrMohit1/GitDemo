import { Component } from '@angular/core';
import { BehaviourSubjectService } from './behaviour-subject.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
 Flag:any;
 isAdmin:boolean=false;

 constructor(private BehaviourSubjectService:BehaviourSubjectService ){}

  title = 'finalproject';

  ngOnInit(): void {
  
    this.BehaviourSubjectService.TelecastUser.subscribe((isAdmin)=>{
      console.log(isAdmin);
      this.isAdmin=isAdmin;
    })

    this.Flag = localStorage.getItem("isAdmin");
  
    if(this.Flag == "true"){
      this.isAdmin = true;
       //this.Router.navigate(['/admin-dashboard'])
    }
    else{
      this.isAdmin = false;
    }
  }
}
