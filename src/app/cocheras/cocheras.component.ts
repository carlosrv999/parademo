import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cocheras',
  templateUrl: './cocheras.component.html',
  styleUrls: ['./cocheras.component.css']
})
export class CocherasComponent implements OnInit {
  creado: boolean = false;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let obj: {signup: boolean} = <{signup: boolean}>this.route.snapshot.queryParams;
    if(obj.signup) this.creado = true;
  }

}
