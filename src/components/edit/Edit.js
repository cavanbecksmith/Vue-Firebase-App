// Modules
import $ from 'jquery';


// import tinymce from 'tinymce/tinymce'
// import 'tinymce/themes/silver/'
// // Plugins
// import 'tinymce/plugins/paste/plugin'
// import 'tinymce/plugins/link/plugin'
// import 'tinymce/plugins/codesample'
// import 'tinymce/plugins/autoresize/plugin'
// import 'tinymce/plugins/image/plugin'
// import 'tinymce/plugins/imagetools/plugin'
// import 'tinymce/plugins/spellchecker'
// import "tinymce/plugins/print/plugin.js";
// import "tinymce/plugins/advlist/plugin.js"
// import "tinymce/plugins/autolink/plugin.js";
// import "tinymce/plugins/autosave/plugin.js";
// import "tinymce/plugins/lists/plugin.js";
// import "tinymce/plugins/charmap/plugin.js";
// import "tinymce/plugins/preview/plugin.js";
// import "tinymce/plugins/hr/plugin.js";
// import "tinymce/plugins/anchor/plugin.js";
// import "tinymce/plugins/pagebreak/plugin.js";
// import "tinymce/plugins/searchreplace/plugin.js";
// import "tinymce/plugins/wordcount/plugin.js";
// import "tinymce/plugins/visualblocks/plugin.js";
// import "tinymce/plugins/visualchars/plugin.js";
// import "tinymce/plugins/code/plugin.js";
// import "tinymce/plugins/insertdatetime/plugin.js";
// import "tinymce/plugins/media/plugin.js";
// import "tinymce/plugins/nonbreaking/plugin.js";
// import "tinymce/plugins/table/plugin.js";
// import "tinymce/plugins/contextmenu/plugin.js";
// import "tinymce/plugins/directionality/plugin.js";
// // import "tinymce/plugins/emoticons/plugin.js";
// import "tinymce/plugins/template/plugin.js";
// import "tinymce/plugins/textcolor/plugin.js";
// import "tinymce/plugins/fullpage/plugin.js";
// import "tinymce/plugins/fullpage/plugin.js";
// import "tinymce/plugins/template/plugin.js";
// import "tinymce/plugins/colorpicker/plugin.js";
// import "tinymce/plugins/textpattern/plugin.js";
// import "tinymce/skins/content/default/content.min.css"
// // import "tinymce/skins/lightgray/skin.min.css";


// Components
// import TinyMCE from 'tinymce-vue-2';
import '../../scripts/tinymce.js';
import _position from '../../scripts/_positioning.js';
import highlight from '../../scripts/codestyling/highlightSnips.js';

export default {
	name: 'Edit',
	data: function () {
		return {
			counter: 0,
			cat: '',
			description: '',
			content: '',
			key: '',
		}
	},
	mounted: function () {
		tinymce.init({
		  selector: "#test",
		  height: 400,
		  browser_spellcheck: true,
		  plugins: [
		    "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak",
		    "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
		    "table contextmenu directionality emoticons template textcolor paste fullpage textcolor colorpicker textpattern", 
		    "codesample"
		  ],

		  toolbar1: "newdocument fullpage | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
		  toolbar2: "cut copy paste | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media code | insertdatetime preview | forecolor backcolor",
		  toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | visualchars visualblocks nonbreaking template pagebreak restoredraft codesample",
		  content_css: [
		    '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i'],

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

	},
	methods: {
		// Submit Data to firebase
		submit: function (event) {
			var title = $('.ed_title').text();
			var editorContent = tinymce.editors[1].getContent();
			var keyWordsStr = $('.keywords_edit').val().split(' ');
			this.$parent.$firebaseRefs['posts'].child(this.key).set({ title: title, content: editorContent, category: this.category, keywords: keyWordsStr});
			this.resetVars();
			this.closeWindow();
			setTimeout(function(){
				highlight.highlights.hightlightAll();
			}, 500);
		},
		// Reset existing values
		resetVars: function () {
			this.cat = '';
			this.description = '';
			this.$parent.html = '';
		 	$('#createIssue .ed_title').text('');
			tinymce.editors[1].setContent('')
			// this.keywords = '';
			this.$emit('keywords');
		},
		closeWindow: function () {
			this.resetVars();
			window.scrollLock = false;
			$('#editIssue').fadeOut(200);
		},

		updateEditBox: function(){
			var title = $('#editIssue .editTitle');
			title.text(this.title);
			tinymce.editors[1].setContent(this.html);
			this.key = this.$parent.ed_key;
		},

		getKeyWordsArr: function(){
			var arr = [];
			for(var i = 0; i < this.keywords.length; i++){
				arr.push(this.keywords[i]);
			}
			return arr;
		}
	},

	// components: {TinyMCE},

	props: ['title', 'html', 'keywords', 'category'],

	watch: {
		html: function(oldVal, newVal){
			this.updateEditBox();
		}
	},

	computed: {
		proccessKeyWords: function(){
			var keyString = '';
			for(var i = 0; i < this.keywords.length; i++){
				keyString += this.keywords[i];
				if((i + 1) != this.keywords.length){
					keyString += ' ';
				}
			}
			return keyString;
		}
	}
}