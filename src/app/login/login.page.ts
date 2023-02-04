import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpHeaders, HttpParams } from '@capacitor/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

type Patient={
	patientid: number;
	patientname:string;
	patientpassword:string;
  doctorid: number
  }
  
type Result ={
	code: number;
	msg: string;
	obj: Patient;
	count:number
  }

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  loginForm=new FormGroup({
    id:new FormControl(0),
    password:new FormControl('0000')
  });

  constructor(public httpclient: HttpClient, public router:Router) { }
  //

  ngOnInit() {
    if(localStorage.getItem('id')=='0'){
      this.router.navigate(["/home"])
    }
  }

  onSubmit(){
    const id = this.loginForm.get('id')!.value;
    const password = this.loginForm.get('password')!.value;
    console.log(id+"   "+password);
    const HTTPheaders : HttpHeaders={"Content-type": "application/json"};
		const HTTPparams : HttpParams={"patientid":id!.toString(),"patientpassword":password!};
    const options = {  headers: HTTPheaders, params: HTTPparams };
    this.httpclient.get<Result>("http://localhost:8080/patient/login",options)
    .subscribe(res=>{
    // this.http.get("http://localhost:8080/patient/login",HTTPparams,HTTPheaders)
    // .then(res=>{
      console.log(res);
      if(res.code==0){
        localStorage.clear();
        localStorage.setItem('code',res.code.toString());
        localStorage.setItem('msg',res.msg);
        localStorage.setItem('id',res.obj.patientid.toString());
        localStorage.setItem('doctorid',res.obj.doctorid.toString());
        localStorage.setItem('name',res.obj.patientname);
        console.log(localStorage.getItem('code'));
        console.log(localStorage.getItem('msg'));
        console.log(localStorage.getItem('id'));
        console.log(localStorage.getItem('doctorid'));
        console.log(localStorage.getItem('name'));
        this.router.navigate(["/home"]);
      }else{
        alert("wrong id or password")
        return
      }
    })
  }

}
