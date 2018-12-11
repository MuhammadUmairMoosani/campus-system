import React, { Component } from 'react';
import * as firebase from 'firebase';
import StudentFormEdit from './studentFormEdit';
import { 
    AppBar, 
    TextField,
    SelectField,
    MenuItem,
    TimePicker,
    DatePicker,
    Table,
    TableBody,
    TableRow,
    TableRowColumn,
    TableHeaderColumn,
    RaisedButton
} from 'material-ui';

const styles = {
    appBar: {
        width: 600,
        margin: '0 auto',
        textAlign: 'center',
        marginTop: 50

    }
}
class MyInformation extends Component {
    constructor() {
        super();
        this.state = {
            edit: false,
            DOB: '',
            accountCategory: '',
            address: '',
            city: '',
            eSalary: '',
            education: '',
            email: '',
            experience: '',
            firstName: '',
            gender: '',
            lastName: '',
            phone: '',
            currentUserUid:''
        }
    }
   cancelButton() {
    this.setState({edit:false})
   }
    falseDisplay() {
        return (
            <div style={styles.appBar}>
                <Table allRowsSelected={false}>
                    <TableBody displayRowCheckbox={false}>

                        <TableRow >
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableRowColumn></TableRowColumn>
                            <TableRowColumn>{this.state.firstName + " " + this.state.lastName}</TableRowColumn>
                        </TableRow>
                        
                        <TableRow >
                            <TableHeaderColumn>Email address</TableHeaderColumn>
                            <TableRowColumn></TableRowColumn>
                            <TableRowColumn>{this.state.email}</TableRowColumn>
                        </TableRow>
                        
                        <TableRow >
                            <TableHeaderColumn>Cell number</TableHeaderColumn>
                            <TableRowColumn></TableRowColumn>
                            <TableRowColumn>{this.state.phone}</TableRowColumn>
                        </TableRow>
                        
                        <TableRow >
                            <TableHeaderColumn>Age</TableHeaderColumn>
                            <TableRowColumn></TableRowColumn>
                            <TableRowColumn>{this.state.DOB}</TableRowColumn>
                        </TableRow>
                        
                        <TableRow >
                            <TableHeaderColumn>Address</TableHeaderColumn>
                            <TableRowColumn></TableRowColumn>
                            <TableRowColumn>{this.state.address}</TableRowColumn>
                        </TableRow>
                        
                        <TableRow >
                            <TableHeaderColumn>City</TableHeaderColumn>
                            <TableRowColumn></TableRowColumn>
                            <TableRowColumn>{this.state.city}</TableRowColumn>
                        </TableRow>
                        
                        <TableRow >
                            <TableHeaderColumn>Gender</TableHeaderColumn>
                            <TableRowColumn></TableRowColumn>
                            <TableRowColumn>{this.state.gender}</TableRowColumn>
                        </TableRow>
                        
                        <TableRow >
                            <TableHeaderColumn>Education</TableHeaderColumn>
                            <TableRowColumn></TableRowColumn>
                            <TableRowColumn>{this.state.education}</TableRowColumn>
                        </TableRow>
                        
                        <TableRow >
                            <TableHeaderColumn>Experience</TableHeaderColumn>
                            <TableRowColumn></TableRowColumn>
                            <TableRowColumn>{this.state.experience}</TableRowColumn>
                        </TableRow>
                        
                        <TableRow >
                            <TableHeaderColumn>Expected salary</TableHeaderColumn>
                            <TableRowColumn></TableRowColumn>
                            <TableRowColumn>{this.state.eSalary}</TableRowColumn>
                        </TableRow>
                        
                    </TableBody>
                </Table>
                <RaisedButton label="Edit" primary={true}  onClick={() => this.setState({edit:true})}/>
            </div>
        )
    }
    trueDisplay() {
      
        return (
          
            <div style={styles.appBar}>
                  <StudentFormEdit cancel={this.cancelButton.bind(this)}  />
            </div>
        )
    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {


            firebase.database().ref(`user/${user.uid}`).on(
                'value', snap => {
                    this.state.DOB = snap.val().DOB;
                    this.state.accountCategory = snap.val().accountCategory;
                    this.state.address = snap.val().address;
                    this.state.city = snap.val().city;
                    this.state.eSalary = snap.val().eSalary;
                    this.state.education = snap.val().education;
                    this.state.email = snap.val().email;
                    this.state.experience = snap.val().experience;
                    this.state.firstName = snap.val().firstName;
                    this.state.gender = snap.val().gender;
                    this.state.lastName = snap.val().lastName;
                    this.state.phone = snap.val().phone;
                    this.setState(
                        {
                            DOB: this.state.DOB,
                            accountCategory: this.state.accountCategory,
                            address: this.state.address,
                            city: this.state.city,
                            eSalary: this.state.eSalary,
                            education: this.state.education,
                            email: this.state.email,
                            experience: this.state.experience,
                            firstName: this.state.firstName,
                            gender: this.state.gender,
                            lastName: this.state.lastName,
                            phone: this.state.phone
                        })
                }
            )
        })
    }

    render() {
        {
            return this.state.edit ? this.trueDisplay() : this.falseDisplay();
        }
    }
}

export default MyInformation;