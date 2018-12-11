import React, { Component } from 'react';
import { AppBar, TextField,SelectField,MenuItem,RaisedButton,DatePicker} from 'material-ui';
import * as firebase from 'firebase';
class StudentInfo extends Component {
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
            eSalary:''
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
               firebase.database().ref().child(`user/${firebase.auth().currentUser.uid}`).update(data)
               this.props.history.push('./student')
        } else {
            alert('Please fill all Text Fields')
      
        }
    }
    ageHandler(date) {
        let currentYear = new Date().getFullYear();
        let dateOfBirth = date.getFullYear()
        this.state.DOB = currentYear - dateOfBirth;
        this.setState({DOB:this.state.DOB})
    }
    render() {
        const styles = {
            appBar: {
                width: 400,
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
                <AppBar title="Student Information" showMenuIconButton={false} /><br />
                <TextField hintText="First name" onChange={(text) => this.setState({firstName:text.target.value})}/><br />
                <TextField hintText="Last name" onChange={(text) => this.setState({lastName:text.target.value})}/><br />
                <TextField hintText="Phone/cell number" onChange={(text) => this.setState({phone:text.target.value})} /><br />
                <TextField hintText="Address" multiLine={true} rows={2} rowsMax={4} onChange={(text) => this.setState({address:text.target.value})} /><br />
                <TextField hintText="City" onChange={(text) => this.setState({city:text.target.value})} /><br />
                <DatePicker hintText="Date of birth"  openToYearSelection={true} onChange={(n,v) => this.ageHandler(v)}/><br />
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
                <TextField hintText="Expected salary" onChange={(text) => this.setState({eSalary:text.target.value})} /><br />
                <RaisedButton label="Submit" primary={true} onClick={() => this.saveDataToFirebase()} />
            </div>
        )
    }
}

export default StudentInfo;