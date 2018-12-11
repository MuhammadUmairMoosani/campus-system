import React, { Component } from 'react';
import { TextField,SelectField,MenuItem,RaisedButton} from 'material-ui';
import * as firebase from 'firebase';
class StudentFormEdit extends Component {
    constructor() {
        super();
        this.state = {
            firstName:'',
            lastName:'',
            phone:'',
            address:'',
            city:'',
            DOB:'',
            education: "",
            experience:"",
            gender:'',
            eSalary:'',
          }
    }
    educationHandleChange = (event, index, value) => this.setState({education:value}) 
    experienceHandleChange = (event, index, value) => this.setState({experience:value})
    genderHandleChange = (event, index, value) => this.setState({gender:value})
    saveDataToFirebase() {
        if(
            this.state.firstName !== "" &&
            this.state.lastName !== "" &&
            this.state.phone !== "" &&
            this.state.address !== "" &&
            this.state.city !== "" &&
            this.state.DOB !== "" &&
            this.state.education !== "" &&
            this.state.experience !== "" &&
            this.state.gender !== "" &&
            this.state.eSalary !== "" 
        ) {
            let data = {
                firstName:this.state.firstName, 
                lastName:this.state.lastName, 
                phone:this.state.phone,
                address:this.state.address, 
                city:this.state.city,
                DOB:this.state.DOB, 
                education:this.state.education ,
                experience:this.state.experience, 
                gender:this.state.gender, 
                eSalary:this.state.eSalary
            }
               
            firebase.auth().onAuthStateChanged((user) => firebase.database().ref(`user/${user.uid}`).update(data))
            this.props.cancel()
     } else {
         alert('Please fill all Text Fields')
   
     }
    }
    ageHandler(date) {
        let currentYear = new Date().getFullYear();
        let dateOfBirth = date.getFullYear()
        this.state.DOB = currentYear - dateOfBirth;
       // this.setState({DOB:this.state.DOB})
    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged( (user) => {
            firebase.database().ref(`user/${user.uid}`).on(
                'value', snap => {
                   // this.state.DOB = snap.val().DOB;
                   this.state.DOB = "300";
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

        const styles = {
            appBar: {
                width: 600,
                margin: '0 auto',
                textAlign: 'center',
                marginTop: 50

            }
        }

        const educationItems = [
            <MenuItem key={1} value={"Matric"} primaryText="Matric" />,
            <MenuItem key={2} value={"Intermediate"} primaryText="Intermediate" />,
            <MenuItem key={3} value={"Bachelor"} primaryText="Bachelor" />,
            <MenuItem key={4} value={"Master"} primaryText="Master" />,
          ];
          const experienceItems = [
            <MenuItem key={1} value={"1 Year"} primaryText="1 Year" />,
            <MenuItem key={2} value={"2 Year"} primaryText="2 Year" />,
            <MenuItem key={3} value={"3 Year"} primaryText="3 Year" />,
            <MenuItem key={4} value={"4 Year"} primaryText="4 Year" />,
            <MenuItem key={5} value={"5 Year"} primaryText="5 Year" />
          ];
          const genderItems = [
            <MenuItem key={1} value={"Female"} primaryText="Female" />,
            <MenuItem key={2} value={"Male"} primaryText="Male" />,
          ];


        return (
            <div style={styles.appBar}>
                <TextField hintText="First name"  floatingLabelText="First name" value={this.state.firstName} onChange={(text) => this.setState({firstName:text.target.value})}/><br />
                <TextField hintText="Last name"  floatingLabelText="Last name" value={this.state.lastName} onChange={(text) => this.setState({lastName:text.target.value})}/><br />
                <TextField hintText="Phone/cell number"  floatingLabelText="Cell number" value={this.state.phone} onChange={(text) => this.setState({phone:text.target.value})} /><br />
                <TextField hintText="Address"  floatingLabelText="Address" value={this.state.address} multiLine={true} rows={2} rowsMax={4} onChange={(text) => this.setState({address:text.target.value})} /><br />
                <TextField hintText="City"  floatingLabelText="City" value={this.state.city} onChange={(text) => this.setState({city:text.target.value})} /><br />
                <SelectField
                    value={this.state.education}
                    onChange={this.educationHandleChange}
                    floatingLabelText="Education"
                >
                    {educationItems}
                </SelectField><br />
                <SelectField
                    value={this.state.experience}
                    onChange={this.experienceHandleChange}
                    floatingLabelText="Experience"
                >
                    {experienceItems}
                </SelectField><br />
                <SelectField
                    value={this.state.gender}
                    onChange={this.genderHandleChange}
                    floatingLabelText="Gender"
                >
                    {genderItems}
                </SelectField><br />
                <TextField hintText="Expected salary"  floatingLabelText="Expected salary" value={this.state.eSalary} onChange={(text) => this.setState({eSalary:text.target.value})} /><br />
                <RaisedButton label="Done" primary={true}  onClick={() => this.saveDataToFirebase()}/>
                  <RaisedButton label="Cancel" style={{marginLeft:20}} primary={true}  onClick={() => this.props.cancel()}/>
                
            </div>
        
        )
    }
}

export default StudentFormEdit;