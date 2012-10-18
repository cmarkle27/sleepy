/*function close_markdown(){
	$('#edit-content').slideUp();
	$('#view-content').show();
	$('#save_article').toggle();
	$('#edit_article').toggle();
	$('#cancel_edit_article').toggle();


	// $('.edit-content').fadeIn();
	// $('.markdown-container').slideUp();
	// $("#save_article", ".actions").hide();
	// $("#edit_title_form").hide();
	// $("#cancel_edit_article", ".actions").hide();
	// $("h1", ".page-header").show();
	// $("#edit_article", ".actions").show();
	// $("#delete_article", ".actions").show();

}*/
/*
function open_markdown(){
	$('#edit-content').slideDown();
	$('#view-content').hide();
	$('#save_article').toggle();
	$('#edit_article').toggle();
	$('#cancel_edit_article').toggle();


	// $("#edit_title_form").show();
	// $("#save_article", ".actions").show();
	// $("#cancel_edit_article", ".actions").show();
	// $("h1", ".page-header").hide();
	// $("#edit_article", ".actions").hide();
	// $("#delete_article", ".actions").hide();
	// $("textarea.markdown").autoResize({
	// maxHeight: 100000
	// });

}*/

/*
function refresh_date(){
	var id = $('.markdown', '.content').data('id');
	$('.modified').fadeOut('fast', function(){

		$.ajax({
			url: site_url + "/article/refresh_date/" + id,
			dataType: 'HTML',
			type: "POST",
			success: function(msg){
				$('.modified').html(msg)
			}
		});
	}).fadeIn();
}
*/

/*
function saveArticle(callback) {

	var id = $('#article-content').data('id');
	var title = $('#edit_title').val();
	var subtitle = $('#edit_subtitle').val();
	var oper =  $('#article-content').data('oper');
	var content = $('#article-content').val();


	$('#title').text(title);
	$('#subtitle').text(subtitle);

	$.ajax({
		url: "/article/edit/id/" + id,
		data: ({
			content: content,
			title: title,
			subtitle: subtitle,
			oper: oper
		}),
		dataType: 'JSON',
		type: "POST",
		success: function(msg) {
			var $title = $("<h1>").html(msg.title);

			$('#view-content').html(msg.content).prepend($title);


			// var $title = $("<h1>")
			// .css({
			//		width: 200,
			//		height: 40,
			//	content: 'Algebra'
			//	})
			//	.attr("data-name", "title");

			// $('#view-content').append($title);




			console.log(msg);
			if (typeof callback === "function")
			{
				callback(msg);
			}

		}
	});
}*/


/*
$.fn.setCursorPosition = function(pos) {
  this.each(function(index, elem) {
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  });
  return this;
};
*/



$(document).ready(function() {

	// nav
	$.getJSON("/articles").done(function(res) {
		//console.log(res);
		var tmpl = '<li><a href=#<%= _id %>><%= title %></a></li>';
		var tmplFn = _.template(tmpl);
		var htmls = $.map(res, function(article) {
			return tmplFn(article);
		});
		$(".sidebar-nav").html("<ul class=nav nav-list>" + htmls.join("") + "</ul>");
	});

	$(".actions").on("click", "#edit-article", function(e) {
		e.preventDefault();
		window.location = '/#edit/' + $(document).data('id');
	});

	$(".actions").on("click", "#cancel-edit", function(e) {
		e.preventDefault();
		window.location = '/#' + $(document).data('id');
	});

/*
	key('⌘+s, ctrl+s', function(event, handler){
		event.preventDefault();

		saveArticle();
	});

	key('⌘+b, ctrl+b', function(event, handler){
		event.preventDefault();
		var selection = $('.markdown', '.content').getSelection();
		if (selection.text.length < 1)
		{
			$('.markdown', '.content').replaceSelection("**"+selection.text+"**");
			$('.markdown', '.content').setCursorPosition(selection.start+2);

		}
		else
		{
			$('.markdown', '.content').replaceSelection("**"+selection.text+"**");
		}

	});
*/




/*
	$(".actions").delegate("#cancel_edit_article", "click", function(){
		close_markdown();
	});


	$(".actions").delegate("#save_article", "click", function(){
		saveArticle(close_markdown());
	});*/



/*
	$(".actions").delegate("#create_article", "click", function(){
		var content = $('.markdown', '.content').val();
		var title = $('#edit_title').val();
		var subtitle = $('#edit_subtitle').val();

		$.ajax({
			url: site_url + "/article/save_new/",
			data: ({
				content: content,
				title: title,
				subtitle: subtitle
			}),
			dataType: 'HTML',
			type: "POST",
			success: function(msg){
				var id = $.trim(msg);
				window.location = site_url + "/article/view/" + id;
			}
		});
	});

	$(".content").delegate(".markdown", "keydown", function(e) {
		var keyCode = e.keyCode || e.which;

		if (keyCode == 9) {
			e.preventDefault();
			var tabString = String.fromCharCode(9);
			$('.markdown', '.content').insertBeforeSelection(tabString);
		}
	});

	$("#modal-from-dom").delegate("#cancel_delete", "click", function(){
		$('#modal-from-dom').modal('hide');
	});
*/

});

// ------------------------------------------------------------------------

var AppRouter = Backbone.Router.extend({

    routes: {
		"": "setDefault",
		"edit/:id": "getPost",
        "*actions": "defaultRoute"
    },

	setDefault: function() {
		window.location = '/#507ef0a30631a120fd000001';
	}

});

// Initiate the router
var app_router = new AppRouter();

app_router.on('route:defaultRoute', function(actions) {

	$.getJSON("/articles/"+actions).done(function(res) {
		var tmpl = '<h1><%= title %></h1><%= description %>';
		var tmplFn = _.template(tmpl);
		var html;

		res.description = markdown.toHTML(res.description);
		html = tmplFn(res);

		$('#edit-article').show();
		$('#save-article').hide();
		$('#cancel-edit').hide();

		$('#view-content').html(html);
		$(document).data('id', res._id); // or store in memory?

		console.log(res, $(document).data());
	});

});

app_router.on('route:getPost', function(id) {

	$.getJSON("/articles/"+id).done(function(res) {
		var tmpl = '<h1><%= title %></h1><textarea name="article-content" id="article-content" rows="10"><%= description %></textarea>';
		var tmplFn = _.template(tmpl);
		var html = tmplFn(res);

		$('#view-content').html(html);

		$('#edit-article').hide();
		$('#save-article').show();
		$('#cancel-edit').show();

		$(document).data('id', res._id); // or store in memory?
		console.log($(document).data());
	});

});

// Start Backbone history a neccesary step for bookmarkable URL's
Backbone.history.start(); // pushstate?
