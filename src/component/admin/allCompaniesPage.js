import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import * as firebase from 'firebase';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
class AllCompanies extends Component {
    constructor() {
        super(); 
        this.state = {
            companyName:[],
            companyEmail:[],
            companyWeb:[],
            companyUid:[]
        }
    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
               firebase.database().ref(`user`).on(
                   'value', snap => {
                       let Cname = [];
                       let Cemail = [];
                       let Cweb = [];
                       let Cuid = [];
                       let value = snap.val()
                       for(let i in value) {
                           if(value[i].accountCategory !== 'student' && value[i].accountCategory !== 'admin') {
                               Cname.push(value[i].companyName)
                                 Cemail.push(value[i].email)
                                  Cweb.push(value[i].website)
                                  Cuid.push(i)
                           } 
                       }
                       this.setState({companyName:Cname,companyEmail:Cemail,companyWeb:Cweb,companyUid:Cuid})
                   }
               )
        })
    }
    companyDelete(index) {
        firebase.database().ref(`user/${this.state.companyUid[index]}`).remove()
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
            this.state.companyEmail.map((value,index) => {
                return (

            <div style={{textAlign:'center'}}> 
                   
      <ListItem primaryText={this.state.companyName[index]} secondaryText={'Email: ' + value + " " + 'Website: ' + this.state.companyWeb[index]}   />
      <FlatButton label="Delete" primary={true} onClick={() => this.companyDelete(index)}/>
      <div><Divider/></div>
            </div>
                )
            })
        }</List>
        )
    }
}

export default AllCompanies;