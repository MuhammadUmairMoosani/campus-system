import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import * as firebase from 'firebase';
class Jobs extends Component {
    constructor() {
        super();
        this.state = {
            name:'',
            website:'',
            email:'',
            phone:'',
            address:'',
            city:'',
            jobsArray:[],
            uidUsers:[],
            identiJobArray:[],
            studentName:'',
            flag:false,
            currentUserUid:'',
            currentUserEmail:''
        }
    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({currentUserUid:user.uid,currentUserEmail:user.email});
        })
     
            firebase.database().ref(`user/${this.state.currentUserUid}`).on(
                'value', snap => {
                    let name = snap.val().firstName + " " + snap.val().lastName;
                    this.setState({studentName:name})
                }
            )
      
        firebase.database().ref('user').on(
            'value', snap => {
                let TemJobArray = [];
                let name = [];
                let website = [];
                let userUid = [];
                let idJobs = [];
                let value = snap.val()
                for(let i in value) {
                    if(value[i].accountCategory !== 'student') {
                        if(value[i].jobs !== undefined) {
                             value[i].jobs.map((values,index) => {
                                 idJobs.push(index);
                                 TemJobArray.push(values)
                                 name.push(value[i].companyName)
                                 website.push(value[i].website)
                                 userUid.push(i)
                             })
                                        this.state.email = value[i].email;
                                        this.state.phone = value[i].phone;
                                        this.state.website = value[i].website;
                                        this.state.city = value[i].city;
                                        this.setState({
                                            email:this.state.email,
                                            phone:this.state.phone,
                                            address:this.state.address,
                                            address:this.state.address
                                        })
                        }
                    }
                }
                this.setState({jobsArray:TemJobArray,name:name,website:website,uidUsers:userUid,identiJobArray:idJobs})
            }
        )
    }
    jobApplyHandler(index) {
                 firebase.database().ref(`user/${this.state.uidUsers[index]}/jobs/${this.state.identiJobArray[index]}/applyStudentUid/${this.state.currentUserUid}`).on(
                     'value', snap => {
                         if(snap.val() === null) {
                             this.state.flag = true
                             this.setState({flag:this.state.flag})
                             alert('Apply successfully')
                             firebase.database().ref(`user/${this.state.uidUsers[index]}/jobs/${this.state.identiJobArray[index]}/applyStudentUid/${this.state.currentUserUid}`).set({'email':this.state.currentUserEmail,"name":this.state.studentName})
                         } else {
                              if(this.state.flag === false) {

                                  alert('you have already apply')
                              }
                         }
                         this.setState({flag:false})
                     }
                 )
    }
    displayJobs() {
        const styles= {
            cardStyle: {
                width:400,
                padding:30,
                margin:10,
            },
            cardDiv: {
                display: 'inline-block',
            }
        }
        return (
          
    this.state.jobsArray.map((value,index) => {
        return <div style={styles.cardDiv}>
                 <Card style={styles.cardStyle}>
    <CardHeader
    />
    <CardMedia
      overlay={<CardTitle title={this.state.name[index]} subtitle={this.state.website[index]} />}
    >
      <img src="images/nature-600-337.jpg" alt="" />
    </CardMedia>
    <CardTitle title={value.jobPosition} subtitle={value.education} />
    <CardText>
        <div>{console.log()}</div>
        <p>{value.experience}  Experiance</p>
        <p>{value.shift} Shift</p>
        <p>{value.salary} Salary</p>
    </CardText>
    <CardActions>
      <FlatButton label="Apply" onClick={() => {this.jobApplyHandler(index)}}/>
    </CardActions>
  </Card>
            </div>
    })

        )
    }
    render() {
         return this.displayJobs()
    }
}

export default Jobs;