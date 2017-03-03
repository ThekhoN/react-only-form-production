import React, {Component} from 'react'
import DisplayError from '../Component/DisplayError'
import IsLoading from '../Component/IsLoading'
import axios from 'axios'
let companyURL = 'https://www.m-icicibank.com/api/credit-card/CC/GetCompany?prefix=';

const CreditCardDropDownCompanyName = ({CompanyNames, onClickCompanyNameList}) => (<div className='CreditCardDropDownCompanyName'>
  <ul className='CreditCardDropDownCompanyName_ul'>
    {CompanyNames.map((name, key) => (<li
      onClick={()=>{onClickCompanyNameList(name)}}
      key={key}>
      {name}
    </li>))}
  </ul>
</div>)

const errorCreditCardInputCompanyName = `Please choose or enter your company name`
let defaultState_CreditCardInputCompanyName = {
  Name_pre:'',
  CompanyNames:[],
  lastCompanyNames:[],
  showDropDown:false,
  isLoading: false,
  selectedCompanyName:'',
  error:false
}

let inputCreditCardInputCompanyName;
class CreditCardInputCompanyName extends Component {
  constructor(props){
    super(props)
    this.state = defaultState_CreditCardInputCompanyName;
    this.handle_CompanyNameChange = this.handle_CompanyNameChange.bind(this)
    this.getNewCompanyNames = this.getNewCompanyNames.bind(this)
    this.handle_onClickCompanyNameList = this.handle_onClickCompanyNameList.bind(this)
    this.handle_onBlur = this.handle_onBlur.bind(this)
  }
  handle_onBlur(){
    //console.log('on blur event running. . .: ', inputCreditCardInputCompanyName);
    //if(inputCreditCardInputCompanyName.value==='' || inputCreditCardInputCompanyName.value === 'Company Name' || this.state.lastCompanyNames.indexOf(inputCreditCardInputCompanyName.value) < 0 ){
    if(inputCreditCardInputCompanyName.value==='' || inputCreditCardInputCompanyName.value === 'Company Name' ){
      //console.error('Please choose a valid Company. . .')
      this.setState({
        //...defaultState_CreditCardInputCompanyName,
        ...this.state,
        error:true
      },function () {
        this.props.onCompanyNameChange('')
      })
    }
    else {
      this.setState({
        selectedCompanyName:inputCreditCardInputCompanyName.value
      }, ()=>{
        //console.log('updated state: ', this.state);
        this.props.onCompanyNameChange(this.state.selectedCompanyName)
      })
    }
  }
  handle_onClickCompanyNameList(name){
    //console.log('clicked companyName: ', name);
    this.setState({
      ...this.state,
      error: false,
      selectedCompanyName:name,
      lastSelectedCompanyName: name,
      showDropDown: false,
    }, function () {
      //console.log('CreditCardInputCompanyName updatedState: ', this.state);
      //set value of input fuck
      inputCreditCardInputCompanyName.value = name;
      if(!this.state.error){
          //console.info('onClickList no error at Local, dispatchedCompanyName: ', this.state.selectedCompanyName)
          this.props.onCompanyNameChange(name)
      }
      else {
          //console.error('error at Local, NOT dispatchedCompanyName: ', this.state.selectedCompanyName)
      }

    }.bind(this))
  }
  handle_CompanyNameChange(){
    if(inputCreditCardInputCompanyName.value.length > 4){
      this.setState({
        showDropDown: false
      })
    }
    //console.log('handle_CompanyNameChange');
    //console.log('inputCreditCardInputCompanyName.value.length: ', inputCreditCardInputCompanyName.value.length);
    this.setState({
      Name_pre: inputCreditCardInputCompanyName.value
    })
    //console.log('e.target: ', inputCreditCardInputCompanyName.value)
    if(inputCreditCardInputCompanyName.value === this.state.lastSelectedCompanyName){
      //console.info('changeCase: match with last selected so set selectedCompanyName: ', this.state.selectedCompanyName)
      this.setState({
        selectedCompanyName: inputCreditCardInputCompanyName.value,
        error: false
      }, function () {
          //console.info('onChangeInput no error at Local, dispatchedCompanyName: ', this.state.selectedCompanyName)
          this.props.onCompanyNameChange(this.state.selectedCompanyName)
      })
    }
    else if(inputCreditCardInputCompanyName.value === '' || inputCreditCardInputCompanyName.value.length > 4){
      //console.info('changeCase: empty/undefined')
      this.setState({
        Name_pre: '',
        CompanyNames: [],
        isLoading: false,
        selectedCompanyName:''
      })
    }
    else {
      //console.info('changeCase: fetchData')
      setTimeout(function(){
        this.getNewCompanyNames();
      }.bind(this), 100)
    }
  }
  getNewCompanyNames(){
    this.setState({
      isLoading: true
    })
    //console.log('this.state.Name_pre:', this.state.Name_pre);

      //this.state.Name_pre.length > selectedCompanyName)

    let new_url = `${companyURL}${this.state.Name_pre}`

    // +++++ axios GET +++++ //

      axios.get(new_url)
        .then(function (response) {
            //console.log('response from XHR: ', response);
            const data = response.data;
            if(data.length < 1){
              this.setState({
                showDropDown: false,
                isLoading: false
              })
            }
            else {
              this.setState({
                CompanyNames:data,
                lastCompanyNames:data,
                showDropDown: true,
                isLoading: false
              })
            }
          }.bind(this))
        .catch(function (error) {
          //console.log('error in axios getNewCompanyNames: ', error);
        })
    // +++++ / axios GET +++++ //


    // +++++ raw xhr +++++ //
    /*
    XHR_req(new_url, function (response) {
      //console.log('response from XHR: ', response);
      const data = response;
      if(data.length < 1){
        this.setState({
          showDropDown: false,
          isLoading: false
        })
      }
      else {
        this.setState({
          CompanyNames:data,
          lastCompanyNames:data,
          showDropDown: true,
          isLoading: false
        })
      }
    }.bind(this))
    */
  }
  render(){
    return (<div className='formRowElem CreditCardInputCompanyName loaderParentRelative'>
      <label>
        <input
        ref={node=>{inputCreditCardInputCompanyName=node}}
        placeholder='Company Name'
        type='text'
        //value={this.state.selectedCompanyName}
        onBlur={this.handle_onBlur}
        onChange={this.handle_CompanyNameChange}/></label>
        {this.state.isLoading && <IsLoading/>}
        {this.state.showDropDown && <CreditCardDropDownCompanyName
          onClickCompanyNameList={this.handle_onClickCompanyNameList}
          CompanyNames={this.state.CompanyNames}/>}
        {this.props.error && <DisplayError message={errorCreditCardInputCompanyName}/>}
    </div>)
  }
}

export default CreditCardInputCompanyName
