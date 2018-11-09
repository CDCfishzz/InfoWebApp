var dragElement = null,
	enterElement = null,
	lock = true;

var iosDragDropShim = {enableEnterLeave: true};
document.ondragover = function (e) {e.preventDefault();}
document.ondrop = function (e) {e.preventDefault();}
function drag(obj) {
	obj.addEventListener('dragstart', function (ev) {
		dragElement = this;
		this.style.backgroundColor = '#999';
	}, false);

	obj.addEventListener('dragend', function (ev) {
		ev.target.style.backgroundColor = '#fff';
		ev.preventDefault();
	}, false)

	obj.addEventListener('dragenter', function (ev) {
		if (dragElement != this) {
			this.parentNode.insertBefore(dragElement, this);
			// enterElement = this;
		}
	}, false)

	obj.addEventListener('dragleave', function (ev) {
		if (dragElement != this) {
			if (lock && (this == this.parentNode.lastElementChild || this.parentNode.lastChild)) {
				this.parentNode.appendChild(dragElement);
				lock = false;
			}else{
				lock = true;
			}
		}
	}, false)
}