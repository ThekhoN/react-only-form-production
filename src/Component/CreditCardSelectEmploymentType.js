import React, {Component} from 'react'
import OptionUnit from '../Component/OptionUnit'
import DisplayError from '../Component/DisplayError'

const TypeOfEmploymentData = [
  {
    value:'salary',
    label:'Salaried'
  },
  {
    value:'self1',
    label:'Self Employed (Professional)'
  },
  {
    value:'self2',
    label:'Self Employed (Business)'
  }
]

const MonthlyTakeHomeComponent = ({onMonthlyTakeHomeChange}) => {
  let input;
  return (<div
    className='formRowElem noMarginBot marginTopUnit MonthlyTakeHomeComponent'>
    <input
      ref={node=>{input=node}}
      type='text'
      onChange={()=>{
            onMonthlyTakeHomeChange(input.value)
        }
      }
      onBlur={()=>{
        onMonthlyTakeHomeChange(input.value)
      }}
      placeholder='Month take home salary'/>
  </div>
  )
}

const IncomeTaxAcknowledgedByITRadio = ({onIncomeTaxAcknowledgedByITRadioChange}) => {
  let input1, input2;
  return (<div className='formRowElem noMarginBot'>
          <label className='IncomeTaxAcknowledgedByITRadioLabel' >Is Income Tax Return duly acknowledged by Income Tax department?</label>
          <div className='formRowElem noMarginBot'>
            <div className='radioUnitContainer'>
              <input
                ref={node1=>{input1=node1}}
                type='radio'
                name='IncomeTaxAcknowledgedByIT'
                value='yes'
                defaultChecked
                onChange={()=>{
                  onIncomeTaxAcknowledgedByITRadioChange(input1.value)
                }}/>
              <label>Yes</label>
            </div>
            <div className='radioUnitContainer'>
              <input
                ref={node2=>{input2=node2}}
                type='radio'
                name='IncomeTaxAcknowledgedByIT'
                value='no'
                onChange={()=>{
                  onIncomeTaxAcknowledgedByITRadioChange(input2.value)
                }}/>
              <label>No</label>
            </div>
          </div>
    </div>)
}


let input_LastYearGrossTotalIncomeInput;
const LastYearGrossTotalIncomeInput = ({onLastYearGrossTotalIncomeInputChange}) => {
  return (<div className='formRowElem'>
    <label><input
      type='text'
      ref={node=>{input_LastYearGrossTotalIncomeInput=node}}
      onChange={()=>{
          onLastYearGrossTotalIncomeInputChange(input_LastYearGrossTotalIncomeInput.value)
      }}
      placeholder='Last year gross total income'/></label>
    </div>
  )
}

let defaultStateLastYearGrossTotalIncomeComponent = {
  LastYearGrossTotalIncome: '',
  IncomeTaxAcknowledgedByIT: 'yes'
}

class LastYearGrossTotalIncomeComponent extends Component {
  constructor(props){
    super(props)
    this.state= defaultStateLastYearGrossTotalIncomeComponent
    this.handle_onLastYearGrossTotalIncomeInputChange = this.handle_onLastYearGrossTotalIncomeInputChange.bind(this)
    this.handle_onIncomeTaxAcknowledgedByITRadioChange = this.handle_onIncomeTaxAcknowledgedByITRadioChange.bind(this)
  }
  handle_onLastYearGrossTotalIncomeInputChange(value){
    if(isNaN(value)){
      //console.error('LastYearGrossTotalIncome is not a number');
      this.props.onLastYearGrossTotalIncomeChange(defaultStateLastYearGrossTotalIncomeComponent)
    }
    else {
        //console.log('handle_onLastYearGrossTotalIncomeInputChange value: ', value);
        this.setState({
            ...this.state,
            LastYearGrossTotalIncome: value
        },
        function () {
          this.props.onLastYearGrossTotalIncomeChange(this.state)
        }
      )
    }
  }
  handle_onIncomeTaxAcknowledgedByITRadioChange(acknowledgementStatus){
    //console.error('acknowledgementStatus: ', acknowledgementStatus);
    this.setState({
        ...this.state,
        IncomeTaxAcknowledgedByIT: acknowledgementStatus
    },
    function () {
      this.props.onLastYearGrossTotalIncomeChange(this.state)
    }
  )
  }
  render(){
    return (<div className='formRowElem noMarginBot marginTopUnit LastYearGrossTotalIncomeComponent'>
      <LastYearGrossTotalIncomeInput
        onLastYearGrossTotalIncomeInputChange={this.handle_onLastYearGrossTotalIncomeInputChange}/>
      <IncomeTaxAcknowledgedByITRadio
        onIncomeTaxAcknowledgedByITRadioChange={this.handle_onIncomeTaxAcknowledgedByITRadioChange}/>
    </div>
    )
  }
}

const error = {
    EmploymentType_Undefined: "Please select your employment type",
    MonthlyTakeHomeValue_Undefined: "Please enter your Monthly Take Home Salary",
    LastYearGrossTotalIncome_Undefined: "Please enter your Last Year's Gross Total Income",
    InvalidIncomeFormat: "Please enter your income in numbers"
}

