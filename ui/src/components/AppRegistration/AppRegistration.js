import React, { Component } from "react";
import axios from "axios";
import config from '../../config.json';
import { Checkbox } from '@material-ui/core';
class AppRegistration extends Component{

    constructor(props){        
super(props);
console.log('props:',props);
  
    this.state={
        custDetails:this.props.custDetails,
        applications:[],
        metricTypes:[],
        emailAlert:false,
        msgAlert:false,
        selectedAppId:0,
        selectedMetricId:[],
        appRegistration:{
            appId:[],
        },
        custReg:false

   
    }
}
componentDidMount(){
   
    const custDetails=JSON.parse(sessionStorage.getItem("custDetails"));
    this.setState({
        custDetails:custDetails
    })
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
axios
    .get(
      config.backEndURL+"/users/appRegistration"
    )
    .then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        console.log(response);
        this.setState({
            applications: response.data.appDtls,
            metricTypes:response.data.metricTypeDtls
        });
      
    }
    })
    .catch(error => {
      console.log(error.response);
   
    });
}
appSelected(e,app){
    let appRegistration=this.state.appRegistration;
    if(e.target.checked){
       
        appRegistration.appId.push(app._id);
    }
    else{
        const appIndex=appRegistration.appId.findIndex(reg=>reg===app._id);
  if(appIndex>-1)
  {
    appRegistration.appId.splice(appIndex,1);
  }
    }
    console.log(e.target.checked);
    console.log(app)
    this.setState({
        appRegistration:appRegistration
    })
    console.log(appRegistration)
   // if(e)

}

saveCustAppDtls=()=>{
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
   let appRegReq={
       appId:this.state.appRegistration.appId,
       custDetails:this.state.custDetails
   };
   console.log(appRegReq)
   if(appRegReq.appId.length>0){
    axios
        .post(
          config.backEndURL+"/users/custAppDtls",appRegReq
        )
        .then(response => {
          console.log("Status Code : ", response.status);
          if (response.status === 201) {
            console.log(response);
         this.setState({
             custReg:true
         })
          
        }
        })
        .catch(error => {
          console.log(error.response);
       
        });
    }
    else{
        alert("Please select atleast one application");
    }
}
    render(){
        if(this.state.custReg)
        {
            const custDetails=this.state.custDetails;
            this.props.history.push("/home",{
                custDetails:custDetails
            })
        }
        const apps=this.state.applications;
        let regApps=null;
        if(apps.length>0)
        {
            regApps= apps.map(app=>{
             return (
               //  <div></div>
              //  <option value={app._id}>{app.applicationName}</option>
               <span>  <input type="checkbox" value={app._id} onChange={(e)=>this.appSelected(e,app)} />{app.applicationName} <br/></span>
             );
            })
        }
        console.log(regApps);
        return (
            <div>
               <h1>Application Registration</h1>
               <h3>Select Applications you want to register for metrics</h3>
             
  
               {regApps}
             <button onClick={this.saveCustAppDtls}>Save</button>
               {/* <select name="appName" value={this} onChange={this.appSelected}>
               <option value="0">Select Application</option>
 {regApps}
               </select> */}
            </div>
        );
    }
}
export default AppRegistration;