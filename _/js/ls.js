// remap jQuery to $
(function($){})(window.jQuery);


/* trigger when page is ready */
//$(document).ready(function (){

	// your functions go here

//});


/* optional triggers

$(window).load(function() {
	
});

$(window).resize(function() {
	
});

*/

$(document).ready(function() {
  var conv = new Showdown.converter();
  var page_list_file = "pages.ls";

  $(function() {
   $.ajax({
      url: page_list_file,
      type: "text"
  }).done(function(data) {
    $.each(data.split('\n'), function() {
      if (this.length > 0) {
        var page_link_ele = $(document.createElement("a"));
        var page_link_ele_wrapper = $(document.createElement("li"));
        var page_link = this.toString();
        $(page_link_ele).html(this.toString());
        $(page_link_ele).attr("class", "page");
        $(page_link_ele).attr("id", page_link);
        $(page_link_ele).attr("href", "#"+page_link);
        $(page_link_ele).on("click", null, function() {
          $.ajax({
            url: ["page/",page_link].join('')
          }).done(function(txt) {
            $("#content").html(conv.makeHtml(txt));
          });
        });
        $(page_link_ele_wrapper).append(page_link_ele);
        $("#right-nav").append(page_link_ele_wrapper);
      }
    });
  });
  
  });

  $(function() {
    $(".nav a").each(function(i, ele) {
      var item = $(ele);
      item.on("click", null ,function () {
        $.ajax({
          url: [item.attr("class"),"/",item.attr("id")].join(''),
          type: "text"
        }).done(function(txt) {
          $("#content").html(conv.makeHtml(txt));
        });
      });
    });
  });

});
