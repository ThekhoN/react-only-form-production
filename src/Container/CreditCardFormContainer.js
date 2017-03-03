import React, {Component} from 'react'
import CreditCardHeaderImg from '../Component/CreditCardHeaderImg'
import CreditCardSelectCity from '../Component/CreditCardSelectCity'
import CreditCardSelectDOB from '../Component/CreditCardSelectDOB'
import CreditCardSelectEmploymentType from '../Component/CreditCardSelectEmploymentType'
import CreditCardSelectRelationshipBank from '../Component/CreditCardSelectRelationshipBank'
import CreditCardInputName from '../Component/CreditCardInputName'
import CreditCardInputEmail from '../Component/CreditCardInputEmail'
import CreditCardInputMobile from '../Component/CreditCardInputMobile'
import CreditCardInputCompanyName from '../Component/CreditCardInputCompanyName'
import CreditCardCheckboxAuth from '../Component/CreditCardCheckboxAuth'
import EligibleSubmitted from '../Component/EligibleSubmitted'
import IneligibleSubmitted from '../Component/IneligibleSubmitted'

import moment from 'moment';
import serializer from '../Module/serializer'
import mobPlatformCheck from '../Module/mobPlatformCheck'
//import xhrPOSThandler from '../Module/xhrPOSThandler'
import axios from 'axios'


// +++++ setUp POST params +++++
let deviceType;
const mobilePlatform = mobPlatformCheck();
if(mobilePlatform){
  deviceType = 'Mobile'
}
else {
  deviceType = 'Desktop'
}

let defaultParams = {
    //predefined
    UserName:"snapdeal",
    Password:"cHakscrA3eAres99hW",
    ApiCompanyName:"Snapdeal",
    ApiProductName:"credit-card",
    ModeOfLead:"vendor",
    //userIntputs
    Name:"",
    EmailId:"",
    Mobile :"",
    City:"",
    CompanyName:"",
    DOB:"",
    TypeOfEmployment:"",
    RelationType:"",
    TakeHomeSalary:"",
    IncomeSalary:"",
    IsAcknowledgedIT:"",
    //predefined
    SearchEngine:"SearchEngine",
    Campaign:"Snapdeal-creditcards",
    Adgroup:"Adgroup",
    Adtype:"Adtype",
    Keyword:"Keyword",
    Referer:"Referer",
    GclId:"gclid",
    Product:"credit-cards",
    Page:"credit-card",
    Device:deviceType,
    UtmInfo:"UtmInfo"
}

// +++++ / setUp POST params +++++
let defaultState_EmploymentType = {
  EmploymentType:'',
  EmploymentType_Undefined:false,

  MonthlyTakeHomeValue:'',
  MonthlyTakeHomeValue_Undefined: false,

  LastYearGrossTotalIncome:'',
  LastYearGrossTotalIncome_Undefined: false,

  IncomeTaxAcknowledgedByIT:'yes'
}

let defaultState_DOB = {
  DOBerror: false,
  DOB: '',
  DOBactiveErrorMessage:'',
  DOBerrorMessages:[
    `Please select your Date of Birth`,
    `Age cannot be more than 58 for Salaried professionals. Please enter appropriate Date of Birth.`,
    `Age cannot be more than 65 for Self-employed professionals. Please enter appropriate Date of Birth.`,
    `Age cannot be less than 23. Please enter appropriate Date of Birth.`
  ]
}

class CreditCardFormContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      SubmittedSuccess: false,
      Eligible: false,

      City:'',
      City_error: false,

      ...defaultState_DOB,

      ...defaultState_EmploymentType,

      RelationType:'',
      RelationType_error: false,

      Name:'',
      Name_error: false,

      Email:'',
      Email_error:false,

      Mobile:'',
      Mobile_error: false,

      CompanyName:'',
      CompanyName_error:false,

      AuthoriseICICI: 'true',
      AuthoriseICICI_unauthorized: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handle_onCityChange = this.handle_onCityChange.bind(this)
    this.handle_onDOBChange = this.handle_onDOBChange.bind(this)
    this.handle_onEmploymentTypeChange = this.handle_onEmploymentTypeChange.bind(this)
    this.handle_onRelationShipBankChange = this.handle_onRelationShipBankChange.bind(this)
    this.handle_onNameChange = this.handle_onNameChange.bind(this)
    this.handle_onEmailChange = this.handle_onEmailChange.bind(this)
    this.handle_onMobileChange = this.handle_onMobileChange.bind(this)
    this.handle_onCompanyNameChange = this.handle_onCompanyNameChange.bind(this)
    this.handle_onCheckboxAuthChange = this.handle_onCheckboxAuthChange.bind(this)
  }
  handleSubmit(){
    //console.info('Main running handleSubmit');
    //console.info('Main final state: ', this.state)
    //validate City
    if(!this.state.City){
      //console.error('submitError: City not defined. . .')
      this.setState({
          City_error: true,
          City:''
        })
    }

    //validate DOB
    if(!this.state.DOB || this.state.DOB===''){
      //console.error('submitError: DOB not defined. . .')
      this.setState({
          ...defaultState_DOB,
          DOBactiveErrorMessage: this.state.DOBerrorMessages[0],
          DOBerror: true,
          DOB:'',
        })
      if(this.state.DOB && this.state.EmploymentType){
        // +++++ validate DOB based on EmploymentType +++++
        const age = moment().year() - moment(this.state.DOB).year();
        //console.info('userInfo: ', age);
        if(age >= 23){
          if(age > 58 && this.state.EmploymentType === 'salary'){
            //console.error('submitError: Age cannot be more than 58 for Salaried professionals. Please enter appropriate Date of Birth.')
            this.setState({
              DOBerror: true,
              DOBactiveErrorMessage: this.state.DOBerrorMessages[1],
            })
          }
          else if(this.state.EmploymentType === 'self1' || this.state.EmploymentType === 'self2'){
            if(age > 65){
                //console.error('submitError: Age cannot be more than 65 for Self-employed professionals. Please enter appropriate Date of Birth.')
                this.setState({
                  DOBerror: true,
                  DOBactiveErrorMessage: this.state.DOBerrorMessages[2],
                })
            }
          }
        }
        else {
            //console.error('submitError: Age cannot be less than 23. Please enter appropriate Date of Birth.');
            this.setState({
              DOBerror: true,
              DOBactiveErrorMessage: this.state.DOBerrorMessages[3],
            })
        }
        // +++++ / validate DOB based on EmploymentType +++++
      }
    }

    //validate EmploymentType
    if(!this.state.EmploymentType){
      //console.error('submitError: EmploymentType not defined. . .')
      this.setState({
          EmploymentType_Undefined: true,
          EmploymentType:''
        })
    }
    if(this.state.EmploymentType === 'salary' && this.state.MonthlyTakeHomeValue_Undefined){
      //console.error('submitError: EmploymentType is salary, MonthlyTakeHomeValue is undefined. . .')
    }
    else if(this.state.EmploymentType === 'self1' && this.state.LastYearGrossTotalIncome_Undefined){
      //console.error('submitError: EmploymentType is self1, LastYearGrossTotalIncome is undefined. . .')
    }
    else if(this.state.EmploymentType === 'self2' && this.state.LastYearGrossTotalIncome_Undefined){
      //console.error('submitError: EmploymentType is self2, LastYearGrossTotalIncome is undefined. . .')
    }

    //validate RelationType
    if(!this.state.RelationType){
      //console.error('submitError: RelationType not defined. . .')
      this.setState({
          RelationType_error: true,
          RelationType:''
        })
    }
    //validate Name
    if(!this.state.Name){
      //console.error('submitError: Name not defined. . .')
      this.setState({
          Name_error: true,
          Name:''
        })
    }
    //validate Email
    if(!this.state.Email){
      //console.error('submitError: Email not defined. . .')
      this.setState({
          Email_error: true,
          Email:''
        })
    }
    //validate Mobile
    if(!this.state.Mobile){
      //console.error('submitError: Mobile not defined. . .')
      this.setState({
          Mobile_error: true,
          Mobile:''
        })
    }
    //validate CompanyName
    if(!this.state.CompanyName || this.state.CompanyName === ''){
      //console.error('submitError: CompanyName not defined at Main. . .')
      this.setState({
          CompanyName_error: true,
          CompanyName:''
        })
    }
    //validate AuthoriseICICI
    if(!this.state.AuthoriseICICI){
      //console.error('submitError: AuthoriseICICI not authorized. . .')
      this.setState({
          AuthoriseICICI_unauthorized: true,
          AuthoriseICICI:''
        })
    }

      //SUBMIT99
    //const url = 'https://www.m-icicibank.com/api/credit-cards/CC/post'
    const url = 'https://www.m-icicibank.com/api/credit-cards/CC/post?se=snapdeal-cc-sf-905&cp=snapdeal-cc-sf-905&utm_campaign=snapdeal-cc-sf-905&utm_content=-snapdeal-cc-sf-905&utm_medium=snapdeal&utm_source=snapdeal-cc-sf-905'
    let serializedParams

    if(!this.state.City_error &&
      !this.state.DOBerror &&
      !this.state.EmploymentType_Undefined &&
      !this.state.RelationType_error &&
      !this.state.Name_error &&
      !this.state.Email_error &&
      !this.state.Mobile_error &&
      !this.state.CompanyName_error &&
      !this.state.AuthoriseICICI_unauthorized
    ){

      defaultParams.Name = this.state.Name
      defaultParams.EmailId = this.state.Email
      defaultParams.Mobile = this.state.Mobile
      defaultParams.City = this.state.City
      defaultParams.CompanyName = this.state.CompanyName
      defaultParams.DOB = this.state.DOB
      defaultParams.RelationType = this.state.RelationType
      //conditionals
      defaultParams.TypeOfEmployment = this.state.EmploymentType
      defaultParams.TakeHomeSalary = this.state.MonthlyTakeHomeValue
      defaultParams.IncomeSalary = this.state.LastYearGrossTotalIncome


      if( (this.state.EmploymentType === 'salary' && !this.state.MonthlyTakeHomeValue_Undefined) ||
          (this.state.EmploymentType === 'self1' && !this.state.LastYearGrossTotalIncome_Undefined) ||
          (this.state.EmploymentType === 'self2' && !this.state.LastYearGrossTotalIncome_Undefined)
        ){
        ////console.info('submission POSTED , EmploymentType is salary, generate Params & submit. . .')
          defaultParams.TakeHomeSalary = this.state.MonthlyTakeHomeValue
          // +++++ handling POST Axios response +++++ //
          //axios setHeaders
          //console.info('readyToPost defaultParams: ', defaultParams);

          //axios.defaults.headers.common['Authorization'] = 'Basic Y3JlZGl0Y2FyZDpmYXRSdXN3YSN1czg=';
          //axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';


          const config = {
            headers : {
              'Authorization': '**** ****************************',
               'Content-Type': 'application/x-www-form-urlencoded'
             }
          }

          serializedParams = serializer(defaultParams);
          //console.info('serializedParams: ', serializedParams);
          axios.post(url, serializedParams, config)
          .then(function (responseObj) {
            //console.info('response.data', responseObj.data);
            const response = JSON.parse(responseObj.data);
            if(response.Result==='Success'){
              if(response.Eligibility === 'Eligible'){
                if(response.Description === 'Lead Captured Eligible' || response.Description === 'Duplicate Entry Eligible'){
                    this.setState({
                            SubmittedSuccess:true,
                            Eligible:true
                    })
                }
              }
              else {
                  this.setState({
                          SubmittedSuccess:true,
                          Eligible:false
                  })
                  //console.error('Sorry you are not eligible')
              }
            }
            else if(response.Result === 'Fail' && response.Eligibility === 'Eligible' && response.Description === 'Duplicate Entry Eligible'){
                  //console.error('result failed, Duplicate Entry Eligible')
                  this.setState({
                          SubmittedSuccess:true,
                          Eligible:true
                  })
            }
            else if(response.Result === 'Fail' && response.Eligibility === 'Not Eligible'){
                  //console.error('result failed, Sorry you are not eligible')
                  this.setState({
                          SubmittedSuccess:true,
                          Eligible:false
                  })
            }
            else {
              if(response.Description){
                //console.error('response.Description: ', response.Description);
              }
              else {
                //console.error('Submit failed. . .');
              }
              alert('Please try again later. . .')
            }
            //conditions
          }.bind(this))
          .catch(function (error) {
            //console.log(error);
          });
          // +++++ handling POST Axios response +++++ //
      }
      else {
        //console.error('MonthlyTakeHomeValue/LastYearGrossTotalIncome not entered. . .');
        return false;
      }
    }
    else {
      //console.error('form submission failed, incomplete input');
      return false;
    }


    //proceed to post ONLY if
    //if EmploymentType is defined
      //if EmploymentType === 'salary' && noError for reqd fields
        //reqd fields
          /*
            MonthlyTakeHomeValue
          */

      //if EmploymentType === 'self1' || EmploymentType === 'self2'  && noError for reqd fields
        //reqd fields
          /*
            LastYearGrossTotalIncome
            IncomeTaxAcknowledgedByIT
          */
  }
  handle_onDOBChange(date){

    if(date === '' || !date){
      this.setState({
        ...defaultState_DOB,
        DOB: '',
        DOBerror: true,
        DOBactiveErrorMessage: this.state.DOBerrorMessages[0]
      })
    }
    else {
      const parsedDate = moment(date).format('MM/DD/YYYY').toString()
      //console.info('typeOf parsedDate: ', typeof(parsedDate));
      //console.error('parsedDate: ', parsedDate);
      this.setState({
        DOBerror: false,
        DOB: parsedDate,
        DOBactiveErrorMessage:'',
      }, function () {
        //console.info('Main updated Main DOB:', this.state.DOB);

        // +++++ validate DOB based on EmploymentType +++++
        const age = moment().year() - moment(date).year();
        //console.info('userInfo: ', age);
        if(age >= 23){
          if(age > 58 && this.state.EmploymentType === 'salary'){
            //console.error('Age cannot be more than 58 for Salaried professionals. Please enter appropriate Date of Birth.')
            this.setState({
              DOBerror: true,
              DOBactiveErrorMessage: this.state.DOBerrorMessages[1],
            })
          }
          else if(this.state.EmploymentType === 'self1' || this.state.EmploymentType === 'self2'){
            if(age > 65){
                //console.error('Age cannot be more than 65 for Self-employed professionals. Please enter appropriate Date of Birth.')
                this.setState({
                  DOBerror: true,
                  DOBactiveErrorMessage: this.state.DOBerrorMessages[2],
                })
            }
          }
        }
        else {
            //console.error('Age cannot be less than 23. Please enter appropriate Date of Birth.');
            this.setState({
              DOBerror: true,
              DOBactiveErrorMessage: this.state.DOBerrorMessages[3],
            })
        }
        // +++++ / validate DOB based on EmploymentType +++++
      })
    }
  }
  handle_onCityChange(city){
    ////console.info('Main passed city: ', city);
    if(city===''||city===null){
      this.setState({
          City_error: true,
          City:''
        },
        function () {
          //console.error('City not selected . . .');
        }
      )
    }
    else {
      this.setState({
        City_error: false,
        City: city
      }, function () {
        //console.info('Main updated Main City: ', this.state.City);
      })
    }
  }
  handle_onEmploymentTypeChange(details){
    //console.log('Main handle_onEmploymentTypeChange running. . .', details);
    //if EmploymentType not selected
    if(details.EmploymentType === '' || !details.EmploymentType){
      //console.info('Main empty/undefined case');
      this.setState({
        ...defaultState_EmploymentType,
        EmploymentType_Undefined: true,
        EmploymentType: ''
      })
    }
    else {
        //console.info('Main defined case');
        this.setState({
          ...defaultState_EmploymentType,
          EmploymentType_Undefined: false,
          EmploymentType: details.EmploymentType
        },
        function () {
          ////console.log('updated state at Main: ', this.state);
          //conditions onChange
          //if salary
          if(details.EmploymentType === 'salary'){
              //MonthlyTakeHomeValue not entered
              //console.info('case salary')
              if( !(/([0-9]+[,]*)+/.test(details.MonthlyTakeHomeValue)) ||
                details.MonthlyTakeHomeValue === '' ||
                !details.MonthlyTakeHomeValue){
                  //console.info('case salary, monthly NOT defined')
                  this.setState({
                    ...defaultState_EmploymentType,
                    EmploymentType:details.EmploymentType,
                    EmploymentType_Undefined: false,
                    MonthlyTakeHomeValue_Undefined:true
                  })
              }
              else {
                //console.info('case salary, monthly defined')
                this.setState({
                  ...defaultState_EmploymentType,
                  EmploymentType:details.EmploymentType,
                  EmploymentType_Undefined: false,
                  MonthlyTakeHomeValue_Undefined:false,
                  MonthlyTakeHomeValue: details.MonthlyTakeHomeValue
                }, function () {
                  //console.info('updatedState on MonthlyTakeHomeValue enter: ', this.state);
                })
              }
          }

          //if self1 or self2
          else {
              //LastYearGrossTotalIncome not entered
              //console.info('case self1/self2 NOT valid')
              if( !(/([0-9]+[,]*)+/.test(details.LastYearGrossTotalIncome)) ||
                details.LastYearGrossTotalIncome === '' ||
                !details.LastYearGrossTotalIncome){
                  ////console.info('case salary, monthly NOT defined')
                  this.setState({
                    ...defaultState_EmploymentType,
                    EmploymentType:details.EmploymentType,
                    IncomeTaxAcknowledgedByIT:details.IncomeTaxAcknowledgedByIT,
                    EmploymentType_Undefined: false,
                    LastYearGrossTotalIncome_Undefined:true,
                  })
              }
              else {
                //console.info('case self1/self2 valid')
                this.setState({
                  ...defaultState_EmploymentType,
                  EmploymentType:details.EmploymentType,
                  IncomeTaxAcknowledgedByIT:details.IncomeTaxAcknowledgedByIT,
                  LastYearGrossTotalIncome: details.LastYearGrossTotalIncome,
                  EmploymentType_Undefined: false,
                  LastYearGrossTotalIncome_Undefined:false,

                }, function () {
                  //console.info('updatedState on LastYearGrossTotalIncome enter: ', this.state);
                })
              }
            }
        }
      )
    }


  }
  handle_onRelationShipBankChange(RelationshipType){
    if(RelationshipType===''||RelationshipType===null){
      this.setState({
          RelationType_error: true,
          RelationType:''
        },
        function () {
          //console.error('relationshipType not selected . . .');
        }
      )
    }
    else {
      this.setState({
        RelationType_error: false,
        RelationType: RelationshipType
      }, function () {
        //console.info('Main updated Main relationshipType: ', this.state.RelationType);
      })
    }
  }
  handle_onNameChange(name){
    //console.log('passed name: ', name);
    if(name===''|| name.trim() === "" || !(/^[A-Za-z\s]+$/.test(name))){
      this.setState({
          Name_error: true
        },
        function () {
          //console.error('Name not entered/invalid . . .');
        }
      )
    }
    else {
      this.setState({
        Name_error: false,
        Name: name
      }, function () {
        //console.info('Main updated Main Name: ', this.state.Name);
      })
    }
  }
  handle_onEmailChange(Email){
    //console.log('passed Email: ', Email);
    if(Email==='' || (!(/\S+@\S+\.\S+/.test(Email))) ){
      this.setState({
          Email_error: true
        },
        function () {
          //console.error('Email not entered/invalid . . .');
        }
      )
    }
    else {
      this.setState({
        Email_error: false,
        Email: Email
      }, function () {
        //console.info('Main updated Main Email: ', this.state.Email);
      })
    }
  }
  handle_onMobileChange(mobile){
    //console.log('passed mobile: ', mobile);
    if(!(/^\d{10}$/.test(mobile)) ||
        parseInt(mobile, 10) < 6999999999 ||
        mobile === "9999999999" ||
         mobile === "8888888888" ||
          mobile === "7777777777")
                 {
      this.setState({
        Mobile_error: true,
      }, function () {
        //console.error('mobile number is invalid/undefined. . .');
      })
    }
    else {
      this.setState({
        Mobile_error: false,
        Mobile: mobile
      }, function () {
        //console.info('Main updated Main Mobile: ', this.state.Mobile);
      })
    }
  }
  handle_onCompanyNameChange(CompanyName){

    //console.error('passed CompanyName: ', CompanyName);
    if(CompanyName===''||!CompanyName){
      this.setState({
          CompanyName_error: true,
          CompanyName: ''
        },
        function () {
          //console.error('CompanyName not entered . . .');
        }
      )
    }
    else {
      this.setState({
        CompanyName_error: false,
        CompanyName: CompanyName
      }, function () {
        //console.info('Main updated Main CompanyName: ', this.state.CompanyName);
      })
    }
  }
  handle_onCheckboxAuthChange(value){
    //console.log('handle_onCheckboxAuthChange passed value: ', value);
    //console.log('this.state.AuthoriseICICI: ', this.state.AuthoriseICICI);
    if(this.state.AuthoriseICICI === value){
      this.setState({
        AuthoriseICICI: !value,
        AuthoriseICICI_unauthorized: true,
      })
    }
    else {
      this.setState({
        AuthoriseICICI: value,
        AuthoriseICICI_unauthorized: false
      })
    }
  }
  render(){
    let display = this.state.SubmittedSuccess;
    return (<div className="CreditCardFormContainer">
      {this.state.SubmittedSuccess && this.state.Eligible && <EligibleSubmitted/>}
      {this.state.SubmittedSuccess && !this.state.Eligible && <IneligibleSubmitted/>}
      <div className={`CreditCardFormWrapper CreditCardFormSubmitted ${display}`}>
        <CreditCardHeaderImg/>
        <form onSubmit={(event)=>{event.preventDefault(); this.handleSubmit()}}>
          <fieldset>
            <legend></legend>
            <label></label>
            <CreditCardSelectCity error={this.state.City_error} onCityChange={this.handle_onCityChange} />
            <CreditCardSelectDOB
              error={this.state.DOBerror}
              errorMessage={this.state.DOBactiveErrorMessage}
              onDOBChange={this.handle_onDOBChange}/>

            <CreditCardSelectEmploymentType
              onEmploymentTypeChange={this.handle_onEmploymentTypeChange}
              EmploymentType_Undefined={this.state.EmploymentType_Undefined}
              MonthlyTakeHomeValue_Undefined={this.state.MonthlyTakeHomeValue_Undefined}
              LastYearGrossTotalIncome_Undefined={this.state.LastYearGrossTotalIncome_Undefined}
              />
            <CreditCardSelectRelationshipBank error={this.state.RelationType_error} onRelationShipBankChange={this.handle_onRelationShipBankChange}/>
            <CreditCardInputName error={this.state.Name_error}  onNameChange={this.handle_onNameChange}/>
            <CreditCardInputEmail error={this.state.Email_error} onEmailChange={this.handle_onEmailChange}/>
            <CreditCardInputMobile error={this.state.Mobile_error} onMobileChange={this.handle_onMobileChange}/>
            <CreditCardInputCompanyName  error={this.state.CompanyName_error} onCompanyNameChange={this.handle_onCompanyNameChange}/>
            <CreditCardCheckboxAuth error={this.state.AuthoriseICICI_unauthorized}
              value='true'
              mainValue={this.state.AuthoriseICICI}
              onCheckboxAuthChange={this.handle_onCheckboxAuthChange}/>
            <div className='formRowElem centerContentX' >
              <button type='submit' className='submit submitBG '>Submit</button>
            </div>
          </fieldset>
        </form>
    </div>


    </div>)
  }
}

export default CreditCardFormContainer
