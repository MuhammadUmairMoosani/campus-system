import React, { Component } from 'react';
import { AppBar, TextField,RaisedButton} from 'material-ui';
import * as firebase from 'firebase';
class CompanyInfo extends Component {
    constructor() {
        super();
        this.state = {
            companyName:'',
            phone:'',
            address: "",
            city:"",
            website:'',
          }
    }

    saveDataToFirebase() {
        if(
            this.state.companyName !== "" &&
            this.state.phone !== "" &&
            this.state.address !== "" &&
            this.state.city !== "" &&
            this.state.website !== "" 
        ) {
            let data = {
                companyName:this.state.companyName, 
                phone:this.state.phone, 
                address:this.state.address,
                city:this.state.city, 
                website:this.state.website
            }
            firebase.database().ref().child(`user/${firebase.auth().currentUser.uid}`).update(data);
            this.props.history.push('/company')
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
   
        return (
            <div style={styles.appBar}>
                <AppBar title="Company Information" showMenuIconButton={false} /><br />
                <TextField hintText="Company Name" onChange={(text) => this.setState({companyName:text.target.value})}/><br />
                <TextField hintText="Phone" onChange={(text) => this.setState({phone:text.target.value})} /><br />
                <TextField hintText="Address" multiLine={true} rows={2} rowsMax={4} onChange={(text) => this.setState({address:text.target.value})} />
                <TextField hintText="City" onChange={(text) => this.setState({city:text.target.value})} /><br />
                <TextField hintText="Website"  onChange={(text) => this.setState({website:text.target.value})} /><br />
                <RaisedButton label="Submit" primary={true} onClick={() => this.saveDataToFirebase()} />
            </div>
        )
    }
}

export default CompanyInfo;