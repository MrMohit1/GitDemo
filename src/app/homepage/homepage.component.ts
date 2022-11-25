import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  imgl="../assets/logo.png";
  img="../assets/elec1.jpg";
  img1="../assets/elec2.jpg";
  img2="../assets/elec3.jpg";
  img3="../assets/elec4.jpg";
  img4="../assets/elec5.jpg";

  constructor(private router:Router) { }
  
  products() {
   
    this.router.navigateByUrl('/products');
};


  ngOnInit(): void {
  }

}
