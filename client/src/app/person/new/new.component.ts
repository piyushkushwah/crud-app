import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonService } from '../person.service';
import { Subscription } from 'rxjs';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit, OnDestroy {

  id: any;

  subscriptions: Subscription[] = [];

  constructor(
    private personService: PersonService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  onFormSubmit(form) {
    console.log(form);
    this.subscriptions.push(
      this.personService.createNewPerson(form.value).subscribe(data => {
        console.log(data);
        if (data['person']) {
          alert('Person Created Successfully');
          this.router.navigate(['']);
        } else {
          alert('Person could not be created');
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(e => e.unsubscribe());
  }

}
