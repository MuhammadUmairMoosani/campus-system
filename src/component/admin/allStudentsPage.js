import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import * as firebase from 'firebase';
import Divider from 'material-ui/Divider';

class AllStudents extends Component {
    constructor() {
        super(); 
        this.state = {
            studentName:[],
            studentEmail:[],
            studentUid:[]
        }
    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
               firebase.database().ref(`user`).on(
                   'value', snap => {
                       let Sname = [];
                       let Semail = [];
                       let Suid = [];
                       let value = snap.val()
                       for(let i in value) {
                           if(value[i].accountCategory !== 'company' && value[i].accountCategory !== 'admin') {
                               let name = value[i].firstName + " " + value[i].lastName;
                               Sname.push(name)
                                 Semail.push(value[i].email)
                                 Suid.push(i)
                           } 
                       }
                       
                       this.setState({studentName:Sname,studentEmail:Semail,studentUid:Suid})
                   }
               )
        })
    }
    deleteStudent(index) {
        firebase.database().ref(`user/${this.state.studentUid[index]}`).remove()
       
    }
    render() {
        const styles = {
            listDiv: {
                width:1000,
                margin: "0 auto"
            }
        }
        return (
            <List style={styles.listDiv}> {
            this.state.studentEmail.map((value,index) => {
                return (

            <div style={{textAlign:'center'}}> 
                   
      <ListItem primaryText={this.state.studentName[index]} secondaryText={value}  />
      <FlatButton label="Delete" primary={true} onClick={() => this.deleteStudent(index)}/>
      <div><Divider/></div>
            </div>
                )
            })
        }</List>
        )
    }
}

export default AllStudents;