import React, {Component} from 'react'
import DisplayError from '../Component/DisplayError'

const errorCreditCardInputMobile = `Please enter a valid 10-digit mobile number`
let input_CreditCardInputMobile;
class CreditCardInputMobile extends Component {
  constructor(props){
    super(props)
    this.handle_onChange = this.handle_onChange.bind(this)
  }
  handle_onChange(){
    this.props.onMobileChange(input_CreditCardInputMobile.value)
  }
  render(){
    return (<div className='formRowElem CreditCardInputMobile'>
      <label><input
        ref={node=>{input_CreditCardInputMobile=node}}
        type='tel'
        placeholder="Mobile"
        maxLength="10"
        size="10"
        pattern="[0-9]{10}"
        name="mobile"
        autoComplete="mobile"
        onBlur={this.handle_onChange}
        onChange={this.handle_onChange}
        /></label>
        {this.props.error && <DisplayError message={errorCreditCardInputMobile}/>}
    </div>)
  }
}

export default CreditCardInputMobile
