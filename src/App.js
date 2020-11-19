// Vue
import Overlay from './components/overlay/overlay.vue';
import Edit from './components/edit/Edit.vue';
import Login from './components/login/login.vue';

// Modules
import $ from 'jquery';
// import sweetalert from "sweetalert";
import swal from 'sweetalert';

import tinymce from 'tinymce/tinymce'

// Helpers
import {VueFire, firebase, config, firebaseApp, db, signIn, createNewUser, returnCurrentUser, signOut} from './firebase'
import _position from './scripts/_positioning.js'

export default {
  name: 'app',
  data: function(){
    return{
      // backgroundImage: require('./assets/bg_pattern.png'),
      ed_key: '',
      title: '',
      html: '',
      keywords: '',
      category: '',
      signedIn: false,
      ed_visible: false
    }
  },
  mounted: function(){
    var $this = this;
    var glob = this;
    $(window).resize(this.resize());
    this.resize();
    _position._position.init();
    $(document).ready(function(){
      // $('.dropdown').on('click', function(){
      //   $(this).find('ul').toggleClass('block')
      // });

      glob.userInactive();
    });

  },
  firebase: {
    email: db.ref('email'),
    posts: db.ref('posts/list'),
    web: db.ref('web'),
  },
  methods: {
    showNewIssue: function(){
      if(returnCurrentUser()){
        
        // Show the overlay and remove all of the text
        // From inside of the editor
        $('#createIssue').fadeIn(200);
        $('#createIssue').find('#EdHead').text('');
        $('#createIssue').find('.keywords').val('');
        this.keywords = '';
        tinymce.get('newissuearea').setContent(''); 

        window.scrollLock = true;
        _position._position.init();
      }else{
        swal("You have to be signed in to use this functionality");
        // console.log("You have to be signed in to use this functionality");
      }
    },
    showEditIssue: function(){
      $('#editIssue').fadeIn(200);
      _position._position.init();
    },
    resize: function(){
      $('body').height($(window).height())
    },
    login: function(){
      var $this = this;
      this.signedIn = true
    },
    userInactive: function(){
      if(returnCurrentUser()){
        $this.signedIn = true;
      }
      else if(returnCurrentUser() == null){
        signOut();
        window.location.href = "#/login";
      } 
    }
  },
  components: {Overlay, Edit, Login},
  watch : {
    ed_visible: function(){
      _position._position.init();
    },
    // Redirects if user try's to visit the signup
    // Or login page when the user is signed in
    '$route': function(to, from) {
      scrollLock = false;
      var $this = this;

      if (to.path === '/login' && returnCurrentUser() != null || to.path === '/signup' && returnCurrentUser() != null) {
        window.location.href = "#/";
      }

      if(to.path === '/' && returnCurrentUser() == null){
        window.location.href = "#/login";
      }
    }
  },
  computed: {
    returnhtml: function(){
      return this.html;
    },
    returnLogin: function(){
      return this.signedIn;
    }
  }
}