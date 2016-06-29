$(function(){
// Document is ready
	function getContent(data) {
		var results = [];
		var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
		var cb = '&callback=JSON_CALLBACK';
	    var page = 'https://en.wikipedia.org/?curid=';
		$.ajax({
		    url: api + data + cb,
		    data: {
		        format: 'json'
		    },
		    dataType: 'jsonp'
		}).done(function (data) {
		    console.log(data)
		    console.log(data.query.pages)
		    var newdata = data.query.pages;
		    $.each(newdata, function(index, value) {
		    	console.log(index);
    			console.log(value);
    			results.push({title: value.title, body: value.extract, pages: page + value.pageid})
			}); 
		    console.log(results);
		    for(var i = 0; i < results.length; i++){ 	
		    	$("<a href='"+ results[i].pages +"'><blockquote><p>"+ results[i].title +"</p><p><small>" +results[i].body + "</small></p></blockquote></a>").appendTo($("#content"));
		    }
		});
	}

	$("#search").click(function(){
		var data = $("#input").val();
		if(data == ""){
			alert("type something");
		} else {
			getContent(data);
		}
	})
});
