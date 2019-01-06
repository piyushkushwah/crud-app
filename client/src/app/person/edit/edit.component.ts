import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonService } from '../person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, from, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  id: any;
  getSinglePerson$: Observable<any>;
  subscriptions: Subscription[] = [];

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getSinglePerson$ = this.personService.getSinglePerson(this.id)
      .pipe(catchError(res => of(res)));
  }

  onFormSubmit(form) {
    console.log(form);
    this.subscriptions.push(
      this.personService.editPerson(this.id, form.value).subscribe(data => {
        console.log(data);
        if (data['person']) {
          alert('Person Edited Successfully');
          this.router.navigate(['']);
        } else {
          alert('Person could not be edited');
        }
      })
    );
  }

  onDelete(id) {
    this.subscriptions.push(
      this.personService.deletePerson(this.id).subscribe(data => {
        if (data['person']) {
          alert('Person Deleted Successfully');
          this.router.navigate(['']);
        } else {
          alert('Person could not be deleted');
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(e => e.unsubscribe());
  }

}
