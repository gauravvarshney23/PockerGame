var Login = function() {
    var handleLogin = function() {
        $('#loginForm').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                loginUsername: {
                    required: true,
                    playerNameTest: true,
                    rangelength: [3,12]
                },
                loginPassword: {
                    required: true,
                    passwordTest: true
                }
            },

            messages: {
                loginUsername: {
                    required: "Username is required."
                },
                loginPassword: {
                    required: "Password is required."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit

            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                error.insertAfter(element);
            },

            submitHandler: function() {
                $('#spinner').show();
				$('#load').show();
				var username = $('#loginUsername').val();
				var pass = $('#loginPassword').val();
				
				$.getJSON('http://royalflush.in/app/login_query.php?callback=?','username='+username+'&pass='+ encodeURIComponent(pass),function(res){
						    if(res.loginStatus == "success"){
						    	toastr.success('Lets Play Game','Login Successful');
								
								//Remember me option is required for storing the user name and password in local storage
								if($('#rememberMe').prop("checked") == true){
									localStorage.setItem("uName", username);
									localStorage.setItem("uPassword", pass);
								} else{
									localStorage.removeItem("uName");
									localStorage.removeItem("uPassword");
								}
								
						    	var sessionKey1 = "http://166.62.32.78:8087/?LoginName="+username+"&SessionKey=" + res.sessionKey;
                        		//alert('lets start '+ sessionKey);
								localStorage.setItem("sessionID", sessionKey1);
								//$('#load').hide();
						    	 $('#loginForm').each(function () {
		                            this.reset();
		                        });
								
								$('#spinner').fadeOut(400,function(){
										window.location.href = "index.html";
									});
						    }
						    if(res.loginStatus == "failure"){
								$('#load').hide();
		                        if(res.failureReason == "noUsers"){
		                            toastr.error('Please add Users First..!','No Users Exists..!');
		                            $('#spinner').fadeOut(400);
		                        }
		                        if(res.failureReason == "noUserMatch"){
		                            toastr.error('Please try again..!','No User exists with this Username');
		                            $('#loginForm').each(function () {
		                                this.reset();
		                            });
		                            $('#spinner').fadeOut(400);
		                        }
		                        if(res.failureReason == "noPasswordMatch"){
		                            toastr.error('Please try again..!','WRONG PASSWORD');
		                            $('#loginForm').each(function () {
		                                this.reset();
		                            });
		                            $('#spinner').fadeOut(400);
		                        }
		                        if(res.failureReason == "noPassword"){
		                            toastr.error('Please try again..!','Please enter a Password');
		                            $('#loginForm').each(function () {
		                                this.reset();
		                            });
		                            $('#spinner').fadeOut(400);
		                        }
		                        if(res.failureReason == "noUsername"){
		                            toastr.error('Please try again..!','Please enter a Username First');
		                            $('#loginForm').each(function () {
		                                this.reset();
		                            });
		                            $('#spinner').fadeOut(400);
		                        }
		                       
		                        if(res.failureReason == "smsVerifyStatus"){
		                            toastr.error('WAIT..!','Please Verify your Phone First to Login');
		                            $('#loginForm').each(function () {
		                                this.reset();
										
		                            });
		                            $('#spinner').fadeOut(400,function(){
										window.location.href = "activate.html";
									});
		                        }
		                    }
						});
				
            }

        });

    }

    var handleForgetPassword = function() {

        $('#forgetForm').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                resetUsername: {
                    required: true,
                    playerNameTest: true,
                    rangelength: [3,12]
                }
            },
            messages: {
                resetUsername: {
                    required: "Username is required."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit

            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                error.insertAfter(element);
            },

            submitHandler: function() {
               $('#spinner').show();
               $.post( "https://royalflush.in/myaccount/commands/forgotPasswordQuery.php",$( "#forgetForm" ).serialize(), function( data ) {
                    if(data.forgotPasswordStatus == "success"){
                        toastr.success('Please check your email.! It may be into your JUNK folder.','Your Password Reset Request was Successful.!');
                        $('#forgetForm').each(function () {
                            this.reset();
                        });
                        jQuery('.loginForm').show();
                        jQuery('.forgetForm').hide();
                        $('#spinner').fadeOut(400);
                    }
                    if(data.forgotPasswordStatus == "failure"){
                        if(data.failureReason == "noEmailSent"){
                            toastr.error('Please try again..!','Password Reset Request email couldn"t be Sent.!');
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "networkError"){
                            toastr.error('Please try again..!','Network error.!');
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "gameServerError"){
                            toastr.error('Please try again..!','Unknown Network error.!');
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "noUserMatch"){
                            toastr.error('Please try again..!','No User exists with this Username');
                            $('#forgetForm').each(function () {
                                this.reset();
                            });
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "noUserExist"){
                            toastr.error('Please add Users First..!','No Users Exists..!');
                            $('#forgetForm').each(function () {
                                this.reset();
                            });
                            jQuery('.registerForm').show();
                            jQuery('.forgetForm').hide();
                            jQuery('.loginForm').hide();
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "noUsername"){
                            toastr.error('Please try again..!','No Username was entered.!');
                            $('#forgetForm').each(function () {
                                this.reset();
                            });
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "noFormSubmit"){
                            toastr.error('Please try again.!','Form Submit Error..!');
                            $('#spinner').fadeOut(400);
                        }
                    }
                    $('#spinner').fadeOut(400);
                }, "jsonp").fail(function() {
                    toastr.error('Please try again..!','There was a Network Error.!');
                    $('#spinner').fadeOut(400);
                });
            }
        });

        jQuery('#forget-password').click(function() {
            jQuery('.loginForm').hide();
            jQuery('.forgetForm').show();
        });

        jQuery('#back-btn').click(function() {
            jQuery('.loginForm').show();
            jQuery('.forgetForm').hide();
        });

    }

    var handleRegister = function() {

        jQuery.validator.addMethod("playerNameTest", function(value, element, params) {
            return this.optional(element) || /^[A-Za-z0-9\-_]+$/i.test(value);
        }, jQuery.validator.format("Allowed chars. a-z, A-Z, - (dash), _ (underscore), 0-9"));
        jQuery.validator.addMethod("realNameTest", function(value, element, params) {
            return this.optional(element) || /^[A-Za-z\- .]+$/i.test(value);
        }, jQuery.validator.format("Allowed chars. a-z, A-Z, (whitespace), .(dot),- (dash)"));
        jQuery.validator.addMethod("passwordTest", function(value, element, params) {
            return this.optional(element) || /^[A-Za-z0-9\-@%+!#$^?_]{8,20}$/i.test(value);
        }, jQuery.validator.format("Allowed chars. a-z, A-Z,0-9,-(dash),@,%,+,!,#,$,^,?,_"));


        $('.registerForm').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                playerName: {
                    required: true,
                    playerNameTest: true,
                    rangelength: [3,12]
                },
                signUpPassword: {
                    required: true,
                    passwordTest: true
                },
                retypePassword: {
                    required: true,
                    passwordTest: true,
                    equalTo: "#signUpPassword"
                },
                realFullName: {
                    required: true,
                    realNameTest: true,
                    rangelength: [5,30]
                },
                contactEmail: {
                    required: true,
                    email: true
                },
                contactPhone: {
                    required: true,
                    minlength: 10,
                    digits: true
                },
                playerState: {
                    required: true
                },
                playerCity: {
                    required: true,
                    realNameTest: true,
                    rangelength: [3,30]

                },
                birthYear: {
                    required: true
                },
                referrerCode: {
                    required: true,
                    playerNameTest: true,
                    rangelength: [3,12]
                },
                tnc: {
                    required: true
                }
            },

            messages: { // custom messages for radio buttons and checkboxes
                tnc: {
                    required: "Please accept our Terms of Service & Privacy Policy."
                },
                contactPhone: {
                    minlength: "Please enter valid 10 digits mobile number"
                },
                signUpPassword:{
                    passwordTest: "Min 8 chars. Allowed chars. a-z,A-Z,0-9,-,@,%,+,!,#,$,^,?,_"
                },
                retypePassword:{
                    passwordTest: "Min 8 chars. Allowed chars. a-z,A-Z,0-9,-,@,%,+,!,#,$,^,?,_"
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit   

            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                if (element.attr("name") == "tnc") { // insert checkbox errors after the container                  
                    error.insertAfter($('#register_tnc_error'));
                } else if (element.closest('.input-icon').size() === 1) {
                    error.insertAfter(element.closest('.input-icon'));
                } else {
                    error.insertAfter(element);
                }
            },
            submitHandler: function() {
                $('#spinner').show();
                $.post( "https://royalflush.in/myaccount/commands/accountRegisterQuery.php",$( "#registerForm" ).serialize(), function( data ) {
                    if(data.registerStatus == "success"){
                        toastr.success('New Account Registration was Successful');
                        toastr.info('Please Verify your Email ID & Phone Number with Activation Codes we have sent to get access..! It may be into your JUNK folder.');
                        $('#registerForm').each(function () {
                            this.reset();
                        });
                        
						localStorage.setItem("phone", data.number);
						localStorage.setItem("smscode", data.code);
						
						$('#spinner').fadeOut(400,function(){
							window.location.href = "activate.html";
						});
                    }
                    if(data.registerStatus == "failure"){
                        if(data.failureReason == "userAlreadyExist"){
                            toastr.error('Please try different username..!','Username already taken..!');
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "invalidPlayerName"){
                            toastr.error('Please try different username..!','Invalid Username');
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "noPlayerName"){
                            toastr.error('Please enter proper username..!','No Username was Entered');
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "passwordMismatch"){
                            toastr.error('Please enter same password again for Retype Password.','Password Mismatch.!');
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "invalidretypePassword"){
                            toastr.error('Please enter only the allowed characters for password.','Invalid Retype Password..!');
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "invalidsignUpPassword"){
                            toastr.error('Please enter only the allowed characters for password.','Invalid Password..!');
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "noPassword"){
                            toastr.error('Please enter Password.','No Password..!');
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "invalidRealFullName"){
                            toastr.error('Please enter only the allowed characters for Real Name.','Invalid Real Name..!');
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "noRealFullName"){
                            toastr.error('Please enter Real Name.','No Real Name..!');
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "invalidGender"){
                            toastr.error('Please select correct Gender.','Invalid Gender..!');
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "noGender"){
                            toastr.error('Please select correct Gender','No Gender..!');
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "invalidbirthYear"){
                            toastr.error('Please enter Correct Birth Year','Invalid Birth Year..!');
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "nobirthYear"){
                            toastr.error('Please enter Birth Year','No Birth Year..!');
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "contactEmailAlreadyExist"){
                            toastr.error('Please login with your account','Email ID already registered..!');
                            $('#registerForm').each(function () {
                                this.reset();
                            });
                            jQuery('.registerForm').hide();
                            jQuery('.loginForm').show();
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "invalidcontactEmail"){
                            toastr.error('Please enter Valid Email ID','Invalid Email ID');
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "nocontactEmail"){
                            toastr.error('Please enter Email ID','No Contact Email ID');
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "contactPhoneAlreadyExist"){
                            toastr.error('Please login with your account','Contact Phone already registered.!');
                            $('#registerForm').each(function () {
                                this.reset();
                            });
                            jQuery('.registerForm').hide();
                            jQuery('.loginForm').show();
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "invalidcontactPhone"){
                            toastr.error('Please enter valid Phone Number','Invalid Phone Number..!');
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "nocontactPhone"){
                            toastr.error('Please enter valid Phone Number','No Phone Number..!');
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "invalidplayerState"){
                            toastr.error('Please select correct State from the list','Invalid State Selected..!');
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "noplayerState"){
                            toastr.error('Please select correct State from the list','No State Selected..!');
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "invalidplayerCity"){
                            toastr.error('Please enter correct City Name','Invalid City Name..!');
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "noplayerCity"){
                            toastr.error('Please enter correct City Name','No City Name..!');
                            $('#spinner').fadeOut(400);
                        }

                    }
                    $('#spinner').fadeOut(400);
                }, "jsonp").fail(function() {
                    toastr.error('Please try again..!','There was a Network Error.!');
                    $('#spinner').fadeOut(400);
                });
            }
        });

        $('.registerForm input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.registerForm').validate().form()) {
                    $('.registerForm').submit();
                }
                return false;
            }
        });

        jQuery('#register-btn').click(function() {
            jQuery('.loginForm').hide();
            jQuery('.registerForm').show();
        });

        jQuery('#register-back-btn').click(function() {
            jQuery('.loginForm').show();
            jQuery('.registerForm').hide();
        });
    }

    return {
        //main function to initiate the module
        init: function() {
            handleLogin();
            handleForgetPassword();
            handleRegister();

        }

    };

}();