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
                $.post( "http://royalflush.in/app/login_query.php",$( "#loginForm" ).serialize(), function( data ) {
                    if(data.loginStatus == "success"){
                        toastr.success('Lets Play Game','Login Successful');
                        $('#loginForm').each(function () {
                            this.reset();
                        });
                        $('#spinner').fadeOut(400);
                        //-=== game start here ====
                        var sessionKey = "http://166.62.32.78:8087/?LoginName="+ $("#loginUsername").val()+"&SessionKey=" +data.sessionKey;
						localStorage.setItem("sessionID", sessionKey);
						window.location='./index.html';
                        //alert('lets start '+ sessionKey);
                    }
                    if(data.loginStatus == "failure"){
                        if(data.failureReason == "noUsers"){
                            toastr.error('Please add Users First..!','No Users Exists..!');
                            jQuery('.loginForm').hide();
                            jQuery('.registerForm').show();
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "noUserMatch"){
                            toastr.error('Please try again..!','No User exists with this Username');
                            $('#loginForm').each(function () {
                                this.reset();
                            });
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "noPasswordMatch"){
                            toastr.error('Please try again..!','WRONG PASSWORD');
                            $('#loginForm').each(function () {
                                this.reset();
                            });
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "noPassword"){
                            toastr.error('Please try again..!','Please enter a Password');
                            $('#loginForm').each(function () {
                                this.reset();
                            });
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "noUsername"){
                            toastr.error('Please try again..!','Please enter a Username First');
                            $('#loginForm').each(function () {
                                this.reset();
                            });
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "emailVerifyStatus"){
                            toastr.error('WAIT..!','Please Verify your Email First to Login');
                            $('#loginForm').each(function () {
                                this.reset();
                            });
                            $('#spinner').fadeOut(400);
                        }
                        if(data.failureReason == "smsVerifyStatus"){
                            toastr.error('WAIT..!','Please Verify your Phone First to Login');
                            $('#loginForm').each(function () {
                                this.reset();
                            });
                            $('#spinner').fadeOut(400);
                        }
                    }
                    $('#spinner').fadeOut(400);
                }, "json").fail(function() {
                    toastr.error('Please try again..!','There was a Network Error.!');
                    $('#spinner').fadeOut(400);
                });
            }

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

    }

    return {
        //main function to initiate the module
        init: function() {
            handleLogin();
           // handleForgetPassword();
            handleRegister();

        }

    };

}();