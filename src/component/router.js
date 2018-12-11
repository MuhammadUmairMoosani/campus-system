import React, {Component} from 'react';
import SignIn from './signIn';
import SignUp from './signUp';
import Company from './company/company';
import Student from './student/student';
import CompanyInfo from './company/companyInfoForm';
import StudentInfo from './student/studentInfoForm';
import AddJobs from './company/addJobsPage'
import MyInformation from './student/myInfoPage';
import Admin from './admin/admin'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class RouterComponent extends Component {
    render() {
        return (
            <Router>
                <div>
                <Route exact path="/" component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <Route path="/company" component={Company} />
                <Route path="/student" component={Student} />
                <Route path="/CompanyInfo" component={CompanyInfo} />
                <Route path="/StudentInfo" component={StudentInfo} />
                <Route path="/myinformation" component={MyInformation} />
                <Route path="/addjobs" component={AddJobs}/>
                <Route path="/admin" component={Admin}/>
                </div>
            </Router>
        )
    }
}

export default RouterComponent;