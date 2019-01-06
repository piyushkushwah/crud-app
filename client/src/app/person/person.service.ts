import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  backendURL = 'https://crud-app-piyush.herokuapp.com/api/';

  constructor(
    private http: HttpClient
  ) {}

  getAllPerson() {
    return this.http.get(this.backendURL + 'person');
  }

  getSinglePerson(id) {
    return this.http.get(this.backendURL + 'person/' + id);
  }

  createNewPerson(data) {
    return this.http.post(this.backendURL + 'person', data);
  }

  editPerson(id, data) {
    return this.http.put(this.backendURL + 'person/' + id, data);
  }

  deletePerson(id) {
    return this.http.delete(this.backendURL + 'person/' + id);
  }
}
