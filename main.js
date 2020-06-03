//默认选项添加在此处
var default_data = [
	"跑道使用 08","跑道使用 26",
	"移交:5700M/6000M","移交:6900M/7200M",
	"HKAPP:119.15MHz","HKAPP:120.025MHz",
	"SYTWR:118.15MHz","SYTWR:118.85MHz",
	"ACC1:122.9MHz","ACC1:120.5MHz",
	"ACC2:122.6MHz","ACC2:130.2MHz",
	"BAO:118.025MHz","BAO:130.00MHz",
	"JL开飞","JL一等","LD开飞","LD一等","LS开飞","LS一等","GX开飞",
	"分流程序","通航活动","炮射活动","V41可用"
];
var list_tab = document.getElementById("list_table");
var add_btn = document.getElementById('add_button');
var list_flag = false;
var list_stick = new Array();

window.onload = function () {
	document.body.addEventListener('touchstart', function () {return});
	document.getElementById('canvas').addEventListener('touchmove',function (e) {
		e.preventDefault();
	},{capture: false,passive: false});
	add_btn.addEventListener('click',listTaggle,false);
	document.getElementById('list_add').addEventListener('click',addNew,false);
	// add list
	for (var i = 0; i < default_data.length; i++) {
		var new_dd  = document.createElement('dd');
		var new_txt = document.createTextNode(default_data[i]);
		new_dd.addEventListener("click",newStick,false);
		new_dd.className = "listDd";

		new_dd.appendChild(new_txt);
		list_tab.appendChild(new_dd);

	}

	// storage show
	storageShow();
}

function storageShow() {
	for (var i = 0; i < localStorage.length; i++) {
		txt_of_local = localStorage.getItem(i);
		Stick(txt_of_local);
	}
}

function storageAdd(txt) {
	key = canvas.childNodes.length - 1;
	localStorage.setItem(key, txt);
}

function storageChange(childs) {
	localStorage.clear();
	for (var i = 0; i < childs.length; i++) {
		localStorage.setItem(i, childs[i].firstChild.data);
	}
}

function listTaggle() {
	// taggle show

	if (list_flag) {
		list_tab.style.visibility = 'hidden';
		// add_btn.classList.remove("list_onShow");
	} else {
		list_tab.style.visibility = 'visible';
		// add_btn.classList.add("list_onShow");
	}
	list_flag = !list_flag;
}

function newStick(even) {
	text = even.target.innerHTML;
	Stick(text);
	listTaggle();

	//  storage add
	storageAdd(text);

}

function Stick(txt) {
	var canvas = document.getElementById('canvas');
	if (canvas.childNodes.length >= 16) {return ;}
	// create div
	var new_div = document.createElement('div');
	new_div.className = "Stick";
	// create text
	var new_text = document.createTextNode(txt);
	new_text.className = "StickText";
	// create delete
	var new_del_button = document.createElement('button');
	new_del_button.className = "StickButton";
	new_del_button.innerHTML = '×';
	new_del_button.addEventListener('click',closeBox,false);

	new_div.appendChild(new_text);
	new_div.appendChild(new_del_button);

	canvas.appendChild(new_div);
	// 添加拖拽函数
	drag(new_div);
	new_div.draggable = "true";
}

function closeBox(even) {
	target = even.target.parentNode;
	parent = target.parentNode;

	target.parentNode.removeChild(target);

	// storage remove
	storageChange(parent.childNodes);

}

function addNew() {
	// ctreat new input
	var new_form = document.createElement('form');
	new_form.action = '#';

	var new_input = document.createElement('input');
	new_input.className = "TextInput";
	new_input.type = 'text';
	new_input.autofocus="autofocus"
	new_input.placeholder = "键入提示信息,并回车";

	var new_enter = document.createElement('input');
	new_enter.type = 'submit';

	// appand to body
	var canvas = document.getElementById('canvas');
	canvas.parentNode.appendChild(new_form);
	new_form.appendChild(new_input);
	new_input.addEventListener('focus',focusInput,false);
	new_input.addEventListener('blur',blurInput,false);
	new_input.focus();
	// enter for add to canvas
}

function focusInput(even) {
	target = even.target;
	target.addEventListener('keydown',function (event) {
		if (event.keyCode == 13) {
			Stick(even.target.value);
			blurInput(even.target);
			listTaggle();

			// storage add
			storageAdd(even.target.value);
		}
	},false);
}

function blurInput(even) {
	var target = even.target || even;
	target.removeEventListener('blur',blurInput);
	target.parentNode.parentNode.removeChild(target.parentNode);
}
