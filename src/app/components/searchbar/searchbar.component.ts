import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  text: string;

  @Output() output = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search(): void {
    this.router.navigate(['/search/'+this.text]);
    this.output.emit();
  }

}
