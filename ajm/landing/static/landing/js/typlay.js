define(function () {

	function Typlay(containerid, text) {
		this.paragraphs = text.replace('\t', ' ').split('\n');

		this.container = document.getElementById(containerid);		
		
		this.minspeed = 10;	 	// in cps
		this.maxspeed = 30;

		this.current_paragraph = null;
		this.current_element = null;

		this.paragraph_index = 0;
		this.text_index = 0;
	}

	Typlay.prototype.start = function() {
		this.boundtick = this.tick.bind(this);
		this.boundtick();
	};

	Typlay.prototype.onend = function() {};

	Typlay.prototype.tick = function() {
		if (!this.current_paragraph) {
			this.current_paragraph = this.paragraphs[this.paragraph_index++];
			if (this.paragraph_index > this.paragraphs.length) {
				this.onend();
				return;
			}
		}

		if (!this.current_element) {
			this.current_element = document.createElement('span');			
			this.container.appendChild(this.current_element);
		}

		var t = this.current_paragraph[this.text_index++];
		this.current_element.innerHTML += (!!t) ? t : '';

		if (this.text_index >= this.current_paragraph.length) {			
			this.text_index = 0;
			this.current_paragraph = null;
			this.current_element = null;
			this.container.appendChild(document.createElement('br'));
		}

		var interval = 1000 / this.randbetween(this.minspeed, this.maxspeed);
		window.setTimeout(this.boundtick, interval);
	};

	Typlay.prototype.oldtick = function() {		
		
		var p = this.paragraphs[this.curparagraph];

		if (p === undefined) {
			this.onend();
			return;
		}

		var t = p[this.index++];

		this.container.innerHTML += (!!t ? t : '');

		// if we are at the end of the line, 
		// insert a break, go to the next paragraph, and reset the cursor

		if (this.index > p.length) {
			this.container.innerHTML += '<br/>';
			this.curparagraph++;
			this.index = 0;			
		} 

		var interval = 1000 / this.randbetween(this.minspeed, this.maxspeed);
		window.setTimeout(this.boundtick, interval);
	};

	Typlay.prototype.randbetween = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	return Typlay;

});