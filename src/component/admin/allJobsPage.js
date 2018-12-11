import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import * as firebase from 'firebase';
class AllJobs extends Component {
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
            flag:false
        }
    }
    componentWillMount() {
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
    jobDelete(index) {
        // if( window.confirm("Are you sure you want to 'Detele' ?") ) {
        //     this.state.jobsArray.splice(index,1)
        //    this.setState({jobsArray:this.state.jobsArray})
        //   firebase.auth().onAuthStateChanged((user) =>{
        //        firebase.database().ref(`user/${user.uid}`).update(
        //           {'jobs':this.state.jobsArray}
        //       )
        //   })
        // } 
        firebase.database().ref(`user/${this.state.uidUsers[index]}/jobs/${this.state.identiJobArray[index]}`).remove()
 
        //   console.log(this.state.uidUsers[index])
        //   console.log(index)
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

export default AllJobs;