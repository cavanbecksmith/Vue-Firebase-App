import $ from 'jquery';

var bsdr = bootstrapDropdown;

function bootstrapDropdown () {
	$('.dropdown').on('click', function(){
		console.log('CLICK');
		$(this).find('.dropdown-menu').toggleClass('block')
	});
}
bootstrapDropdown();

export default {bootstrapDropdown}