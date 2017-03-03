import React from 'react'
import DisplayError from '../Component/DisplayError'

const ToggleValue = (value, mainValue) => {
  //console.log('value: ', value)
  if(value===mainValue){
    return true;
  }
  else {
    return false;
  }
}

const errorMessageCreditCardCheckboxAuth = `Please check "I authorise ICICI Bank and its representatives to call, email or SMS me regarding
ICICI Bank's products/services, its advantages and offers. This consent shall override
any registration for DNC/NDNC"`

const CreditCardCheckboxAuth = ({value, mainValue, onCheckboxAuthChange, error}) => {
  let checkbox;
  return (<div className='formRowElem CreditCardCheckboxAuth'>
    <label>
    <input
      ref={node=>{checkbox=node}}
      value={value}
      checked={ToggleValue(value, mainValue)}
      onChange={()=>{
        onCheckboxAuthChange(checkbox.value)
      }}
      type="checkbox" />
      <span className='smallType'>I authorise ICICI Bank and its representatives to call, email or SMS me regarding
      ICICI Bank's products/services, its advantages and offers. This consent shall override
      any registration for DNC/NDNC</span>
    </label>
    {error && <DisplayError message={errorMessageCreditCardCheckboxAuth}/>}
  </div>)
}

export default CreditCardCheckboxAuth
