import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonService } from '../person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  allPerson$: Observable<any>;

  constructor(
    private personService: PersonService,
    private router: Router
  ) {
    this.allPerson$ = this.personService.getAllPerson();
  }

  ngOnInit() {
  }

  onPersonClick(id) {
    console.log(id);
    this.router.navigate(['person', 'edit', id]);
  }

}
