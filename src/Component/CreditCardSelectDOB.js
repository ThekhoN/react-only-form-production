import React, {Component} from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import DisplayError from '../Component/DisplayError'

class CreditCardSelectDOB extends Component {
  constructor(props){
    super(props)
    this.state = {
      //startDate: moment().subtract(23, "years"),
      DOB: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
  }
  handleChange(date){
    this.setState({
      startDate: date,
      DOB:date._d
    }, function () {
      this.props.onDOBChange(this.state.DOB);
      //console.info('passed DOB: ', this.state.DOB);
    });
    //this.props.onDOBChange(this.state.DOB);
  }
  handleOnBlur(){
    if(this.state.DOB === ''){
        this.props.onDOBChange(this.state.DOB);
        ////console.error('DOB not defined. . .');
    }
  }
  render(){
    return (<div className='formRowElem CreditCardSelectDOB'>
    <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        onBlur={this.handleOnBlur}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        dateFormat="DD/MM/YYYY"
        minDate={moment().subtract(65, "years")}
        maxDate={moment().subtract(23, "years")}
        placeholderText="Please click to select your Date of Birth"
         />
        {this.props.error && <DisplayError message={this.props.errorMessage}/>}
  </div>)
  }
}


export default CreditCardSelectDOB
