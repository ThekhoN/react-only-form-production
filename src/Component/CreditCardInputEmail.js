import React, {Component} from 'react'
import DisplayError from '../Component/DisplayError'

const errorCreditCardInputEmail = `Please enter a valid email address`
let input_CreditCardInputEmail
class CreditCardInputEmail extends Component {
  constructor(props){
    super(props)
    this.handle_onChange = this.handle_onChange.bind(this)
  }
  handle_onChange(){
    this.props.onEmailChange(input_CreditCardInputEmail.value)
  }
  render(){
    return (<div className='formRowElem CreditCardInputEmail'>
      <label><input
        ref={node=>{input_CreditCardInputEmail=node}}
        placeholder="Email"
        type='email'
        onChange={this.handle_onChange}
        onBlur={this.handle_onChange}
        /></label>
        {this.props.error && <DisplayError message={errorCreditCardInputEmail}/>}
    </div>)
  }
}

export default CreditCardInputEmail
