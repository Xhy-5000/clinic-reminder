import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpParams } from '@capacitor/core';
import { RefresherCustomEvent } from '@ionic/angular';

// import { DataService, Message } from '../services/data.service';

type Reminder={
  reminderid:number,
  doctorid:number,
  patientid:number,
  patientname:string,
  detail:string,
  isfinished:number,
  posttime:string,
  existtime:number,
  priority:string
}
type Result ={
	code: number;
	msg: string;
	obj: Reminder[];
	count:number
  }


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  constructor(public httpclient: HttpClient,public router: Router) { }
  reminders:Reminder[] = [];
  ngOnInit(): void {
    if(localStorage.getItem('code')!='0'){
      localStorage.clear();
      this.router.navigate(["/login"]);
    }
    console.log(localStorage.getItem('id'));
    const HTTPheaders : HttpHeaders={"Content-type": "application/json"};
		const HTTPparams : HttpParams={"patientid":localStorage.getItem('id')!};
    const options = {  headers: HTTPheaders, params: HTTPparams };
    this.httpclient.get<Result>("http://localhost:8080/patient/show",options)
    .subscribe(res=>{
      console.log(res);
      // return res.obj!;
      this.reminders=res.obj;
      
    });
    let timer = setInterval(()=> {
      this.ngOnInit();
      //you can stop the interval if you don't need it anymore
      clearInterval(timer)
    }, 10*1000); 
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 30);
  }
  openDetails(id:number){
    this.router.navigate(["message",id]);
  }
  logout(){
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

}
