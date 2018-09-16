"use strict";
$('input[name=pattern]').on('keyup', function(event) {
  let pattern = $('input[name=pattern]').val();
  console.log(pattern)
  $.post('/findStop', {method: "getStopPoints", pattern: pattern}, function(data, status){
    let stopPointList = $('#stopPointList');
    stopPointList.empty();
    for(let i = 0; i<data.length; i++) {
      jQuery('<input/>', {
        class: "result__item",
        type: "submit",
        name: "name",
        value: data[i].name
      }).appendTo(stopPointList);
    }
  });
});