import React, {Component} from 'react'
import OptionUnit from '../Component/OptionUnit'
import DisplayError from '../Component/DisplayError'

const TopCities = [
    {"value":"AHMEDABAD","label":"AHMEDABAD"},
    {"value":"BANGALORE","label":"BANGALORE"},
    {"value":"BHOPAL","label":"BHOPAL"},
    {"value":"CHENNAI","label":"CHENNAI"},
    {"value":"DELHI","label":"DELHI"},
    {"value":"HYDERABAD","label":"HYDERABAD"},
    {"value":"JAIPUR","label":"JAIPUR"},
    {"value":"MUMBAI","label":"MUMBAI"},
    {"value":"NASHIK","label":"NASHIK"},
    {"value":"PUNE","label":"PUNE"},
    {"value":"SURAT","label":"SURAT"}
]

const OtherCities = [
    {"value":"24 PARAGANAS","label":"24 PARAGANAS"},
    {"value":"AGRA","label":"AGRA"},
    {"value":"AHMEDNAGAR","label":"AHMEDNAGAR"},
    {"value":"AMBALA","label":"AMBALA"},
    {"value":"AMRAVATI","label":"AMRAVATI"},
    {"value":"ANAND","label":"ANAND"},
    {"value":"ANKELESHWAR","label":"ANKELESHWAR"},
    {"value":"ASANSOL","label":"ASANSOL"},
    {"value":"AURANGABAD","label":"AURANGABAD"},

    {"value":"BHARUCH","label":"BHARUCH"},
    {"value":"BHAVNAGAR","label":"BHAVNAGAR"},
    {"value":"BHILAI","label":"BHILAI"},
    {"value":"BHIWADI","label":"BHIWADI"},
    {"value":"BHUBANESHWAR","label":"BHUBANESHWAR"},
    {"value":"BHUJ","label":"BHUJ"},

    {"value":"CALICUT","label":"CALICUT"},
    {"value":"CHANDIGARH","label":"CHANDIGARH"},
    {"value":"CHIDAMBARAM","label":"CHIDAMBARAM"},
    {"value":"COCHIN","label":"COCHIN"},
    {"value":"COIMBATORE","label":"COIMBATORE"},
    {"value":"CUDDALORE","label":"CUDDALORE"},
    {"value":"CUTTACK","label":"CUTTACK"},

    {"value":"DEHARADUN","label":"DEHARADUN"},
    {"value":"DEHRADUN","label":"DEHRADUN"},
    {"value":"DEWAS","label":"DEWAS"},
    {"value":"DHARWAD","label":"DHARWAD"},
    {"value":"DIBRUGARH","label":"DIBRUGARH"},
    {"value":"DURG","label":"DURG"},
    {"value":"DURGAPUR","label":"DURGAPUR"},

    {"value":"ERANAKULAM","label":"ERANAKULAM"},
    {"value":"ERODE","label":"ERODE"},

    {"value":"FARIDABAD","label":"FARIDABAD"},

    {"value":"GANDHIDHAM","label":"GANDHIDHAM"},
    {"value":"GANDHINAGAR","label":"GANDHINAGAR"},
    {"value":"GHAZIABAD","label":"GHAZIABAD"},
    {"value":"GOA","label":"GOA"},
    {"value":"GUNTUR","label":"GUNTUR"},
    {"value":"GURGAON","label":"GURGAON"},
    {"value":"GUWAHATI","label":"GUWAHATI"},

    {"value":"HISAR","label":"HISAR"},

    {"value":"ICHALKARANJI","label":"ICHALKARANJI"},
    {"value":"INDORE","label":"INDORE"},

    {"value":"JABALPUR","label":"JABALPUR"},
    {"value":"JAMNAGAR","label":"JAMNAGAR"},
    {"value":"JAMSHEDPUR","label":"JAMSHEDPUR"},
    {"value":"JODHPUR","label":"JODHPUR"},
    {"value":"JUNAGADH","label":"JUNAGADH"},

    {"value":"KAKINADA","label":"KAKINADA"},
    {"value":"KANPUR","label":"KANPUR"},
    {"value":"KARNAL","label":"KARNAL"},
    {"value":"KHARAGPUR","label":"KHARAGPUR"},
    {"value":"KOCHI","label":"KOCHI"},
    {"value":"KOLHAPUR","label":"KOLHAPUR"},
    {"value":"KOLKATA","label":"KOLKATA"},
    {"value":"KOTA","label":"KOTA"},
    {"value":"KOTTAYAM","label":"KOTTAYAM"},
    {"value":"KOZHIKODE","label":"KOZHIKODE"},

    {"value":"LUCKNOW","label":"LUCKNOW"},
    {"value":"LUDHIANA","label":"LUDHIANA"},

    {"value":"MADURAI","label":"MADURAI"},
    {"value":"MALDA","label":"MALDA"},
    {"value":"MANESAR","label":"MANESAR"},
    {"value":"MEERUT","label":"MEERUT"},
    {"value":"MEHSANA","label":"MEHSANA"},
    {"value":"MOHALI","label":"MOHALI"},
    {"value":"MUNDRA","label":"MUNDRA"},

    {"value":"NADIAD","label":"NADIAD"},
    {"value":"NAGPUR","label":"NAGPUR"},
    {"value":"NAVI MUMBAI","label":"NAVI MUMBAI"},
    {"value":"NAVSARI","label":"NAVSARI"},
    {"value":"NEEMRANA","label":"NEEMRANA"},
    {"value":"NELLORE","label":"NELLORE"},
    {"value":"NEW DELHI","label":"NEW DELHI"},
    {"value":"NOIDA","label":"NOIDA"},

    {"value":"PANCHKULA","label":"PANCHKULA"},
    {"value":"PANIPAT","label":"PANIPAT"},
    {"value":"PATIALA","label":"PATIALA"},
    {"value":"PATNA","label":"PATNA"},
    {"value":"PONDICHERRY","label":"PONDICHERRY"},

    {"value":"RAIPUR","label":"RAIPUR"},
    {"value":"RAJAHMUNDRY","label":"RAJAHMUNDRY"},
    {"value":"RAJKOT","label":"RAJKOT"},
    {"value":"RANCHI","label":"RANCHI"},
    {"value":"REWARI","label":"REWARI"},
    {"value":"ROURKELA","label":"ROURKELA"},

    {"value":"SALEM","label":"SALEM"},
    {"value":"SAMBALPUR","label":"SAMBALPUR"},
    {"value":"SANGLI","label":"SANGLI"},
    {"value":"SATARA","label":"SATARA"},
    {"value":"SECUNDERABAD","label":"SECUNDERABAD"},
    {"value":"SHIMLA","label":"SHIMLA"},
    {"value":"SILIGURI","label":"SILIGURI"},
    {"value":"SILVASSA","label":"SILVASSA"},
    {"value":"SOLAPUR","label":"SOLAPUR"},
    {"value":"SONIPAT","label":"SONIPAT"},

    {"value":"THRISSUR","label":"THRISSUR"},
    {"value":"TIRUPATHI","label":"TIRUPATHI"},
    {"value":"TRICHY","label":"TRICHY"},
    {"value":"TRIVANDRUM","label":"TRIVANDRUM"},

    {"value":"UDAIPUR","label":"UDAIPUR"},

    {"value":"VADODARA","label":"VADODARA"},
    {"value":"VALSAD","label":"VALSAD"},
    {"value":"VAPI","label":"VAPI"},
    {"value":"VELLORE","label":"VELLORE"},
    {"value":"VIJAYWADA","label":"VIJAYWADA"},
    {"value":"VISAKHAPATNAM","label":"VISAKHAPATNAM"},

    {"value":"WARANGAL","label":"WARANGAL"},

    {"value":"ZIRAKPUR","label":"ZIRAKPUR"},

    {"value":"DELHI NCR","label":"DELHI NCR"}
]

