var selection = -1;                  //Variable to store suggestion that is currently selected
var mouseFlag = false;              //FLAG to indicate whether mouse is over a suggestion or not
var ids = [];                       //Array to store id of each suggestion

function suggestion(text, subtext, k){            //Function to add suggestion to the suggestion box
   var str = `
    <div class="gs-suggestion" data-num="`+k+`">
        <span class="gs-suggestion-text">`+text+`</span>&nbsp;&nbsp;<span class="gs-suggestion-subtext">`+subtext+`</span>
    </div>`
   return str;
}

$(".gs-search-field").focus(function(){        //Function to show the suggestion box on focusing on the search bar
    $(this).parent().parent().find('.gs-suggestion-box').css('visibility', 'visible');
})

$(".gs-search-field").focusout(function(){     //Function to hide the suggestion box on focusing out of the search bar
    if(mouseFlag==false)
        $(this).parent().parent().find('.gs-suggestion-box').css('visibility', 'hidden');
})

$(".gs-search-field").keyup(function(event){                   //Function to handle the selection of suggestions with keyboard
   if(event.keyCode==38 && ids.length != 0){           //Move up suggestion on Up Arrow key
      $(this).parent().parent().find('.gs-suggestion').removeClass('gs-suggestion-highlight');
      if(selection == -1){
         selection = ids.length-1;
      }
      else {
         selection--;
      }
      if(selection != -1)
        $($(this).parent().parent().find('.gs-suggestion').get(selection)).addClass('gs-suggestion-highlight');
   }
   else if(event.keyCode==40 && ids.length != 0){      //Move down suggestion on Down Arrow key
      $(this).parent().parent().find('.gs-suggestion').removeClass('gs-suggestion-highlight');
      if(selection == ids.length-1)
         selection = -1;
      else {
         selection++;
         $($(this).parent().parent().find('.gs-suggestion').get(selection)).addClass('gs-suggestion-highlight');
      }
   }
   else if(event.keyCode==13 && ids.length != 0 && selection>-1){      //Select suggestion and update forecast on Enter key
       console.log("Suggestion #"+selection+" selected.");
      //changeForecast();
   }
});

$(".gs-search-field").bind('input', function(){        //Event handler to update the suggestions whenever the search bar value is changed
   if($(this).val()!=""){
      $(this).removeClass("gs-search-field-empty");
      $(this).addClass("gs-search-field-filled");
      var keyword = $(this).val();
      //Use keyword to add suggestions and call suggestion(text, subtext) for each suggestion and add to gs-suggestion-box.
      $('.gs-suggestion-box').empty();
      ids = [];
      for(var i=0; i<5 ; i++){
        var gsSuggestion = suggestion("Text "+ i, "Subtext "+i, i);
        $(this).parent().parent().find('.gs-suggestion-box').append(gsSuggestion);
        ids.push(i);
      }
   }
   else{
      $('.gs-suggestion-box').empty();
      $(this).removeClass("gs-search-field-filled");
      $(this).addClass("gs-search-field-empty");
      ids = [];
   }
});

$(document).on('mouseenter', '.gs-suggestion', function(){     //Highlighting of suggestion on mouseenter
   $(this).parent().find('.gs-suggestion').removeClass('gs-suggestion-highlight');
   $(this).addClass('gs-suggestion-highlight');
   selection = $(this).attr("data-num");
   mouseFlag = true;
});

$(document).on('mouseleave', '.gs-suggestion', function(){     //De-Highlighting of suggestion on mouseleeave
   mouseFlag = false;
});

$(document).on('click', '.gs-suggestion', function(){     //Selection of a suggestion by mouse click
   console.log("Suggestion #"+selection+" selected.");
});
