var WebDataStore = function(){

	var _this = this;
	
	var ds = function($){
		_this.$ = $;
	};
	ds.prototype.readData = function(setName, sl, cb){
		var selector, callback;
		if(!cb){
			callback = sl;
			selector = {}
		}
		if(!callback){
			callback([{code:-1,errmsg:"not callback"}]);
		}
		return _this.$.getJSON(
			"http://192.168.1.120:3000/dataService/find?callback=?",
			{setName:setName,selector:selector},
			callback
		);
	}
	ds.prototype.writeData =function(setName,document,callback){
		if(!callback){
			callback([{code:-1,errmsg:"not callback"}]);
		}
		return _this.$.getJSON(
			"http://192.168.1.120:3000/dataService/save?callback=?",
			{setName:setName,document:document},
			callback
		);
	}

	ds.prototype.remove =function(setName,document,callback){
		if(!callback){
			callback([{code:-1,errmsg:"not callback"}]);
		}
		return _this.$.getJSON(
			"http://192.168.1.120:3000/dataService/remove?callback=?",
			{setName:setName,document:document},
			callback
		);
	}
	return ds;
}();