import { Component, OnInit } from '@angular/core';
// const mysql = require('mysql');
// const conn = mysql.createConnection({
//   host: 'localhost',
//   user: 'emma',
//   password: 'emma',
//   database: 'test'
// });
// conn.connect();
// let sql: string= 'select * from test';
// conn.query(sql, (err:any, result:any) => {
//   if (err) {
//       console.log(err);
//   } else {
//       console.log(result);
//   }
// });
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  public patientInfo:any={
    patientID:"",
    password:""
  }

  constructor() { }

  ngOnInit() {
  }

}
