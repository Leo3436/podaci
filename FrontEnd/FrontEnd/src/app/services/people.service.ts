import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  //function that get's all the people from the database and puts them in an array
  getAllPeople(): Observable<Person[]>{
      return this.http.get<Person[]>(this.baseApiUrl + '/api/people');
  }

  //function that saves a "person" into the database
  addPersonToDb(person: Person): Observable<Person>{
    return this.http.post<Person>(this.baseApiUrl + '/api/people', person);
  }
}
