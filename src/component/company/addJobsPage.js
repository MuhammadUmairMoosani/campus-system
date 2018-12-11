import React, { Component } from 'react';
import {  TextField,SelectField,MenuItem,TimePicker,RaisedButton} from 'material-ui';
import * as firebase from 'firebase';

class AddJobs extends Component {
    constructor() {
        super();
        this.state = {
            jobPosition:'',
            education: "",
            experience:"",
            shift:"",
            salary:'',
            jobArray:[],
            currentUserUid:'',
           
          }
    }
    educationHandleChange = (event, index, value) => this.setState({education:value}) 
    experienceHandleChange = (event, index, value) => this.setState({experience:value})
    shiftHandleChange = (event, index, value) => this.setState({shift:value});
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({currentUserUid:user.uid});
        })
            firebase.database().ref(`user/${this.state.currentUserUid}/jobs`).on('value',snap => {
            let array = [];
            let value = snap.val()
            for(let i in value) {
                array.push(value[i])
            }
             this.setState({jobArray:array});
            })

        
    }
    saveDataToFirebase() {
        if(
            this.state.jobPosition !== "" &&
            this.state.education !== "" &&
            this.state.experience !== "" &&
            this.state.shift !== "" &&
            this.state.salary !== "" 
        ) {
            let jarray = this.state.jobArray
            let data = {
                jobPosition:this.state.jobPosition,
                education:this.state.education, 
                experience:this.state.experience, 
                shift:this.state.shift,
                salary:this.state.salary,
            }
            jarray.push(data)
            this.setState({jobArray:jarray})
                  
                   
                   firebase.database().ref(`user/${this.state.currentUserUid}`).update(
                       {"jobs":jarray})
                this.setState({jobPosition:'',education:'',experience:'',shift:'',fromTime:'',toTime:'',salary:''})
                alert('Job is add sucessfully')
            } else {
                alert('Please fill all Text Fields')
            }
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
          const shiftItems = [
            <MenuItem key={1} value={"Morning"} primaryText="Morning" />,
            <MenuItem key={2} value={"Evening"} primaryText="Evening" />,
          ];
        return (
            <div style={styles.appBar}>
                <TextField hintText="Position" value={this.state.jobPosition} onChange={(text) => this.setState({jobPosition:text.target.value})} />
                <SelectField
                    value={this.state.education}
                    onChange={this.educationHandleChange}
                    floatingLabelText="Education"
                >
                    {educationItems}
                </SelectField>
                <SelectField
                    value={this.state.experience}
                    onChange={this.experienceHandleChange}
                    floatingLabelText="Experience"
                >
                    {experienceItems}
                </SelectField>
                <SelectField
                    value={this.state.shift}
                    onChange={this.shiftHandleChange}
                    floatingLabelText="Shift"
                >
                    {shiftItems}
                </SelectField>
                <TextField hintText="Salary" value={this.state.salary} onChange={(text) => this.setState({salary:text.target.value})} /><br />
                <RaisedButton label="ADD" style={{marginBottom:30}} primary={true} onClick={() => this.saveDataToFirebase()} />
            </div>
        )
    }
}

export default AddJobs;