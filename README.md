# Problem we are going to solve

You are going to implement a clinic reminder system which helps doctor and patient manage their clinical reminders. A clinical reminder is an instruction doctor post to patient. The instruction could be "eat medicine A in 3 hours" or "take exercise for 1 hour today". There will be a dashboard (**Doctor Dashboard**) used by doctor to post these instructions to patients and the patient will get notifications on their mobile app (**Patient App**). Once the patient finish the reminder, they can mark them as 'done' in their app and doctor could see these update in realtime on their dashboard. For details, see it in the next section


# Sub Systems 
* Patient App
* Doctor Dashbaord
* RESTful Backend


## Patient App
#### Things you need to implement: 
* There is a page let user login by a username and password (you don't need to implement the register function, we can create username and password from database)
* There is a page (**Reminder List Page**) which list all reminders you receive order by the time it was created. 
   * The list will update in real-time (e.g. when doctor post a reminder on Docotr Dashboard, the list on patient should be updated with the newest reminder)
   * When patient's mobile phone is inactive (e.g. when the screen is lock), try to push a notification to patient's mobile phone. When they click the notification, your app will be opened and go to the **Reminder List Page** 
   * you can mark the reminder as "done" from this list and **Doctor Dashboard** will also update after you do this


#### Constraints:
* use ionic 5 to develope this mobile app 
* you have to run your app on your phone not browser

#### Hint:
* to get notification from doctor dashboard, you can use Websocket to do it

## Doctor Dashboard
#### Things you need to implement: 
* A page to let doctor login (again, no need for registration)
* A page which can let doctor post reminder to patient. A reminder will have:
  * a description text for what doctor wants the patient to do 
  * a duration time which indicates in how many hours should the patient finish this instrcution from now.
  * a priority level which has three value: "HIGH", "MIDDLE","LOW"
* A page (**Reminder List Page**) to show a table which lists status of reminders for all the patients for a doctor.
  * the table will have 4 columns: "Patient Name", "High Priority Reminder (Unfinished Count)","Middle Priority Reminder (Unfinished Count)", "Low Priority Reminder (Unfinished Count)", for the last 3 columns, they will show the unfinished count for each reminder priority level.
  * the table should be ordery by the unfinished count of reminder for different priority level in descend order. The record should first be sort by "High Priority Reminder (Unfinished Count)" in descend order, then by "Middle Priority Reminder (Unfinished Count)" in descend order, then by "Low Priority Reminder (Unfinished Count)" in descend order
* A page (**History Reimder Page**) to show a barchart for a given patient, for the last 7 days, in each day, how many reminders he didn't finish on-time. For a given reminder, we use its creation time to decide which day it belongs to. (e.g. if a reminder create at 11pm at 05/05/2018 and should be done in 24h, it should belong to 05/05/2018). 
  * you will click the row in **Reminder List Page** to navigate to this page


#### Constraint
* you need to use angular 11 to finish this part
* consider we will have 200,00 patient and 5,00 doctors,for each patient, there will be at most 20 reminders for one patient each day, when we show the **Reminder List Page** and **History Reimder Page**, it might be very slow if we do the aggregation in realtime. So you'd better to implement a pre-aggregation way to overcome this problem. 


## RESTful Backend
#### Things you need to implement: 
For the backend, it's just implement all the functions your frontend and moblie app needs. 

#### Constraint
* You need to use Spring MVC (use Spring Boot+Spring JPA Data+Spring MVC, not purely Spring MVC) to implement the RESTful API
* You can use MySQL or Postgres database to store the data (I suggest to use sqlite since it's much easier)
* populate mock data for database
  * 20,000 patients and 500 doctors mock data (you can name them as "doctor1", "doctor2", "patient1", "patient2"), each doctor will have 40 patients with them
  * pick 1 docter, generate reminders for all his patient for the last 15 days, each day there will be 10 to 20 reminders for each patient. The duration time and start time for each reminder can be random, the duration time will be at most 48 hours.
 
#### Hint
* to let your mobile app to use your backend, you might need to deploy your backend to a server (You can choose AWS, heroku or your own server). Here is a tutorial for you to deploy a Spring MVC backend to [heroku](https://devcenter.heroku.com/articles/deploying-spring-boot-apps-to-heroku) 
  
# Other requirements

Since this is not a quite easy problem, you will have 1 weeks to finish it. Also if you can't finish all the system, try to implement as much as you can. If you have any questions, leave a comment below this gist, I will answer you here, so everyone could see it. If you can finish them earlier, please contact Andi and let him knows, this will be a bonus! Once you finish it, prepare everything ready for demo and we will review it through a zoom conference. Also, upload your code to a public available github repository so we could review the code. 
