// webchat Document

var WebChatVm;
var Transcript = function (options) {

        if (options.event_body == null) {

            options.event_body = "";

        }

        if (options.user_type == "Client") {

            this.Tclass = "client";

        }

        else if (options.user_type == "Agent") {

            $("#AgentUserName").html(options.user_nick);

            this.Tclass = "client-service";

        }

        else {

            this.Tclass = "client-service";

        }

        this.event_body = options.event_body;

        this.user_nick = options.user_nick;

        this.UserName = options.UserName

    };

    var WebChatViewModel = function () {

        this.transcripts = ko.observableArray();

    };



    ko.applyBindings(WebChatVm = new WebChatViewModel(), $("#ChatTranscriptDiv")[0]);



    var TranscriptObj = {

        event_body: "",

        Event_Type: "",

        msg_type: "",

        Notice_Type: "",

        party_id: "",

        user_nick: "",

        user_type: "",

        UserName: ""

    };



    var Chat_Obj = {

        UserData_FirstName: "",

        UserData_LastName: "",

        UserData_NickName: "",

        UserData_EmailAddress: "",

        UserData_ChatSubject: "",

        AgentStatus1: "",

        STAN: "",

        Secure_Key: "",

        User_Id: "",

        UserNick: '',

        Message_Type: "",

        Chat_Alias: "",

        LastPosition: "",

        SessionID: "",

        Chat_Transcript: new Array()

    };



    var WebServiceMethods =

        {

            isValid: function () {

                var isValid = true;



                if (!validateName($('#UserData_FirstName').val())) {

                    $('#errUserData_FirstName').addClass('asterisk');

                    isValid = false;

                }

                else {

                    $('#errUserData_FirstName').removeClass('asterisk').hide();

                }

                if (!validateName($('#UserData_LastName').val())) {

                    $('#errUserData_LastName').addClass('asterisk');

                    isValid = false;

                }

                else {

                    $('#errUserData_LastName').removeClass('asterisk').hide();

                }

                if (!validateEmail($('#UserData_EmailAddress').val())) {

                    $('#errUserData_EmailAddress').addClass('asterisk');

                    isValid = false;

                }

                else {

                    $('#errUserData_EmailAddress').removeClass('asterisk').hide();

                }

                if (!validateName($('#UserData_NickName').val())) {

                    $('#errUserData_NickName').addClass('asterisk');

                    isValid = false;

                }

                else {

                    $('#errUserData_NickName').removeClass('asterisk').hide();

                }

                if ($('#UserData_ChatSubject').val() == '') {

                    $('#errUserData_ChatSubject').addClass('asterisk');

                    isValid = false;

                }

                else {

                    $('#errUserData_ChatSubject').removeClass('asterisk').hide();

                }

                return isValid;

            },

            startNewSession: function (form_data) {

                if (Chat_Obj.SessionID == "") {

                    $("#AgentUserName").html('');

                    $.ajax({

                        url: _spPageContextInfo.webAbsoluteUrl + "/_layouts/15/GIB/handlers/WebChatHandler.ashx",

                        data: form_data,

                        responseType: "application/json; charset=utf-8",

                        async: true,

                        type: 'POST',

                        success: function (responseData, statusText, errorCode) {

                            if (responseData != null && responseData != "") {

                                $("#elPleaseWaitChatDIV").hide();

                                $(".showChatForm").hide();

                                $(".showChat").show();

                                Chat_Obj.LastPosition = responseData.ChatJoinResult.LastPosition;

                                Chat_Obj.SessionID = responseData.ChatJoinResult.SessionID;

                                Chat_Obj.Secure_Key = responseData.ChatLogInResult.Secure_Key;

                                Chat_Obj.STAN = responseData.ChatLogInResult.STAN;

                                Chat_Obj.User_Id = responseData.ChatLogInResult.User_Id;

                                Chat_Obj.Chat_Alias = responseData.ChatLogInResult.Chat_Alias;

                                if (responseData.ChatJoinResult != null) {

                                    $.each(responseData.ChatJoinResult.Chat_Transcript, function (index, value) {

                                        if (value.event_body != null) {

                                            WebChatVm.transcripts.push(new Transcript(value));

                                        }

                                    });

                                }

                            }

                        }

                    });

                }

            },

            refreshMessages: function (form_data) {

                $.ajax({

                    url: _spPageContextInfo.webAbsoluteUrl + "/_layouts/15/GIB/handlers/WebChatHandler.ashx",

                    data: form_data,

                    responseType: "application/json; charset=utf-8",

                    async: false,

                    type: 'POST',

                    success: function (responseData, statusText, errorCode) {

                        Chat_Obj.LastPosition = responseData.LastPosition;

                        Chat_Obj.SessionID = responseData.SessionID;

                        Chat_Obj.STAN = responseData.STAN;

                        if (responseData.Chat_Transcript != null) {

                            $.each(responseData.Chat_Transcript, function (index, value) {

                                if (value.Event_Type != 'Connect' && value.Event_Type != 'Notice') {

                                    WebChatVm.transcripts.push(new Transcript(value));

                                }

                            });

                        }

                        $('#ChatScrollDiv').stop().animate({

                            scrollTop: $("#ChatScrollDiv")[0].scrollHeight

                        }, 500);

                    }

                });

            },

            logOffSession: function (StartNewSession) {

                var form_data = {

                    callType: 'logOffSession',

                    STAN: Chat_Obj.STAN,

                    Chat_Alias: Chat_Obj.Chat_Alias,

                    Secure_Key: Chat_Obj.Secure_Key,

                    User_Id: Chat_Obj.User_Id

                };

                $.ajax({

                    url: _spPageContextInfo.webAbsoluteUrl + "/_layouts/15/GIB/handlers/WebChatHandler.ashx",

                    data: form_data,

                    responseType: "application/json; charset=utf-8",

                    type: 'POST',

                    success: function (responseData, statusText, errorCode) {

                        if (responseData.Response == "DISCONNECTED") {

                            WebServiceMethods.clearClientSession();

                            if (StartNewSession == true) {

                                var form_data =

                                            {

                                                UserData_FirstName: Chat_Obj.UserData_FirstName,

                                                UserData_LastName: Chat_Obj.UserData_LastName,

                                                UserData_NickName: Chat_Obj.UserData_NickName,

                                                UserData_EmailAddress: Chat_Obj.UserData_EmailAddress,

                                                UserData_ChatSubject: Chat_Obj.UserData_ChatSubject,

                                            }

                                WebServiceMethods.startNewSession(form_data);

                            }

                            else {

                                $(".showChatForm").show();

                                $(".showChat").hide();

                                $("#ChatTranscriptDiv").empty();

                                $("#UserData_FirstName").val('');

                                $("#UserData_LastName").val('');

                                $("#UserData_NickName").val('');

                                $("#UserData_EmailAddress").val('');

                                $("#UserData_ChatSubject").val('');

                            }

                        }

                    }

                });

            },

            clearClientSession: function () {

                Chat_Obj.LastPosition = "";

                Chat_Obj.SessionID = "";

                // Chat_Obj.User_Id = "";

            }

        }



    $('.chat_btn').live('click', function () {

        if (Chat_Obj.SessionID != "") {

            $(".showChatForm").hide();

            $(".showChat").show();

        }

        else {

            $(".showChatForm").show();

            $(".showChat").hide();

        }

        $('.chatWrapper').slideDown('slow');

    });



    $('#close').live('click', function () {

        $('.chatWrapper').slideUp('slow');

    });



    $("#logOffBtn").live('click', function () {

        WebServiceMethods.logOffSession();

    });



    $("#sendBtn").live('click', function () {

        var form_data = {

            callType: 'sendMessage',

            LastPosition: Chat_Obj.LastPosition,

            Message_Type: 'send',

            STAN: Chat_Obj.STAN,

            Chat_Alias: Chat_Obj.Chat_Alias,

            Secure_Key: Chat_Obj.Secure_Key,

            User_Id: Chat_Obj.User_Id,

            Event_BODY: $("#ClientMsgText").val(),

            EVENT_TYPE: 'MESSAGE',

            Msg_Type: 'CHATMESSAGE'

        }

        $("#ClientMsgText").val('');

        var RequestData = {};

        RequestData.user_type = "Client";

        RequestData.event_body = form_data.Event_BODY;

        RequestData.UserName = Chat_Obj.UserName;

        RequestData.user_nick = Chat_Obj.user_nick;

        //WebChatVm.transcripts.push(new Transcript(RequestData));

        WebServiceMethods.refreshMessages(form_data);

    });



    $("#JoinChatBtn").live('click', function () {

        if (WebServiceMethods.isValid()) {

            Chat_Obj.UserData_FirstName = $("#UserData_FirstName").val();

            Chat_Obj.UserData_LastName = $("#UserData_LastName").val();

            Chat_Obj.UserData_NickName = $("#UserData_NickName").val();

            Chat_Obj.UserData_EmailAddress = $("#UserData_EmailAddress").val();

            Chat_Obj.UserData_ChatSubject = $("#UserData_ChatSubject").val();



            var form_data = {

                callType: 'startNewSession',

                UserData_FirstName: Chat_Obj.UserData_FirstName,

                UserData_LastName: Chat_Obj.UserData_LastName,

                UserData_NickName: Chat_Obj.UserData_NickName,

                UserData_EmailAddress: Chat_Obj.UserData_EmailAddress,

                UserData_ChatSubject: Chat_Obj.UserData_ChatSubject,

            };

            $("#elPleaseWaitChatDIV").show();

            WebServiceMethods.startNewSession(form_data);

        }

    });



    $(".talkto").live('click', function () {

        if (Chat_Obj.SessionID != "") {

            WebServiceMethods.logOffSession(true);

        }

    });



    //setInterval(function () {

    //    if (typeof($("#ClientMsgText")) !='undefined' && $("#ClientMsgText").length > 0 && Chat_Obj.SessionID != "") {

    //        var form_data = {

    //            callType: 'sendMessage',

    //            LastPosition: Chat_Obj.LastPosition,

    //            Message_Type: 'user_typing',

    //            STAN: Chat_Obj.STAN,

    //            Chat_Alias: Chat_Obj.UserData_NickName,

    //            Secure_Key: Chat_Obj.Secure_Key,

    //            User_Id: Chat_Obj.User_Id,

    //            Msg_TYPE: 'CHATMESSAGE',

    //            EVENT_TYPE: 'NOTICE',

    //            Event_BODY: ''

    //        }

    //        WebServiceMethods.refreshMessages(form_data);

    //    }

    //    return true;

    //}, 3000);



    setInterval(function () {

        if (Chat_Obj.SessionID != "") {

            var form_data = {

                callType: 'sendMessage',

                LastPosition: Chat_Obj.LastPosition,

                Message_Type: 'send',

                STAN: Chat_Obj.STAN,

                Chat_Alias: Chat_Obj.Chat_Alias,

                SessionID: Chat_Obj.SessionID,

                Secure_Key: Chat_Obj.Secure_Key,

                User_Id: Chat_Obj.User_Id,

                Msg_TYPE: 'CHATMESSAGE',

                EVENT_TYPE: 'MESSAGE',

                Event_BODY: ''

            }

            WebServiceMethods.refreshMessages(form_data);

        }

        return true;

    }, 4000);
