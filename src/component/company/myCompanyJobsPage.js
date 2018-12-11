import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import * as firebase from 'firebase';
class MyCompanyJobs extends Component {
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
            appliesArray:[],
          
        }
    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            firebase.database().ref(`user/${user.uid}`).on(
                'value', snap => {
                    this.state.name = snap.val().companyName;
                    this.state.website = snap.val().website;
                    this.state.email = snap.val().email;
                    this.state.phone = snap.val().phone;
                    this.state.address = snap.val().address;
                    this.state.city = snap.val().city;
                    this.setState({
                        name:this.state.name,
                        website:this.state.website,
                        email:this.state.email,
                        phone:this.state.phone,
                        address:this.state.address,
                        city:this.state.city
                    })
                    if(snap.val().jobs !== undefined) {
                        this.state.jobsArray = Object.values(snap.val().jobs)
                        this.setState({jobsArray:this.state.jobsArray})
                    }
                }
            )
        })
    }
    jobDelete(index) {
       if( window.confirm("Are you sure you want to 'Detele' ?") ) {
           this.state.jobsArray.splice(index,1)
          this.setState({jobsArray:this.state.jobsArray})
         firebase.auth().onAuthStateChanged((user) =>{
              firebase.database().ref(`user/${user.uid}`).update(
                 {'jobs':this.state.jobsArray}
             )
         })
       } 
         
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
            },
            apply: {
                backgroundColor: '#F1F2F3',
                padding:3,
                margin:3,
                borderWidth:200,
                textAlign:'center'
            },
            applyDiv: {
                height:100,
                overflow:'scroll',
            }
        }
        let temApplerDis = []
        return (
    this.state.jobsArray.map((value,index) => {
        if(value.applyStudentUid !== undefined) {
            temApplerDis.push(Object.values(value.applyStudentUid))
        } else {temApplerDis.push([])}
        return <div style={styles.cardDiv}>
                 <Card style={styles.cardStyle}>
    <CardHeader
    />
    <CardMedia
      overlay={<CardTitle title={this.state.name} subtitle={this.state.website} />}
    >
      <img src="images/nature-600-337.jpg" alt="" />
    </CardMedia>
    <CardTitle title={value.jobPosition} subtitle={value.education} />
    <CardText>
        {temApplerDis[index].length !== 0 ?    <div style={styles.applyDiv}>{temApplerDis[index].map((value) => {
            return <div style={styles.apply}>
                <p>{value.email}</p> 
                <p>{value.name}}</p>
            </div>    
        })}</div>: ''} 


     
        <p>{value.experience}  Experiance</p>
        <p>{value.shift} Shift</p>
        <p>{value.salary} Salary</p>
    </CardText>
    <CardActions>
      <FlatButton label="Delete" onClick={() => this.jobDelete(index)}/>
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

export default MyCompanyJobs;