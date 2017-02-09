	/* 
		  处理注册用户
		 */
		function register() {
			var frm = document.forms['formUser'];
			var username = Utils.trim(frm.elements['username'].value);
			var email = frm.elements['email'].value;
			var password = Utils.trim(frm.elements['password'].value);
			var confirm_password = Utils.trim(frm.elements['confirm_password'].value);
			var checked_agreement = frm.elements['agreement'].checked;
			var msn = frm.elements['extend_field1'] ? Utils.trim(frm.elements['extend_field1'].value) : '';
			var qq = frm.elements['extend_field2'] ? Utils.trim(frm.elements['extend_field2'].value) : '';
			var home_phone = frm.elements['extend_field4'] ? Utils.trim(frm.elements['extend_field4'].value) : '';
			var office_phone = frm.elements['extend_field3'] ? Utils.trim(frm.elements['extend_field3'].value) : '';
			var mobile_phone = frm.elements['extend_field5'] ? Utils.trim(frm.elements['extend_field5'].value) : '';
			var passwd_answer = frm.elements['passwd_answer'] ? Utils.trim(frm.elements['passwd_answer'].value) : '';
			var sel_question = frm.elements['sel_question'] ? Utils.trim(frm.elements['sel_question'].value) : '';
			var msg = "";
			// 检查输入
			var msg = '';
			if (username.length == 0) {
				msg += username_empty + '\n';
			} else if (username.match(/^\s*$|^c:\\con\\con$|[%,\'\*\"\s\t\<\>\&\\]/)) {
				msg += username_invalid + '\n';
			} else if (username.length < 3) {
				//msg += username_shorter + '\n';
			}
			if (email.length == 0) {
				msg += email_empty + '\n';
			} else {
				if (!(Utils.isEmail(email))) {
					msg += email_invalid + '\n';
				}
			}
			if (password.length == 0) {
				msg += password_empty + '\n';
			} else if (password.length < 6) {
				msg += password_shorter + '\n';
			}
			if (/ /.test(password) == true) {
				msg += passwd_balnk + '\n';
			}
			if (confirm_password != password) {
				msg += confirm_password_invalid + '\n';
			}
			if (checked_agreement != true) {
				msg += agreement + '\n';
			}
			if (msn.length > 0 && (!Utils.isEmail(msn))) {
				msg += msn_invalid + '\n';
			}
			if (qq.length > 0 && (!Utils.isNumber(qq))) {
				msg += qq_invalid + '\n';
			}
			if (office_phone.length > 0) {
				var reg = /^[\d|\-|\s]+$/;
				if (!reg.test(office_phone)) {
					msg += office_phone_invalid + '\n';
				}
			}
			if (home_phone.length > 0) {
				var reg = /^[\d|\-|\s]+$/;
				if (!reg.test(home_phone)) {
					msg += home_phone_invalid + '\n';
				}
			}
			if (mobile_phone.length > 0) {
				var reg = /^[\d|\-|\s]+$/;
				if (!reg.test(mobile_phone)) {
					msg += mobile_phone_invalid + '\n';
				}
			}
			if (passwd_answer.length > 0 && sel_question == 0 || document.getElementById('passwd_quesetion') && passwd_answer.length == 0) {
				msg += no_select_question + '\n';
			}
			for (i = 4; i < frm.elements.length - 4; i++) // 从第五项开始循环检查是否为必填项
			{
				needinput = document.getElementById(frm.elements[i].name + 'i') ? document.getElementById(frm.elements[i].name + 'i') : '';
				if (needinput != '' && frm.elements[i].value.length == 0) {
					msg += '- ' + needinput.innerHTML + msg_blank + '\n';
				}
			}
			if (msg.length > 0) {
				alert(msg);
				return false;
			} else {
				return true;
			}
		}
         
		function is_registered(username) {
			var submit_disabled = false;
			var unlen = username.replace(/[^\x00-\xff]/g, "**").length;
			if (username == ' ') {
				document.getElementById('username_notice').innerHTML = msg_un_blank;
				var submit_disabled = true;
			}
			if (!chkstr(username)) {
				document.getElementById('username_notice').innerHTML = msg_un_format;
				var submit_disabled = true;
			}
			if (unlen < 3) {
				document.getElementById('username_notice').innerHTML = username_shorter;
				var submit_disabled = true;
			}
			if (unlen > 14) {
				document.getElementById('username_notice').innerHTML = msg_un_length;
				var submit_disabled = true;
			}
			if (submit_disabled) {
				document.forms['formUser'].elements['Submit'].disabled = 'disabled';
				return false;
			}
			Ajax.call('user.php?act=is_registered', 'username=' + username, registed_callback, 'GET', 'TEXT', true, true);
		}

		function registed_callback(result) {
			if (result == "true") {
				document.getElementById('username_notice').innerHTML = msg_can_rg;
				document.forms['formUser'].elements['Submit'].disabled = '';
			} else {
				document.getElementById('username_notice').innerHTML = msg_un_registered;
				document.forms['formUser'].elements['Submit'].disabled = 'disabled';
			}
		}

		function checkEmail(email) {
			var submit_disabled = false;
			if (email == '') {
				document.getElementById('email_notice').innerHTML = msg_email_blank;
				submit_disabled = true;
			} else if (!Utils.isEmail(email)) {
				document.getElementById('email_notice').innerHTML = msg_email_format;
				submit_disabled = true;
			}
			if (submit_disabled) {
				document.forms['formUser'].elements['Submit'].disabled = 'disabled';
				return false;
			}
			Ajax.call('user.php?act=check_email', 'email=' + email, check_email_callback, 'GET', 'TEXT', true, true);
		}

		function check_email_callback(result) {
			if (result == 'ok') {
				document.getElementById('email_notice').innerHTML = msg_can_rg;
				document.forms['formUser'].elements['Submit'].disabled = '';
			} else {
				document.getElementById('email_notice').innerHTML = msg_email_registered;
				document.forms['formUser'].elements['Submit'].disabled = 'disabled';
			}
		}