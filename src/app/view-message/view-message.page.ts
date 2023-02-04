import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders, HttpParams } from '@capacitor/core';

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
	obj: Reminder;
	count:number
  }

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.page.html',
  styleUrls: ['./view-message.page.scss'],
})
export class ViewMessagePage implements OnInit {
  // public message!: Message;
  public reminder!:Reminder;

  constructor(
    public httpclient: HttpClient,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    const HTTPheaders : HttpHeaders={"Content-type": "application/json"};
		const HTTPparams : HttpParams={"reminderid":id};
    const options = {  headers: HTTPheaders, params: HTTPparams };
    this.httpclient.get<Result>("http://localhost:8080/patient/detail",options)
    .subscribe(res=>{
      console.log(res);
      this.reminder = res.obj;
    });
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }
  onClick(){
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    const nHTTPheaders : HttpHeaders={"Content-type": "application/json"};
		const nHTTPparams : HttpParams={"reminderid":id};
    const noptions = {  headers: nHTTPheaders, params: nHTTPparams };
    this.httpclient.get<Result>("http://localhost:8080/patient/finish",noptions)
    .subscribe(res=>{
      console.log(res);
      this.reminder = res.obj;
      this.router.navigate(["home"]);
    });
  }
}
