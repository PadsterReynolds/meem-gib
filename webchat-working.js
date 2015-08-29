

<div class="chatWrapper">

    <div class="chat-left showChat" style="display: none">

        <img src="../_layouts/15/GIB/images/profile.png" alt="">

    </div>

    <div class="chat-right">

        <div id="client-chatform" class="showChatForm">

            <div class="input_field">

                <div class="input_text_desc" style="font-size: 13px">

                    first name

                    <span class="asterisk" id="errUserData_FirstName">*</span>

                </div>

                <input type="text" id="UserData_FirstName" style="width: 95%; max-height: 10px">

                <div class="clear"></div>

            </div>

            <div class="input_field">

                <div class="input_text_desc" style="font-size: 13px">

                    family name

                    <span class="asterisk" id="errUserData_LastName">*</span>

                </div>

                <input type="text" id="UserData_LastName" style="width: 95%; max-height: 10px">

                <div class="clear"></div>

            </div>

            <div class="input_field">

                <div class="input_text_desc" style="font-size: 13px">

                    Nickname

                    <span class="asterisk" id="errUserData_NickName">*</span>

                </div>

                <input type="text" id="UserData_NickName" style="width: 95%; max-height: 10px">

                <div class="clear"></div>

            </div>

            <div class="input_field">

                <div class="input_text_desc" style="font-size: 13px">

                    email

                    <span class="asterisk" id="errUserData_EmailAddress">*</span>

                </div>

                <input type="text" id="UserData_EmailAddress" style="width: 95%; max-height: 10px">

                <div class="clear"></div>

            </div>

            <div class="input_field">

                <div class="input_text_desc" style="font-size: 13px">

                    Subject

                    <span class="asterisk" id="errUserData_ChatSubject">*</span>

                </div>

                <input type="text" id="UserData_ChatSubject" style="width: 95%; max-height: 10px">

                <div class="clear"></div>

            </div>

            <div id="elPleaseWaitChatDIV" style="display: none">

                <p class="client-service">

                    Please wait and we will communicate with you shortly, if you do not have time now you can send an email to q@meem.sa .

                </p>

            </div>

        </div>

        <div class="showChat" style="display: none">

            <div id="ChatScrollDiv" style="max-height: 200px; overflow-y: auto">

                <p class="client-service" id="elWelcomeChatMsg">

                    Welcome to meem chat! You can find us on Twitter and Facebook as well

                </p>

                <div id="ChatTranscriptDiv" data-bind="foreach: transcripts">

                    <p data-bind="attr:{'class': Tclass}, text: event_body"></p>

                </div>

            </div>

            <div class="clear"></div>

            <textarea name="" id="ClientMsgText"></textarea>

            <ul class="buttons">

                <li id="logOffBtn">

                    log off</li>

                <li id="sendBtn">

                    send</li>

            </ul>

            <div class="dborder"></div>

            <div class="operator">

                <p><span id="AgentUserName"></span>

                    is your current operator</p>

                <p class="talkto">

                    Talk to someone else</p>

            </div>

        </div>

        <div class="dborder"></div>

        <div class="button1">

            <ul>

                <li><a id="close" href="#">

                    close</a>

                    <div class="whiteSpace"></div>

                </li>

            </ul>

        </div>

        <div class="button1 showChatForm">

            <ul>

                <li><a id="JoinChatBtn" href="#">

                    join</a>

                    <div class="whiteSpace"></div>

                </li>

            </ul>

        </div>

    </div>

</div>

<script type="text/javascript">

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



</script>

		

	</div>

<div style='display:none' id='hidZone'><menu class="ms-hide">

		<ie:menuitem id="MSOMenu_Help" iconsrc="/_layouts/15/images/HelpIcon.gif" onmenuclick="MSOWebPartPage_SetNewWindowLocation(MenuWebPart.getAttribute('helpLink'), MenuWebPart.getAttribute('helpMode'))" text="Help" type="option" style="display:none">



		</ie:menuitem>

	</menu></div>

                    

