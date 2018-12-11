import React, {Component} from 'react';
import {AppBar,IconButton,IconMenu,MenuItem,Tabs, Tab} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import * as firebase from 'firebase';
import '../../firebase/firebase';
import AddJobs from './addJobsPage';
import MyCompanyJobs from './myCompanyJobsPage';
import Students from './studentsPage';

class Company extends Component {
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
    <Tab label="add jobs" >
      <div>
      <AddJobs/>
      </div>
    </Tab>
    <Tab label="my company jobs" >
      <div>
      <MyCompanyJobs/>
      </div>
    </Tab>
    <Tab label="students" >
      <div>
        <Students/>
      </div>
    </Tab>
    </Tabs>
            </div>
        )
    }
}

export default Company;