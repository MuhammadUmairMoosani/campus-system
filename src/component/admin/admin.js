import React, {Component} from 'react';
import {AppBar,IconButton,IconMenu,MenuItem,Tabs, Tab} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import * as firebase from 'firebase';
import AllCompanies from './allCompaniesPage';
import AllJobs from './allJobsPage';
import AllStudends from './allStudentsPage';


class Admin extends Component {
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
    <Tab label="Companies" >
      <div>
      <AllCompanies/>
      </div>
    </Tab>
    <Tab label="jobs" >
      <div>
      <AllJobs/>
      </div>
    </Tab>
    <Tab label="Students" >
      <div>
        <AllStudends/>
      </div>
    </Tab>
    </Tabs>
            </div>
        )
    }
}

export default Admin;