import {VueFire, firebase, config, firebaseApp, db, signIn, createNewUser, returnCurrentUser, signOut} from '../../firebase.js';
import { mixin as focusMixin }  from 'vue-focus';
import { directive as onClickaway } from 'vue-clickaway';
import validate from 'jquery-validation';
import _position from '../../scripts/_positioning.js';
import swal from "sweetalert";
var signup = {
	fname: '',
	lname: '',
	email: '',
	password: '',
	secret: ''
};
var routerPath;
var secret = 'something';
import $ from 'jquery';
export default{
  name: 'login',
  firebase: {
    test: db.ref('test/')
  },
	data: function(){
		return{
			url_path: this.$router.currentRoute.path,
			signup: false,
			login: true,


			fname: '',
			lname: '',
			email: '',
			password: '',
      secret: '',
      
      test: [],
		}
	},
	mounted: function(){


		var $this = this;
		this.frmSwitch();
		this.checkPath();
		this.storeData();
		this.inputClick();
		this.validate();
		

		$(document).ready(function(){
			$('form').on('submit', false);
		})
		

	},
	methods: {
		frmSwitch: function(){},
		checkPath: function(){
			routerPath = this.$router.currentRoute.path;
			this.url_path = this.$router.currentRoute.path;

			if(returnCurrentUser()){
				window.location.href = '#/';
			}

			if(this.url_path == '/login'){
				this.signup = false;
				this.login = true;
			}
			else if(this.url_path == '/signup'){
				this.signup = true;
				this.login = false;
			}
		},
		fieldClick: function(){
			$(".field-wrap").click(function(){
				console.log($(this));
			});
		},
		submit: function(type){

      console.log('SUBMIT');

			var $this = this;
			var filledField = false;

			var obj = {
				email: $this.email,
				password: $this.password,
			};

			if(type == 'login'){
				console.log('LOGIN WORKS')
				console.log(returnCurrentUser());
				_position._position.enableLoader();
				signIn(obj.email, obj.password);
				setTimeout(function(){
					if(returnCurrentUser()){
						_position._position.disableLoader();
						window.scrollLock = false;
						window.location.href = '#/';
					}
					else{
						_position._position.disableLoader();
						sweetAlert('You have entered in your details incorrectly');
					}					
				},1000);

			}
			else if(type == 'signup'){
        console.log('==== SIGNUP START ====');
				_position._position.enableLoader();
        // createUsrObj(obj.fname, obj.lname, obj.email, obj.password);
        createNewUser(obj.email, obj.password);
				setTimeout(function(){
					if(returnCurrentUser()){
						_position._position.disableLoader();
						window.location.href="#/";
					}
					else{
						_position._position.disableLoader();
					}
				}, 1000);
				
			}
		},
		storeData: function () {
			var $this = this;
			window.store = function(){
				console.log($this.fname, $this.lname, $this.email, $this.password, $this.secret);
			}
		},
		hideText: function ($event, toggle){

			$($event.target).parent().find('label').text('').data("text", text);

		},
		showText: function($this, $event){
			// $($event.target).parent().find('label').text('').data("text", text);
			console.log($this, $event);
		},
		inputClick: function () {
			$("body").on("focus", ".login-frm, textarea", function() {
				$(this).parent().find('label').hide();
				$(this).parent().find('span').hide();
			});

			$("body").on("blur", ".login-frm, textarea", function() {

				if($(this).val().length > 0){
					$(this).parent().find('label').hide();
					$(this).parent().find('span').hide();	
				}
				else{
					$(this).parent().find('label').show();
					$(this).parent().find('span').show();	
				}
					
			});
		},
		validate: function(){
		}
	},
	watch: {
		'$route': function(){
			// console.log("the route has changed", this.$route)
			this.checkPath();
		}
	},
	mixins: [focusMixin],
	directives: {focus: focusMixin, onClickaway: onClickaway}
}