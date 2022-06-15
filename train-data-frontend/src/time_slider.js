var sheet = document.createElement('style'),  
  $rangeInput = $('.range input'),
  prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];

document.body.appendChild(sheet);

var getTrackStyle = function (el) {  
  var curVal = el.value,
      style = '';

  // Set active label
  $('.range-labels li').removeClass('active selected');
  
  var curLabel = $('.range-labels').find('li:nth-child(' + curVal + ')');
  
  curLabel.addClass('active selected');
  curLabel.prevAll().addClass('selected');

  return style;
}

$rangeInput.on('input', function () {
  const trackedStyle =  getTrackStyle(this);
  sheet.textContent = trackedStyle;
});

// Change input value on label click
$('.range-labels li').on('click', function () {
  var index = $(this).index();
  $rangeInput.val(index + 1).trigger('input');
});
export const _inputEl = $rangeInput;