var Verification = function() {
	
    var handlePhoneVerification = function() {
        jQuery.validator.addMethod("phoneNoTest", function (value, element, params) {
            return this.optional(element) || /^[0-9]{10}$/i.test(value);
        }, jQuery.validator.format("Valid 10 digits Mobile Number required. Allowed chars. 0-9"));
        jQuery.validator.addMethod("phoneVerificationTest", function (value, element, params) {
            return this.optional(element) || /^[0-9]{6}$/i.test(value);
        }, jQuery.validator.format("6 digits required. Allowed chars. 0-9"));

        $('#verifyPhoneForm').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                userPhoneNo: {
                    required: true,
                    phoneNoTest: true
                },
                phoneVerificationCode: {
                    required: true,
                    phoneVerificationTest: true
                }
            },

            messages: {
                userPhoneNo: {
                    required: "Valid Mobile number is required."
                },
                phoneVerificationCode: {
                    required: "Valid Phone Verification Code is required."
                }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit

            },

            highlight: function (element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function (label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function (error, element) {
                error.insertAfter(element);
            },

            submitHandler: function () {
                $('#spinner').show();
                $.post("https://royalflush.in/myaccount/commands/check-verification.php", $("#verifyPhoneForm").serialize(), function (data) {
                    if (data.verificationStatus == "success") {
                        toastr.success('You may now proceed for Login', 'Your Phone Number was verified');
						$('#verifyEmailForm').each(function () {
                             this.reset();
                        });
                        
                        $('#spinner').fadeOut(400,function(){
							window.location.href = "login.html";
						});
                    }
                    if (data.verificationStatus == "failure") {
                        if (data.failureReason == "noContactPhoneMatch") {
                            toastr.error('Please enter only Phone Number Registered with us.!', 'No match for Phone Number.!');
                             $('#verifyEmailForm').each(function () {
                             this.reset();
                             });
                            $('#spinner').fadeOut(400);
                        }
                        if (data.failureReason == "noPhoneVerificationCode") {
                            toastr.error('Please Enter Valid Phone verification code', 'No Phone verification Code..!');
                            $('#verifyEmailForm').each(function () {
                                this.reset();
                            });
                            $('#spinner').fadeOut(400);
                        }
                        if (data.failureReason == "noContactPhone") {
                            toastr.error('Please enter Valid Phone Number', 'No Phone Number was entered');
                            $('#verifyEmailForm').each(function () {
                                this.reset();
                            });
                            $('#spinner').fadeOut(400);
                        }
                        if (data.failureReason == "invaliduserPhoneNo") {
                            toastr.error('Please enter only Phone number Registered with us.!', 'No match found for Phone.!');
                             $('#verifyEmailForm').each(function () {
                             this.reset();
                             });
                            $('#spinner').fadeOut(400);
                        }
                        if (data.failureReason == "noVerifyEntry") {
                            toastr.error('Please contact Support', 'Error..! No User data Found.!');
                             $('#verifyEmailForm').each(function () {
                             this.reset();
                             });
                            $('#spinner').fadeOut(400);
                        }
                        if (data.failureReason == "verifySMSNotSent") {
                            toastr.error('Please Contact Support', 'Verification SMS was not sent');
                            $('#verifyEmailForm').each(function () {
                             this.reset();
                             });
							
                            $('#spinner').fadeOut(400,function(){
								window.location.href = "login.html";
							});
                        }
                        if (data.failureReason == "PhoneAlreadyVerified") {
                            toastr.error('WAIT..! You will be taken to Account Login Page', 'Phone Number was already activated');
							$('#verifyEmailForm').each(function () {
                             this.reset();
                             });
                            $('#spinner').fadeOut(400,function(){
								window.location.href = "login.html";
							});
                        }
                        if (data.failureReason == "verifyCodeNoMatch") {
                            toastr.error('Please enter the correct code we have sent', 'Wrong Phone Verification Code');
                            $('#verifyEmailForm').each(function () {
                                this.reset();
                            });
                            $('#spinner').fadeOut(400);
                        }
                        if (data.failureReason == "networkError") {
                            toastr.error('Please try again.!', 'There was a Network Error.!');
                            $('#spinner').fadeOut(400);
                        }
                        if (data.failureReason == "invalidPhoneVerificationCode") {
                            toastr.error('Please enter a valid Phone Verification Code', 'Invalid Phone Verification Code');
                            $('#verifyEmailForm').each(function () {
                                this.reset();
                            });
                            $('#spinner').fadeOut(400);
                        }
                    }
                    $('#spinner').fadeOut(400);
                }, "jsonp").fail(function () {
                    toastr.error('Please try again..!', 'There was a Network Error.!');
                    $('#spinner').fadeOut(400);
                });
            }

        });

    }
    return {
        //main function to initiate the module
        init: function() {
            handlePhoneVerification();
        }
    };
}();