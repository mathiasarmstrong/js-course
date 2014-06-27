(function(){
  jokes=[];

  $(document).ready($.get("/api/jokes", function(e){
    $(e).each(function(){
      jokes.push(this);
      $(document).trigger('new_joke',this.id);
    })

  }));

  $('#joke_submit').on('click', function(e){
    e.preventDefault();
    var joke = {};
    joke.question = $('.joke-form-question').val();
    joke.answer = $('.joke-form-answer').val();
    jokes.push(joke);
    var params = {};
    params.joke = joke;
    $.post("/api/joke", params, function(data){
      $(document).trigger('new_joke', data.id );
    });

    });


  $(document).on('new_joke', function(e, n){

    $('.joke_box').append('<div data-joke-id ="'+n+'" class=" joke-top panel row">'+
      '<div class=" small-4 columns"><div class ="panel callout radius">'+
      jokes[jokes.length-1].question + ':</div> </div>'+
      '<div class = "small-4 columns"><div class = "panel callout">' +
      jokes[jokes.length-1].answer +
      '</div></div><div class = "small-2 columns">'+
      '<button class="delete">delete</button></div></div>')

      $('.delete').on('click', function(){
        $.ajax({url: 'api/joke/'+ $(this).closest('.joke-top').data('joke-id'),
          type: 'DELETE'});
        $(this).closest('.joke-top').remove();
    });
  });
})()