let defaultState_CreditCardSelectEmploymentType = {
  EmploymentType:'',
  MonthlyTakeHomeValue:'',
  LastYearGrossTotalIncome:'',
  IncomeTaxAcknowledgedByIT:'yes',
  InvalidIncomeFormat: false,
  //displayToggle
  show_MonthlyTakeHome:false,
  show_LastYearGrossTotalIncome:false,
}

let select_CreditCardSelectEmploymentType;
class CreditCardSelectEmploymentType extends Component {
  constructor(props){
    super(props)
    this.state = defaultState_CreditCardSelectEmploymentType
    this.handleChange = this.handleChange.bind(this)
    this.handle_onMonthlyTakeHomeChange = this.handle_onMonthlyTakeHomeChange.bind(this)
    this.handle_onLastYearGrossTotalIncomeChange = this.handle_onLastYearGrossTotalIncomeChange.bind(this)
  }
  handleChange(){
    //console.log('changing. . . passed value: ',  select_CreditCardSelectEmploymentType.value);
    //Reset to default all value if this changes
    if(select_CreditCardSelectEmploymentType.value === '' || !select_CreditCardSelectEmploymentType.value){
      this.setState({
          show_MonthlyTakeHome:false,
          show_LastYearGrossTotalIncome:false
      })
      //dispatch defaultState ~ reset state EmploymentType
      this.props.onEmploymentTypeChange(defaultState_CreditCardSelectEmploymentType);
    }
    else {
      if(select_CreditCardSelectEmploymentType.value==='salary'){
        //console.info('salary case');
        this.setState({
          ...defaultState_CreditCardSelectEmploymentType,
          EmploymentType:'salary',
          show_MonthlyTakeHome: true,
        },
        function () {
          //console.log('updatedState local: ', this.state);
          this.props.onEmploymentTypeChange(this.state)
        })
      }

      else if(select_CreditCardSelectEmploymentType.value==='self1' || select_CreditCardSelectEmploymentType.value==='self2'){
        //console.info('self1/self2 case');
        this.setState({
          ...defaultState_CreditCardSelectEmploymentType,
          EmploymentType:select_CreditCardSelectEmploymentType.value,
          show_LastYearGrossTotalIncome: true,
        },
        function () {
          //reset input value
          input_LastYearGrossTotalIncomeInput.value = '';
          //console.log('updatedState local: ', this.state);
          this.props.onEmploymentTypeChange(this.state)
        })
      }
    }
  }

  handle_onMonthlyTakeHomeChange(value){
    //console.log('passed MonthlyTakeHomeChange value: ', value);
    this.setState({
      ...this.state,
      show_MonthlyTakeHome:true,
      MonthlyTakeHomeValue:value
    },function () {
      this.props.onEmploymentTypeChange(this.state);
    })
  }

  handle_onLastYearGrossTotalIncomeChange(details){
    this.setState({
      ...this.state,
      show_LastYearGrossTotalIncome:true,
      LastYearGrossTotalIncome: details.LastYearGrossTotalIncome,
      IncomeTaxAcknowledgedByIT: details.IncomeTaxAcknowledgedByIT

    },function () {
      this.props.onEmploymentTypeChange(this.state);
    })
  }

  render(){
    return (<div className='formRowElem CreditCardSelectEmploymentType'>
              <div className='formRowElem noMarginBot'>
              <label>
                    <select
                      ref={node=>{select_CreditCardSelectEmploymentType=node}}
                      placeholder="Type of Employment"
                      onChange={this.handleChange}
                      onBlur={this.handleChange}
                      >
                        <OptionUnit value="" label="Type of Employment"/>
                        {TypeOfEmploymentData.map((item, key)=>(<OptionUnit {...item} key={key} />))}
                    </select>
                </label>
                {this.props.EmploymentType_Undefined && <DisplayError message={error.EmploymentType_Undefined}/>}
                {!this.props.EmploymentType_Undefined && !this.props.LastYearGrossTotalIncome_Undefined && this.props.MonthlyTakeHomeValue_Undefined && <DisplayError message={error.MonthlyTakeHomeValue_Undefined}/>}
                {!this.props.EmploymentType_Undefined && !this.props.MonthlyTakeHomeValue_Undefined &&  this.props.LastYearGrossTotalIncome_Undefined && <DisplayError message={error.LastYearGrossTotalIncome_Undefined}/>}
                </div>
                {this.state.show_MonthlyTakeHome && <MonthlyTakeHomeComponent onMonthlyTakeHomeChange={this.handle_onMonthlyTakeHomeChange}/>}
                {this.state.show_LastYearGrossTotalIncome && <LastYearGrossTotalIncomeComponent onLastYearGrossTotalIncomeChange={this.handle_onLastYearGrossTotalIncomeChange}/>}
    </div>)
  }
}


export default CreditCardSelectEmploymentType;