</div>

                </div>

                <div id="DeltaFormDigest">

	

                

                <script type="text/javascript">//<![CDATA[

        var formDigestElement = document.getElementsByName('__REQUESTDIGEST')[0];

        if (!((formDigestElement == null) || (formDigestElement.tagName.toLowerCase() != 'input') || (formDigestElement.type.toLowerCase() != 'hidden') ||

            (formDigestElement.value == null) || (formDigestElement.value.length <= 0)))

        {

            formDigestElement.value = '0xE64AE067B5D594F67B597E963DD0AB4F20ECEB6DC827CDDAB50ECFED4CD0956D7D5FE20F84E7E06F4C0D50B3B1445985EA26AA6B22E11110C442896CE200F91D,28 May 2015 08:25:51 -0000';

            g_updateFormDigestPageLoaded = new Date();

        }

        //]]>

        </script>

                

                

</div>

                <div class="ms-hide">

                    

                    

                    

                    

                    

                    

                    

                    

                    

                    

                    

                    

                    

                    

                    

                    

                </div>

            </div>

        </div>

    </div>

    <script type="text/javascript">// <![CDATA[ 




    var g_Workspace = "s4-workspace";

    // ]]>

</script>





<script type="text/javascript">

//<![CDATA[

var _spFormDigestRefreshInterval = 1440000;window.g_updateFormDigestPageLoaded = new Date(); window.g_updateFormDigestPageLoaded.setDate(window.g_updateFormDigestPageLoaded.getDate() -5);var _fV4UI = true;

function _RegisterWebPartPageCUI()

{

    var initInfo = {editable: false,isEditMode: false,allowWebPartAdder: false,listId: "{e6dd93a5-8e7c-4d98-8da9-4642829d287c}",itemId: 19,recycleBinEnabled: true,enableMinorVersioning: true,enableModeration: true,forceCheckout: true,rootFolderUrl: "\u002fen-us\u002fPages",itemPermissions:{High:16,Low:196673}};

    SP.Ribbon.WebPartComponent.registerWithPageManager(initInfo);

    var wpcomp = SP.Ribbon.WebPartComponent.get_instance();

    var hid;

    hid = document.getElementById("_wpSelected");

    if (hid != null)

    {

        var wpid = hid.value;

        if (wpid.length > 0)

        {

            var zc = document.getElementById(wpid);

            if (zc != null)

                wpcomp.selectWebPart(zc, false);

        }

    }

    hid = document.getElementById("_wzSelected");

    if (hid != null)

    {

        var wzid = hid.value;

        if (wzid.length > 0)

        {

            wpcomp.selectWebPartZone(null, wzid);

        }

    }

};

function __RegisterWebPartPageCUI() {

ExecuteOrDelayUntilScriptLoaded(_RegisterWebPartPageCUI, "sp.ribbon.js");}

_spBodyOnLoadFunctionNames.push("__RegisterWebPartPageCUI");var __wpmExportWarning='This Web Part Page has been personalized. As a result, one or more Web Part properties may contain confidential information. Make sure the properties contain information that is safe for others to read. After exporting this Web Part, view properties in the Web Part description file (.WebPart) by using a text editor such as Microsoft Notepad.';var __wpmCloseProviderWarning='You are about to close this Web Part.  It is currently providing data to other Web Parts, and these connections will be deleted if this Web Part is closed.  To close this Web Part, click OK.  To keep this Web Part, click Cancel.';var __wpmDeleteWarning='You are about to permanently delete this Web Part.  Are you sure you want to do this?  To delete this Web Part, click OK.  To keep this Web Part, click Cancel.';var g_clientIdDeltaPlaceHolderMain = "DeltaPlaceHolderMain";

var g_clientIdDeltaPlaceHolderUtilityContent = "DeltaPlaceHolderUtilityContent";

//]]>

</script>
