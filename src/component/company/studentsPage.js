import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import * as firebase from 'firebase';
import Divider from 'material-ui/Divider';

class Students extends Component {
    constructor() {
        super(); 
        this.state = {
            studentName:[],
            studentEmail:[],
     
        }
    }
    componentWillMount() {

 
               firebase.database().ref(`user`).on(
                   'value', snap => {
                       let Sname = [];
                       let Semail = [];
                       let value = snap.val()
                       for(let i in value) {
                           if(value[i].accountCategory !== 'company' && value[i].accountCategory !== 'admin') {
                               let name = value[i].firstName + " " + value[i].lastName;
                               Sname.push(name)
                                 Semail.push(value[i].email)
                           } 
                       }
                       this.setState({studentName:Sname,studentEmail:Semail})
                   }
               )
      
    }
    studentDelete() {

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

            <div> 
                   
      <ListItem primaryText={this.state.studentName[index]} secondaryText={value} style={{textAlign:'center'}} />
      <div><Divider /></div>
      
            </div>
                )
            })
        }</List>
        )
    }
}

export default Students;