define(function () {

	function Typlay(containerid, text) {
		this.paragraphs = text.replace('\t', ' ').split('\n');

		this.container = document.getElementById(containerid);		
		
		this.minspeed = 20;	 	// in cps
		this.maxspeed = 40;

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
		if (t == '>') {
			this.current_element.innerHTML += this.current_paragraph;
			this.text_index = this.current_paragraph.length;
		} else {
			this.current_element.innerHTML += (!!t) ? t : '';
		}

		if (this.text_index >= this.current_paragraph.length) {			
			this.text_index = 0;
			this.current_paragraph = null;
			this.current_element = null;
			this.container.appendChild(document.createElement('br'));			
		}

		var interval = 1000 / this.randbetween(this.minspeed, this.maxspeed);

		window.setTimeout(this.boundtick, interval);
	};

	Typlay.prototype.randbetween = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	return Typlay;

});
