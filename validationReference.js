
        function validateForm() {
            if (document.getElementById('city').value == 'emt') {
                alert("Please select city where you currently live in");
                document.getElementById('city').focus();
                return false;
            }

            var dob = document.forms["form1"]["txtDOB"].value;
            if (dob == null || dob == "" || dob == "Date of Birth") {
                alert("Please Enter Your Date of Birth");
                return false;
            }

            if (document.getElementById('choice').value == 'emt') {
                alert('Please select Type of Employment');
                document.getElementById('choice').focus();
                return false;
            }

            if (document.getElementById('salfeild').style.display != "none") {
                var salaryfld = document.getElementById('sal').value;
                if (salaryfld == null || salaryfld == "" || salaryfld == "Monthly take home salary") {
                    alert("Please Enter Monthly take home salary.");
                    document.getElementById('sal').focus();
                    return false;
                }
                /*else if (parseInt(salaryfld) < 17500)
                {
                    alert("Monthly take home salary cannot be less than 17500.");
                    document.getElementById('sal').focus();
                    return false;
                }*/
            }

            if (document.getElementById('incomefeild').style.display != "none") {
                var incomefld = document.getElementById('income').value;
                if (incomefld == null || incomefld == "" || incomefld == "Last year gross total income") {
                    alert("Please Enter Last year gross total income.");
                    document.getElementById('income').focus();
                    return false;
                }
                /*else if (parseInt(salaryfld) < 250000)
                {
                    alert("Last year gross total income cannot be less than 250000.");
                    document.getElementById('income').focus();
                    return false;
                }*/
            }
            if (document.getElementById('Div_acknowledged_IT').style.display != "none") {

                if ($("input[name='rdb_acknowledged_IT']").is(':checked')) {

                    document.getElementById("Is_acknowledged_IT").value = $("input[name='rdb_acknowledged_IT']:checked").val();
                }
                else {

                    alert('Is Income Tax Return duly acknowledged by Income Tax department?');
                    return false;
                }
            }

            if (document.getElementById('relationship').value == 'emtRel') {
                alert('Please select Relationship with ICICI Bank');
                document.getElementById('relationship').focus();
                return false;
            }

            var xName = document.forms["form1"]["txtName"].value;
            if (xName == null || xName == "" || xName == "Name") {
                alert("Please Enter Your Name");
                return false;
            }

            var Zemail = document.forms["form1"]["txtEmail"].value;
            if (Zemail == null || Zemail == "" || Zemail == "Email Id") {
                alert("Please Enter Your Email");
                return false;
            }

            var xemail = document.forms["form1"]["txtEmail"].value;
            var atpos = xemail.indexOf("@");
            var dotpos = xemail.lastIndexOf(".");
            if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= xemail.length) {
                alert("Please Enter a valid Email");
                return false;
            }

            var yMobile = document.forms["form1"]["txtMobile"].value;
            if (/^\d{10}$/.test(yMobile)) {
                // value is ok, use it
            }
            else {
                alert("Invalid number; must be 10 digits only")

                document.getElementById('txtMobile').focus();
                return false;
            }

            if (yMobile == "9999999999" || yMobile == "8888888888" || yMobile == "7777777777" || yMobile == "6666666666" || yMobile == "5555555555" || yMobile == "4444444444" || yMobile == "3333333333" || yMobile == "2222222222" || yMobile == "1111111111" || yMobile == "0000000000") {
                alert("Please Enter valid mobile number.");
                return false;
            }
            if ((yMobile.substring(0, 1) == "0") || (yMobile.substring(0, 1) == "1") || (yMobile.substring(0, 1) == "2") || (yMobile.substring(0, 1) == "3") || (yMobile.substring(0, 1) == "4")) {
                alert("Please enter valid Mobile Number");
                return false;
            }

            if (document.getElementById('txtcompany') != null) {
                if (document.getElementById('txtcompany').value == "" || document.getElementById('txtcompany').value == "Company Name") {
                    alert("Please Enter Company Name");
                    document.getElementById("txtcompany").focus();
                    return false;
                }
            }

            if (dob == null || dob == "" || dob == "Date of Birth") {
            }
            else {
                var birthdayDate = new Date(dob);
                var dateNow = new Date();

                var years = dateNow.getFullYear() - birthdayDate.getFullYear();
                var months = dateNow.getMonth() - birthdayDate.getMonth();
                var days = dateNow.getDate() - birthdayDate.getDate();

                if (isNaN(years)) {
                    return false;
                }
                else {
                    if (months < 0 || (months == 0 && days < 0)) {
                        years = parseInt(years) - 1;
                    }

                    if (years >= 23) {
                        if (document.getElementById('choice').value == 'salary') {
                            if (years > 58) {
                                alert("Age cannot be more than 58 for Salaried professionals. Please enter appropriate Date of Birth.");
                                return false;
                            }
                        }
                        else if (document.getElementById('choice').value == 'self1' || document.getElementById('choice').value == 'self2') {
                            if (years > 65) {
                                alert("Age cannot be more than 65 for Self-employed professionals. Please enter appropriate Date of Birth.");
                                return false;
                            }
                        }
                    }
                    else {
                        alert("Age cannot be less than 23. Please enter appropriate Date of Birth.");
                        return false;
                    }
                }
            }

            if (document.forms["form1"]["chbx"].checked == false) {
                alert("Please Check 'I authorise ICICI Bank and its representatives to call, email or SMS me regarding ICICI Bank's products/services, its advantages and offers. This consent shall override any registration for DNC/NDNC'");
                return false;
            }

            $("#btnsubmit").hide();
            $("#btnloader").show();


        }
    