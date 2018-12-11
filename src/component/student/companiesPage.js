import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import * as firebase from 'firebase';
import Divider from 'material-ui/Divider';

class Companies extends Component {
    constructor() {
        super(); 
        this.state = {
            companyName:[],
            companyEmail:[],
            companyWeb:[]
        }
    }
    componentWillMount() {

               firebase.database().ref(`user`).on(
                   'value', snap => {
                       let Cname = [];
                       let Cemail = [];
                       let Cweb = [];
                       let value = snap.val()
                       for(let i in value) {
                           if(value[i].accountCategory !== 'student' && value[i].accountCategory !== 'admin') {
                               Cname.push(value[i].companyName)
                                 Cemail.push(value[i].email)
                                  Cweb.push(value[i].website)
                           } 
                       }
                       this.setState({companyName:Cname,companyEmail:Cemail,companyWeb:Cweb})
                   }
               )
       
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

            <div> 
                   
      <ListItem primaryText={this.state.companyName[index]} secondaryText={'Email: ' + value + " " + 'Website: ' + this.state.companyWeb[index]}  style={{textAlign:'center'}} />
      <div><Divider /></div>
            </div>
                )
            })
        }</List>
        )
    }
}

export default Companies;