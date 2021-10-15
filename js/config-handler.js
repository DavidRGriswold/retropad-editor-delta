function ConfigHandler() {
	let _strings;

	// Array index of line overlayXX_descYY = "..."
	let _currentLine = -1;

	let _currentOverlay = 0;


	this.convertCfgToArray = function (str) {
		_strings = str.split('\n');
		_cleanUp();

		_currentLine = -1;
		_currentOverlay = 0;
	}


	this.getConfigString = function () {
		_cleanUp();
		return _strings.join('\n');
	}


	this.setCurrentLine = function (index) {
		if (index == -1 || _isOverlayXX_descYY(_strings[index]))
			_currentLine = index;
		else
			throw new Error('Wrong config line number');
	}


	// sections are 'command', 'shape', 'x', 'y', 'w', 'h'
	this.getCurrentLineSectionValue = function (section) {
		return _getParamSectionValue(_strings[_currentLine], section)
	}


	this.setCurrentLineSectionValue = function (section, value) {
		if (_currentLine == -1) {
			throw new Error('no selection!');
		}

		_strings[_currentLine] = _editParamSection(_strings[_currentLine], section, value);
	}


	// Extracts config data for gamepad visualisation (shape, position, size, image, for each button)
	this.buildPadFromConfig = function () {
		if (!_strings)
			return;

		let buttons = []

		for (let i = 0; i < _strings.length; i++) {
			let parameter = _isOverlayXX_descYY(_strings[i]);
			if (parameter) {
				let o = {
					command: _getParamSectionValue(_strings[i], 'command'),
					x: _getParamSectionValue(_strings[i], 'x'),
					y: _getParamSectionValue(_strings[i], 'y'),
					w: _getParamSectionValue(_strings[i], 'w'),
					h: _getParamSectionValue(_strings[i], 'h'),
					s: _getParamSectionValue(_strings[i], 'shape'),
					img: _getParamValue(parameter + '_overlay'),
					i: i
				};

				// remove surrounding quotemarks
				if (o.img && o.img.search(/^".+"$/) == 0)
					o.img = o.img.substr(1, o.img.length - 2);

				buttons.push(o);
			}
		}

		return buttons;
	}


	this.getOverlayBackground = function () {
		return _getParamValue('overlay' + _currentOverlay + '_overlay');
	}


	this.createOverlay = function (name) {
		let count = Number(_getParamValue('overlays'));
		if (!name)
			name = 'overlay' + (count + 1);

		let last = _getParamIndex('overlay' + (count - 1) + '_alpha_mod');
		if (last == -1)
			last = 0;

		let arr = [];
		arr.push('overlay' + count + '_full_screen = true');
		arr.push('overlay' + count + '_normalized = true');
		arr.push('overlay' + count + '_name = "' + name + '"');
		arr.push('overlay' + count + '_range_mod = 1.5');
		arr.push('overlay' + count + '_alpha_mod = 2.0');

		_strings.splice(last + 1, 0, ...arr);

		let tail = _strings.length - 1;
		let reg = new RegExp('overlay' + (count - 1) + '_desc');

		for (let i = _strings.length - 1; i >= 0; i--) {
			if (_strings[i].split('=')[0].trim().search(reg) != -1) {
				tail = i;
				break
			}
		}

		_strings.splice(tail + 1, 0, 'overlay' + count + '_descs = 0');
		_setParamValue('overlays', count + 1);
	}


	this.deleteCurrentOverlay = function () {
		let count = Number(_getParamValue('overlays'));

		if (count <= 1) {
			alert('Can not delete last overlay');
			return;
		}

		let name = _getParamValue('overlay' + _currentOverlay + '_name');
		console.log(name);

		_deleteParamStrings('overlay' + _currentOverlay);

		for (let i = _currentOverlay; i < count - 1; i++) {
			_replaceParamNumbers('overlay', i + 1, i);
		}

		//Clear buttons linked to this overlay;
		let reg = new RegExp('(overlay\\d+_desc\\d+_next_target)');

		for (let i = _strings.length - 1; i >= 0; i--) {

			if (_strings[i].search(name) == -1)
				continue;

			if (_strings[i].search(reg) == -1)
				continue;

			_strings.splice(i, 1);
		}

		_setParamValue('overlays', count - 1);
		_currentOverlay = 0;
		_currentLine = -1;
	}


	this.createButton = function (command, shape, image, addLines) {
		let overlayXX = 'overlay' + _currentOverlay;
		let buttCount = Number(_getParamValue(`${overlayXX}_descs`));
		console.log(buttCount);

		let last;

		let reg = new RegExp('^' + overlayXX + '_desc' + (buttCount - 1));
		for (let i = _strings.length - 1; i >= 0; i--) {
			if (_strings[i].split('=')[0].trim().search(reg) != -1) {
				last = i;
				break
			}
		}

		if (!last)
			last = _getParamIndex(`${overlayXX}_descs`);

		if (last == -1)
			throw new Error('can not find position to insert new line');

		let overlayXX_descYY = `${overlayXX}_desc${buttCount}`;
		let arr = [`${overlayXX_descYY} = "${command},0.50000,0.50000,${shape},0.05000,0.05000"`];
		_strings.splice(last + 1, 0, ...arr);

		this.setCurrentLine(last + 1);
		this.updateCurrentButton(command, shape, image, addLines);

		_setParamValue(`${overlayXX}_descs`, buttCount + 1);
	}


	this.deleteCurrentButton = function () {
		if (_currentLine == -1) {
			return false;
		}

		let parameter = _isOverlayXX_descYY(_strings[_currentLine]);
		console.log(parameter);
		let buttCount = Number(_getParamValue('overlay' + _currentOverlay + '_descs'));

		if (buttCount <= 1) {
			alert('Can not delete last button!');
			return;
		}

		let delNumber = Number(parameter.substr(('overlay' + _currentOverlay + '_desc').length));
		console.log(buttCount, delNumber);

		_deleteParamStrings(parameter);

		for (let i = delNumber; i < buttCount - 1; i++) {
			_replaceParamNumbers('overlay' + _currentOverlay + '_desc', i + 1, i);
		}

		_setParamValue('overlay' + _currentOverlay + '_descs', buttCount - 1);

		_currentLine = -1;
		return true;
	}


	this.fixAspect = function (iw, ih, ow, oh, portrait, keepRelativePositions) {

		let initial = iw / ih;
		let target = ow / oh;
		let axis = portrait ? 'y' : 'x';

		let coef = initial / target;

		for (let i = 0; i < _strings.length; i++) {
			let parameter = _isOverlayXX_descYY(_strings[i]);
			if (parameter) {
				if (keepRelativePositions)
					__scalePositioned(i, coef, axis);
				else
					__scaleSnapped(i, coef, axis);
			}
		}


		function __scaleSnapped(index, coef, ax) {
			let c = _getParamSectionValue(_strings[index], ax);
			if (c <= 0.45)
				_strings[index] = _editParamSection(_strings[index], ax, (c * coef).toFixed(5));
			else if (c >= 0.55)
				_strings[index] = _editParamSection(_strings[index], ax, (c * coef + (1 - coef)).toFixed(5));

			let direction = ax == 'x' ? 'w' : 'h';
			let s = _getParamSectionValue(_strings[index], direction);
			_strings[index] = _editParamSection(_strings[index], direction, (s * coef).toFixed(5));
		}

		function __scalePositioned(index, coef, ax) {
			let c = _getParamSectionValue(_strings[index], ax);
			_strings[index] = _editParamSection(_strings[index], ax, (c * coef + (1 - coef) / 2).toFixed(5));

			let direction = ax == 'x' ? 'w' : 'h';
			let s = _getParamSectionValue(_strings[index], direction);
			_strings[index] = _editParamSection(_strings[index], direction, (s * coef).toFixed(5));
		}
	}


	this.setCurrentOverlay = function (num) {
		let count = Number(_getParamValue('overlays'));
		if (num && num < count)
			_currentOverlay = num;
		else
			_currentOverlay = 0;
	}


	this.getCurrentOverlay = function () {
		return _currentOverlay;
	}


	this.getOverlayList = function () {
		let count = Number(_getParamValue('overlays'));
		console.log('overlays:', count);

		let list = [];

		for (let i = 0; i < count; i++)
			list.push(_getParamValue('overlay' + i + '_name'));

		return list;
	}


	this.normalizeWidth = function (width, height) {
		let w = (height / width * _getParamSectionValue(_strings[_currentLine], 'h')).toFixed(5)
		this.setCurrentLineSectionValue('w', w);
		return w;
	}


	this.normalizeHeight = function (width, height) {
		let h = (width / height * _getParamSectionValue(_strings[_currentLine], 'w')).toFixed(5)
		this.setCurrentLineSectionValue('h', h);
		return h;
	}


	this.getCurrentButtonParams = function () {
		let param = _isOverlayXX_descYY(_strings[_currentLine]);
		let lines = _getParamStrings(param + '_');
		let ret = {};

		ret.command = _getParamSectionValue(_strings[_currentLine], 'command');
		ret.shape = _getParamSectionValue(_strings[_currentLine], 'shape');
		ret.image = _getParamValue(param + '_overlay');

		// remove quotemarks
		if (ret.image && ret.image.search(/^".+"$/) == 0)
			ret.image = ret.image.substr(1, ret.image.length - 2);

		ret.addLines = [];

		for (let i = 0; i < lines.length; i++) {
			if (lines[i].search(param + '_overlay') == -1) {
				ret.addLines.push(lines[i].substr(param.length + 1));
			}
		}

		console.log(ret);
		return ret;
	}


	this.updateCurrentButton = function (command, shape, image, addLines) {

		// Analog sticks with 'rect' shape are not valid
		if (command.search('analog_') == 0)
			shape = 'radial';

		_strings[_currentLine] = _editParamSection(_strings[_currentLine], 'command', command);
		_strings[_currentLine] = _editParamSection(_strings[_currentLine], 'shape', shape);

		let overlayXX_descYY = _isOverlayXX_descYY(_strings[_currentLine]);
		_deleteParamStrings(overlayXX_descYY + '_');

		let arr = [];

		if (image)
			if (image.search(/\s/) == -1)
				arr.push(`${overlayXX_descYY}_overlay = ${image}`);
			else
				arr.push(`${overlayXX_descYY}_overlay = "${image}"`);

		if (Array.isArray(addLines))
			addLines.forEach(line => arr.push(`${overlayXX_descYY}_${line}`));

		_strings.splice(_currentLine + 1, 0, ...arr);
	}


	//PRIVATE

	function _cleanUp() {
		for (let i = _strings.length - 1; i >= 0; i--) {
			let str = _strings[i].trim();

			// remove comments
			if (str[0] == '/' || str[0] == '#' || str == '') {
				_strings.splice(i, 1);
				continue;
			}

			// remove path and inline comment from image filenames
			// search 'x_overlay ='
			if (str.search(/._overlay\s+=/) != -1) {
				let param = str.split('=')[0].trim();
				let value = str.split('=')[1].trim();

				// search value part that in quotes
				let inQuotes = new RegExp(/^"(.+?)"/);
				let quot = inQuotes.exec(value);
				if (quot && quot.length == 2)
					value = quot[1];

				// remove path
				let lastShalshIndex = Math.max(value.lastIndexOf('\\'), value.lastIndexOf('/'));
				if (lastShalshIndex != -1)
					value = value.substr(lastShalshIndex + 1);

				// add quotemarks if spaces present in filename
				if (value.search(/\s/) == -1)
					_strings[i] = param + ' = ' + value;
				else
					_strings[i] = param + ' = "' + value + '"';
			}
		}
	}


	function _getParamIndex(param) {
		for (let i = 0; i < _strings.length; i++)
			if (_strings[i].split('=')[0].trim() == param)
				return i;

		return -1;
	}


	function _setParamValue(param, value) {
		let index = _getParamIndex(param);
		let blocks = _strings[index].split('=');
		blocks[1] = ' ' + value;
		_strings[index] = blocks.join('=');
	}


	function _getParamValue(param) {
		for (let i = 0; i < _strings.length; i++)
			if (_strings[i].split('=')[0].trim() == param)
				return _strings[i].split('=')[1].trim();
	}


	function _deleteParamStrings(param) {
		let reg = new RegExp('^' + param + '([^0-9]|$)');
		for (let i = _strings.length - 1; i >= 0; i--)
			if (_strings[i].trim().search(reg) != -1)
				_strings.splice(i, 1);
	}


	function _getParamStrings(param) {
		let ret = [];
		let reg = new RegExp('^' + param + '([^0-9]|$)');
		for (let i = _strings.length - 1; i >= 0; i--)
			if (_strings[i].trim().search(reg) != -1)
				ret.push(_strings[i])

		return ret;
	}


	function _replaceParamNumbers(searchStr, oldNum, newNum) {
		console.log(searchStr);

		let reg = new RegExp('^' + searchStr + oldNum + '(?!\\d)');

		for (let i = 0; i < _strings.length; i++)
			_strings[i] = _strings[i].trim().replace(reg, searchStr + newNum);

	}


	function _isOverlayXX_descYY(str) {
		let param = str.split('=')[0].trim();
		let reg = new RegExp('^overlay' + _currentOverlay + '_desc\\d+$');

		return -1 == param.search(reg) ? null : param;
	}


	function _editParamSection(str, section, value) {
		let position = _getParamSectionValuePos(section);

		let blocks = str.split('"');
		let data = blocks[1].split(',');
		data[position] = value;
		blocks[1] = data.join(',');

		return blocks.join('"');
	}


	function _getParamSectionValue(str, section) {
		let position = _getParamSectionValuePos(section);

		let blocks = str.split('"');
		let data = blocks[1].split(',');
		return data[position];
	}


	function _getParamSectionValuePos(section) {
		switch (section) {
			case 'c':
			case 'command':
				return 0;

			case 'x':
				return 1;

			case 'y':
				return 2;

			case 's':
			case 'shape':
				return 3;

			case 'w':
				return 4;

			case 'h':
				return 5;
		}
	}

}