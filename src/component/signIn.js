import React, {Component} from 'react';
import {AppBar,TextField,RaisedButton} from 'material-ui';
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';


class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            email:'',
            pass:''
        }
    }
    signIn() {
       let promise = firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.pass)
       promise.catch((message) => {alert(message),this.setState({email:'',pass:''})})
       promise.then( () => {
        //    firebase.auth().onAuthStateChanged((user) => {
        //     this.props.history.push('/' + campus.category[campus.userIndex])
        //    })
        firebase.database().ref(`user/${firebase.auth().currentUser.uid}`).on(
            'value', snap => {
                if(snap.val() === null) {
                    firebase.auth().currentUser.delete()
                    this.setState({email:'',pass:''})
                    alert('Sorry admin is deleted this account');
                } else {
                    this.props.history.push('/' + snap.val().accountCategory)
                }
        
            }
        )
        
        })
        
    }
    render() {
        const styles = {
            signinBar: {
                width:300,
                margin:'0 auto',
                marginTop:100
                
            }
        }
        // const Logged = () => (
        //     <IconMenu
     
        //       iconButtonElement={
        //         <IconButton><MoreVertIcon /></IconButton>
        //       }
        //     >
        //       <MenuItem primaryText="Sign out" onClick={() => {alert('hello')}} />
        //     </IconMenu>
        //   );
        return (
            <div>
                <div>
            <AppBar title="Campus Recruitment System"  showMenuIconButton={false}/>
                </div>
                <div style={styles.signinBar} >
                <AppBar title="SIGN IN"  showMenuIconButton={false}/>
                <TextField hintText="Email" floatingLabelText="Email" value={this.state.email} onChange={(text) => this.setState({email:text.target.value})}/>
                <TextField hintText="Password" type="password" value={this.state.pass} floatingLabelText="Password" onChange={(text) => this.setState({pass:text.target.value})} /><br /><br />
                <RaisedButton label="sign in" primary={true} onClick={() => this.signIn()} /><br /><br />
               <Link to="/signup"><RaisedButton label="create account" primary={true}  /></Link>
                </div>
            </div>
        )
    }
}


export default SignIn;