import React, { Component } from 'react';
import { AppBar,  TextField, RaisedButton, FlatButton, RadioButton, RadioButtonGroup } from 'material-ui';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            pass: '',
            accountCategory: ''

        }
    }
    saveAuthFirebase() {
        // firebase.auth().currentUser
        if (this.state.email !== "" && this.state.pass !== "" ) {
            if (this.state.accountCategory !== "") {
                let promise = firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass)
                promise.catch((message) => { alert(message), this.setState({ email: '', pass: ''}) })
                promise.then((user) => {  
                    firebase.database().ref('user').child(user.uid).set({
                        email: user.email,
                        accountCategory: this.state.accountCategory,
                        pass:this.state.pass
                    })
                     this.props.history.push('/' + this.state.accountCategory + 'Info')
                }
                )
            } else {alert('Please select Student or Company')}
        } else {alert("Please fill all  Text fields")}
    }
    // saveFirebaseDatabase() {
    //     let data = {
    //         email: this.state.email,
    //         accountCategory: this.state.accountCategory
    //     }
    //     firebase.database().ref().child(`user`).push(data)
    // }

    render() {
        const styles = {
            signinBar: {
                width: 300,
                margin: '0 auto',
                marginTop: 100

            },
            radioButton: {
                marginBottom: 16,
            }
        }

        return (

            <div>
                <div>
                    <AppBar title="Campus Recruitment System" showMenuIconButton={false} />
                </div>
                <div style={styles.signinBar} >
                    <AppBar title="SIGN UP" showMenuIconButton={false} />
                    <TextField hintText="Email" value={this.state.email} floatingLabelText="Email" onChange={(text) => this.setState({ email: text.target.value })} />
                    <TextField hintText="Password" value={this.state.pass} type="password" floatingLabelText="Password" onChange={(text) => this.setState({ pass: text.target.value })} /><br /><br />
                    <RadioButtonGroup name="category"   onChange={(text) => this.setState({ accountCategory: text.target.value })}>
                        <RadioButton 
                            value="company"
                            label="Company"
                            style={styles.radioButton}
                        />
                        <RadioButton
                            value="student"
                            label="Student"
                            style={styles.radioButton}
                        />
                    </RadioButtonGroup>
                    <RaisedButton label="sign up" primary={true} onClick={() => this.saveAuthFirebase()} /><br /><br />
                    <Link to="/"><FlatButton label="i already have a account" primary={true} /></Link>
                </div>
            </div>
        )
    }
}


export default SignUp;