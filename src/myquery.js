(function () {

  var QueryWrapper = function (elems) {
    //gives all the methods we want
    elems.each = function( func ){
      myQuery.each( this, func );
      return this;
    };

    elems.get = function( num ){
      return this[num];
    };

    elems.show = function(){
      arg = [];
      elems.each(function(e){
        e.style.display = "block";
        arg.push(e);
      });
      return QueryWrapper(arg);
    };

    elems.hide = function(){
      arg = [];
      elems.each(function(e){
        e.style.display = "none";
        arg.push(e);
      });
      return QueryWrapper(arg);
    };

    elems.addClass = function(newname){
      arg = [];
      elems.each(function(e){
        e.className = e.className + ' '+ newname;
        arg.push(e);
      });
      return QueryWrapper(arg);
    };
    // elems.css

    return elems;
  };

  var myQuery = function (selector) {
    var arr=[];
    var elems;

    if (selector[0] =='#'){
      selector = selector.slice(1);
      elems = [document.getElementById(selector)];
    }
    else if (selector[0]== '.')
    {
      selector = selector.slice(1);
      elems = document.getElementsByClassName(selector);
    }
    else {
      elems = document.getElementsByTagName(selector);
    }
    return QueryWrapper( elems );
  };

  myQuery.each = function( array, func ){
    for ( var i = 0; i<array.length; i++ ){
      func(array[i], i );
    }
  };

  myQuery.version='beta';
  window.$ = myQuery;

})();
