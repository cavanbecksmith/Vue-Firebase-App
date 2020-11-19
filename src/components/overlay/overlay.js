import $ from 'jquery';
import '../../scripts/tinymce.js';
// import tinymce from 'tinymce/tinymce.min.js'
// import 'tinymce/themes/silver/index.js';
// require('tinymce/skins/content/default/content.css')
// require('tinymce/icons/default/index')
// // console.log('testing123', test);
// // require('tinymce/themes/silver/index');
// // import 'tinymce/themes/modern/theme'
// // require('tinymce/themes/content/default/content.css');
// import 'tinymce/plugins/paste/plugin'
// import 'tinymce/plugins/link/plugin'
// import 'tinymce/plugins/autoresize/plugin'
// import 'tinymce/plugins/fullscreen/plugin'
// import TinyMCE from 'tinymce-vue-2'
import _position from '../../scripts/_positioning.js'
import highlight from '../../scripts/codestyling/highlightSnips.js';

export default {
	data: function () {
		return {
			cat: '',
			description: '',
			content: ''
			// keywords: ''
		}
	},
	mounted: function () {
		this.createTinyMCE();
	},
	name: 'Overlay',
	methods: {

		submit: function (event) {

			/*
				When the submit has been clicked
				All the information 
				Will be pushed
				To firebase
			*/

			var titleTxt = $('#createIssue #EdHead');
			var formattedText = this.cat.toLowerCase();
			var editorContent = tinymce.editors[0].getContent();
			var keywords = $('#NewKeywords').val().split(' ');
			
			// this.keywords.split(' ');
			// console.log(keywords);
			// return true;

			var obj = {
				title: titleTxt.text(),
				content: editorContent,
				category: this.cat,
				keywords: []
			};

			for(var k = 0; k < keywords.length; k++){
				obj.keywords[k] = keywords[k];
			}

			for (var i in obj){
				if(i == 'keywords' && obj[i] == ''){
					break;
				}
				if(obj[i] == undefined || obj[i] == ''){
					return false;
					// Alert to go here
				}
			}

			this.$parent.$firebaseRefs['posts'].push(obj);
			this.resetVars();
			this.closeWindow();

			setTimeout(function(){
				highlight.highlights.init();
			}, 500);

		},

		resetVars: function () {

			/*
			All of the variables will reset
			after the submit
			*/

			this.cat = '';
			this.description = '';
		 	$('#createIssue #EdHead').text('');


		},
		closeWindow: function () {

			/*
			Closes the window
			*/
			window.scrollLock = false;

			$('#createIssue').fadeOut(200);
		},
		createTinyMCE: function () {

      console.log('tinymce init', tinymce.init);

			tinymce.init({
        selector: "#newissuearea",
        skin: false,
			  height: 400,
			  plugins: [
			    "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak",
			    "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
			    "table contextmenu directionality emoticons template textcolor paste fullpage textcolor colorpicker textpattern", 
			    "codesample"
			  ],

			  toolbar1: "newdocument fullpage | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
			  toolbar2: "cut copy paste | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media code | insertdatetime preview | forecolor backcolor",
			  toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | visualchars visualblocks nonbreaking template pagebreak restoredraft codesample",
			  // content_css: [
			  //   '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
			  //   '//www.tinymce.com/css/codepen.min.css'],

			  menubar: false,
			  toolbar_items_size: 'small',

			  style_formats: [{
			    title: 'Bold text',
			    inline: 'b'
			  }, {
			    title: 'Red text',
			    inline: 'span',
			    styles: {
			      color: '#ff0000'
			    }
			  }, {
			    title: 'Red header',
			    block: 'h1',
			    styles: {
			      color: '#ff0000'
			    }
			  }, {
			    title: 'Example 1',
			    inline: 'span',
			    classes: 'example1'
			  }, {
			    title: 'Example 2',
			    inline: 'span',
			    classes: 'example2'
			  }, {
			    title: 'Table styles'
			  }, {
			    title: 'Table row 1',
			    selector: 'tr',
			    classes: 'tablerow1'
			  }],

			  templates: [{
			    title: 'Test template 1',
			    content: 'Test 1'
			  }, {
			    title: 'Test template 2',
			    content: 'Test 2'
			  }]
      });

		}

	},

	// components: {TinyMCE},

	watch: {
		keywords: function(oldval,newval){
			console.log(newval);
		}
	}
}