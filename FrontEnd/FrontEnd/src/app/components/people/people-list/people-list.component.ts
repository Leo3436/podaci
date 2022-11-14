import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { PeopleService } from 'src/app/services/people.service';
import { HttpClient } from '@angular/common/http';
import {Papa} from 'ngx-papaparse';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {

  people: Person[] = [];
  
  constructor(private peopleService: PeopleService, private papa: Papa, private http: HttpClient) { }

  ngOnInit(): void {
  }
  
  // parses the csv file and puts the entries in an array "People"
  readCsv():void {
    var resultFile = this.http.get('/assets/podaci.csv', {responseType: 'text'}).subscribe(file => {
      file.split(/[\r\n]+/).forEach(line => {
        this.papa.parse(line, {
          complete: (result) => {

            const newPerson: Person = {
              name: result.data[0][0],
              surname: result.data[0][1],
              zipCode: result.data[0][2],
              city: result.data[0][3],
              phoneNumber: result.data[0][4]
            };

            this.people.push(newPerson);
            
          }
        });
      });
    });
  }

  // adds all people from the table into the database
  addPeopleToDb(){
    var arrayLength = this.people.length;
    if(arrayLength == 0){
      var alertParagraph = document.getElementById("alertParagraph");
      
      if(alertParagraph != null){
        alertParagraph.innerHTML = "Prije spremanja u bazu, podatke treba unijeti u tablicu. Klikni na gumb &quot;Učitaj&quot;.";
        alertParagraph.className = "alert alert-danger";
      }
    }

    for(var i = 0; i < arrayLength; i++){
      this.addPersonToDb(this.people[i]);
    }
    var otherAlertParagraph = document.getElementById("otherAlertParagraph");
    if(otherAlertParagraph != null){
      otherAlertParagraph.innerHTML = "Svi točni podaci osim duplikata su spremljeni u bazu.";
      otherAlertParagraph.className = "alert alert-success";
    }
  }


  //adds a person to the database 
  addPersonToDb(person: Person){
    this.peopleService.addPersonToDb(person)
    .subscribe({
      next: (person) => {
        console.log(person);
      }
    });
  }


  


    
  // returns true if a Person has an error in the zipCode property
  hasError(person: Person):boolean{
    if(isNaN(person.zipCode)){
      return true;
    }else{
      return false;
    }
  }
  

}