const errorCreditCardSelectCity = `Please select your city`
let select_CreditCardSelectCity;
class CreditCardSelectCity extends Component {
  constructor(props){
    super(props)
    this.handle_onChange = this.handle_onChange.bind(this)
  }
  handle_onChange(){
    //console.log('input.value onBlur: ', select_CreditCardSelectCity.value)
    if(select_CreditCardSelectCity.value === ''){
      this.props.onCityChange('')
    }
    else {
      this.props.onCityChange(select_CreditCardSelectCity.value)
    }
  }
  render(){
    return (<div className='formRowElem CreditCardSelectCity'>
      <label className="formRowElem_nonMarginBot">
        <select
          ref={node=>{select_CreditCardSelectCity=node}}
          placeholder="Current city you live in"
          onBlur={this.handle_onChange}
          onChange={this.handle_onChange}
          value={this.props.value}
          >
          <OptionUnit  value="" label="Where do you live currently?"/>
          <optgroup label="Top Cities">
            {TopCities.map((item, key) => (<OptionUnit key={key} {...item} />))}
          </optgroup>
          <optgroup label="Other Cities">
            {OtherCities.map((item, key) => (<OptionUnit key={key} {...item} />))}
          </optgroup>
        </select>
      </label>
      {this.props.error && <DisplayError message={errorCreditCardSelectCity}/>}


    </div>)
  }
}


export default CreditCardSelectCity;
