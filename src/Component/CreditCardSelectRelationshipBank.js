import React, {Component} from 'react'
import OptionUnit from '../Component/OptionUnit'
import DisplayError from '../Component/DisplayError'

const relationshipWithBankData = [
  {
    value:'Salary',
    label:'Salary Account'
  },
  {
    value:'Current',
    label:'Savings Account or Current Account'
  },
  {
    value:'Loan',
    label:'Home Loan, Car Loan, Personal Loan or Credit Card'
  },
  {
    value:'NoRel',
    label:'No relationship'
  }
]

const errorCreditCardSelectRelationshipBank = `Please select your relationship with ICICI`
let select_CreditCardSelectRelationshipBank
class CreditCardSelectRelationshipBank extends Component {
  constructor(props){
    super(props)
    this.handle_onBlur = this.handle_onBlur.bind(this)
    this.handle_onChange = this.handle_onChange.bind(this)
  }
  handle_onChange(){
    if(select_CreditCardSelectRelationshipBank.value === ''){
      this.props.onRelationShipBankChange('')
    }
    else {
      this.props.onRelationShipBankChange(select_CreditCardSelectRelationshipBank.value)
    }
  }
  handle_onBlur(){
    //console.log('input.value onBlur: ', select_CreditCardSelectRelationshipBank.value)
    if(select_CreditCardSelectRelationshipBank.value === ''){
      this.props.onRelationShipBankChange('')
    }
    else {
      this.props.onRelationShipBankChange(select_CreditCardSelectRelationshipBank.value)
    }
  }
  render(){
    return (<div className='formRowElem CreditCardSelectRelationshipBank'>
        <label>
              <select
                ref={node=>{select_CreditCardSelectRelationshipBank=node}}
                onBlur={this.handle_onBlur}
                onChange={this.handle_onChange}
                placeholder="Relationship with ICICI Bank">
                  <OptionUnit value="" label="Relationship with ICICI Bank"/>
                  {relationshipWithBankData.map((item, key)=>(<OptionUnit {...item} key={key} />))}
              </select>
          </label>
          {this.props.error && <DisplayError message={errorCreditCardSelectRelationshipBank}/>}
    </div>)
  }
}

export default CreditCardSelectRelationshipBank;
