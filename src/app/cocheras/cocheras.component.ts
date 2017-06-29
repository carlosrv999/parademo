import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cocheras',
  templateUrl: './cocheras.component.html',
  styleUrls: ['./cocheras.component.css']
})
export class CocherasComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
