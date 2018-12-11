import React, {Component} from 'react';
import {AppBar,IconButton,IconMenu,MenuItem,Tabs, Tab} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import * as firebase from 'firebase';
import '../../firebase/firebase';
import Companies from './companiesPage';
import Jobs from './jobsPage';
import Myinfo from './myInfoPage';


class Student extends Component {
  constructor() {
    super();
    this.state = {
      cemail:''
    }
  }
  logOut() {
   firebase.auth().signOut();
   this.props.history.push('/')
  }
    render() {
        const Logged = () => (
            <IconMenu
     
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
            >
              <MenuItem primaryText="Sign Out" onClick={() => this.logOut()} />
            </IconMenu>
          );
        return (
            <div>
                <AppBar title="Campus Recruitment System" showMenuIconButton={false} iconElementRight={ <Logged />}/>
                <Tabs>
    <Tab label="my information" >
      <div>
      <Myinfo/>
      </div>
    </Tab>
    <Tab label="jobs" >
      <div>
      <Jobs/>
      </div>
    </Tab>
    <Tab label="companies" >
      <div>
        <Companies/>
      </div>
    </Tab>
    </Tabs>
            </div>
        )
    }
}

export default Student;