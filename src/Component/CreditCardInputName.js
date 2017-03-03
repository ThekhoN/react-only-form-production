import React, {Component} from 'react'
import DisplayError from '../Component/DisplayError'

const errorCreditCardInputName = `Please enter a valid name`
let input_CreditCardInputName;
class CreditCardInputName extends Component {
  constructor(props){
    super(props)
    this.handle_onChange = this.handle_onChange.bind(this)
  }
  handle_onChange(){
    this.props.onNameChange(input_CreditCardInputName.value)
  }
  render(){
    return (<div className='formRowElem CreditCardInputName'>
      <label><input
        ref={node=>{input_CreditCardInputName=node}}
        placeholder="Name"
        autoComplete='on'
        type='text'
        onBlur={this.handle_onChange}
        onChange={this.handle_onChange}
        /></label>
        {this.props.error && <DisplayError message={errorCreditCardInputName}/>}
    </div>)
  }
}


export default CreditCardInputName
