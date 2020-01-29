import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { datamodel } from '../data-model';
import { fullInfomodel } from '../fullInfo-model';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  modalData : fullInfomodel;
  userinput : string = "";
  apikey : string = "14348b24";
  response : datamodel[];
  constructor(private http : HttpClient) { }

  ngOnInit() {
    this.modalData = new fullInfomodel();
  }

  search(){
    this.http.get(`https://www.omdbapi.com/?apikey=${this.apikey}&s=${this.userinput}`)
    .subscribe( (res : any) => {      
      this.response = res.Search as datamodel[];
      console.log(this.response);
      if((this.response === undefined))
      {
        this.response = null;
        document.getElementById("NoMovies").innerHTML = "No movie or series found";
      }
      else {
        document.getElementById("NoMovies").innerHTML = "";
      }
    });
  }

  getFullInformation(imdbID : string)
  {
    this.http.get(`https://www.omdbapi.com/?apikey=${this.apikey}&i=${imdbID}`)
    .subscribe( (res : any) => {this.modalData = res as fullInfomodel});
  }

  resetModal()
  {
    this.modalData = null;
  }
}

