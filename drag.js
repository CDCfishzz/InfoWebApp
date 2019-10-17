var dragElement = null,
	enterElement = null,
	lock = true;

var iosDragDropShim = {enableEnterLeave: true};
document.ondragover = function (e) {e.preventDefault();}
document.ondrop = function (e) {e.preventDefault();}
function drag(obj) {
	obj.addEventListener('dragstart', function (ev) {
		dragElement = this;
		this.style.backgroundColor = '#ddd';
	}, false);

	obj.addEventListener('dragend', function (ev) {
		ev.target.style.backgroundColor = '#fff';
		ev.preventDefault();

		// exchange both postion
		if (enterElement) {
			tamp = this.cloneNode(true);
			this.parentNode.insertBefore(tamp, this);
			this.parentNode.insertBefore(this, enterElement);
			this.parentNode.replaceChild(enterElement, tamp);
			tamp = null;
		}
		enterElement = null;
		dragElement = null; 

		// storage change >>

	}, false)

	obj.addEventListener('dragenter', function (ev) {
		nextchild = this.nextElementSibling || this.nextSilbing;
		lastchild = this.parentNode.lastElementChild || this.parentNode.lastChild;
		
		enterElement = this;

		// if (Idx(dragElement) > Idx(this)) {
		// 	this.parentNode.insertBefore(dragElement, this);
		// }else{
		// 	this.parentNode.insertBefore(dragElement, nextchild);
		// }
		// if (lastchild == this) {
		// 	this.parentNode.appendChild(dragElement);
		// }


	}, false)

	// obj.addEventListener('dragleave', function (ev) {
	// 	if (dragElement != this) {
	// 		if (lock && (this == this.parentNode.lastElementChild || this == this.parentNode.lastChild)) {
	// 			this.parentNode.appendChild(dragElement);
	// 			lock = false;
	// 		}else{
	// 			lock = true;
	// 		}
	// 	}
	// }, false)
}

function Idx(obj) {
	childs = obj.parentNode.childNodes;
	for (var i = 0; i < childs.length; i++) {
		if (childs[i] == obj) {return i;}
	}
}