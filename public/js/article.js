var Article = Backbone.Model.extend({

	defaults : {
		"title" : "untitled",
		"description" : "Lorem Ipsum...",
		"author" : "",
		"tags" : [],
		"files" : []
	},

	url: function() {
		return '/articles/' + this.get('_id');
	}

});



var ArticleView = Backbone.View.extend({

    initialize : function(){
        this.render(); // render on init
        console.log(this.model);
    },

    render : function(){
		var html = this.model.get('description');
		$(this.el).html(html);
		console.log(this.el);
    }

});

// ------------------------------------------------------------------------

var Articles = Backbone.Collection.extend({
	model : Article,
	url : "/articles"
});


var ArticlesView = Backbone.View.extend({

	initialize : function() {
		_.bindAll(this, "render");
        this.render(); // render on init
		// this.collection.bind('add', this.render); // render on model change
	},

	render : function() {
		this.collection.each(function(article) {
			// var articleView = new articleView({model: article});
			console.log(article);
		}, this);
	}

});

// ------------------------------------------------------------------------
// index.js

var article = new Article();
var articleView = new ArticleView({model:article});

$("#view-content").html(articleView.el);

var AppRouter = Backbone.Router.extend({

	routes: {
		"": "setDefault",
		"edit/:id": "getPost",
		"*actions": "defaultRoute"
	},

	setDefault: function() {
		//window.location = '/#507ef0a30631a120fd000001';
		alert('c');
	},

	getPost: function(actions) {
		alert(actions);
	}

});


// Initiate the router
var app_router = new AppRouter();
alert('c');
