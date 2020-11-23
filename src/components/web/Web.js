import $ from 'jquery';
import {VueFire, firebase, config, firebaseApp, db, signIn, createNewUser, returnCurrentUser, signOut} from '../../firebase'

// Components
import swal from "sweetalert";
import Search from '../search/search.vue';
import _position from '../../scripts/_positioning';

// Directives
import { mixin as clickaway } from 'vue-clickaway'; 
//https://github.com/simplesmiler/vue-clickaway

// Code highlight
import highlight from '../../scripts/codestyling/highlightSnips.js';
import Clipboard from 'clipboard';


// Components
import filters from '../filters/filters.vue';
import favourite from '../favourites/favourite.vue';

var globscope;
export default {

  name: 'Web',

  data () {
    return {
      id: 'teamsite',
      msg: 'Welcome to Your Vue.js App',
      search: '',
      editedTxt: [], // Text for the editPost function (TEMPORARY)
      signedin: false,
      reveseData: [],
      posts: []
    }
  },
  firebase: {
    posts: db.ref('posts/list'),
    test: db.ref('test')
  },
  methods: {
    deletePost: function (item) {
      var db = this.$firebaseRefs['posts'];
      var $this = this;


      swal({
        title: "Are you sure?",
        text: "You will not be able to recover this post!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("The post will be deleted", {
            icon: "success",
          });
          $this.removeItem(db, item[".key"]);
        } else {
          swal("Your imaginary file is safe!");
        }
      });

    },
    removeItem: function (db, key) {
      db.child(key).remove();
    },
    // Dbl click function
    editPost: function(item, event){

      var post = $(event.currentTarget).parent();

      // console.log(post);

      window.scrollLock = true;

      // for(var i = 0; i < event.path.length; i++){
        // console.log(event.path[i]);
      // }

      // for(var i = 0; i < event.path.length; i++){
        // if($(event.path[i]).hasClass('post')){
          /* 
            We have got the element now
            This now needs to be passed onto the edit 
            function
          */
          var title = $(post).find('.title').text()
          var category = $(post).find('.category').text()
          var HTML = $(post).find('.HTML').html();
          var keywords = [];

          $(post).find('.keywords .key').each(function(){
            // console.log($(this));
            keywords.push($(this).text());
          });

          this.$parent.showEditIssue()
          /*
            All of the variables need to be pushed
            to the parent object to be used in
            the overlay.
            We can do this as we are using .sync on
            the component
          */
          this.$parent.title = title;
          this.$parent.html = HTML;
          this.$parent.ed_key = item[".key"];
          this.$parent.keywords = keywords;
          this.$parent.category = category;

          return true;
        // }
      // }
    },
    isLoggedIn: function(){
      globscope = this;
      if(returnCurrentUser()){
        this.signedin = true;
        return true;
      }
      else{
        return false
      }
     },
     clickme: function () {
      document.querySelectorAll("div.edit").addEventListener("click", function(e) {
        // Just for demonstration purposes
        if (e.path) {
          // console.log("Supports `path`");
        } else if (e.composedPath) {
          // console.log("Supports `composedPath`");
        } else {
          // console.log("Supports neither `path` nor `composedPath`");
        }
        
        // Per the above, get the path if we can
        var path = e.path || (e.composedPath && e.composedPath());
        
        // Show it if we got it
        if (path) {
          // console.log("Path (" + path.length + ")");
          Array.prototype.forEach.call(
            path,
            function(entry) {
              // console.log(entry.nodeName);
            }
          );
        }
      }, false);
     },
    isChecked: function(post){
      // console.log(post);


        // Get variables
        var checkedBoxes = [];
        var checkedStr;


        // Loop all options to see other checked boxes
        $('.categories').find('.checkbox').each(function(i){
          // console.log($(this), i);
          if($(this).prop('checked')){
            checkedBoxes.push($(this).val());
          }
        });
        checkedStr = checkedBoxes.join(' ');

        // Loop through each post to check if they
        // Are to be filtered

        if(checkedBoxes.length != 0){

          var category = post.category;

          if(checkedBoxes.includes(category)){
            return true;
          }
          else{
            return false;
          }

        }
        else{
          return true;
        }
    },
    searchRes: function(post){

        setTimeout(function(){
          Prism.highlightAll();
          // highlight.highlights.collapseCode();
        },200)

        var wordMatch = false;
        var catMatch = false;
        var checkVars = $('.posts').attr('data-checked');

        // If there is no data-checked val
        if(checkVars == undefined){
          checkVars = [];
        }
        // Else split into an array
        else{
          checkVars = checkVars.split(' ')
        }

        // Loop keywords to see if there is a match
        for(var word = 0; word < post.keywords.length; word++){
          if(post.keywords[word].includes(this.search.toLowerCase()) || post.title.toLowerCase().includes(this.search.toLowerCase())){
            wordMatch = true;
            break;
          }
          else{
            // console.log('NO MATCH');
            wordMatch = false;
          }
        }

        // Check to see if category matches the clicked button & everything was true before -> clicked array
        if(checkVars.includes(post.category)){
          catMatch = true;
        }
        else if(checkVars == ''){
          catMatch = true; 
        }
        else{
          catMatch = false;
        }

        // console.log(checkVars)
        // console.log(post.title, wordMatch);

        return wordMatch;
        // FOR THE TITLE SEARCH
        // post.title.toLowerCase().includes(this.search.toLowerCase())
    }
  },


  mounted: function () {
    var $this = this;
    $(document).ready(function(){
      
      $(document).on('click', '.checkbox', function(){
        // console.log('Click');
        // setTimeout(function(){
          $this.$forceUpdate();
        // }, 500)
      });
    });

    this.isLoggedIn();
    // console.log(this);
    // this.clickme();
  },


  components: {Search, filters, favourite},

  watch: {
    search: function(){
      return this.search;
    }
  },
  
  computed: {
    filteredList() {
      var $this = this;
      return this.posts;
    },
    flip() {
      // console.log('test', this);
      console.log(db.ref('posts/list'));
      // console.log('test', this.posts, db.ref('posts'), this.firebase.posts);
      var posts = this.posts;
      var copy = posts.slice()
      copy = copy.reverse();
      // console.log(copy);
      // for(var i = 0; i < posts.length; posts++){
      //   console.log(posts[i]);
      // }

      // console.log(Object.assign({}, this.posts));
      // console.log('Posts', posts);
      return copy;
    },
    reversdata(){
      return this.posts.reverse();
    }
  },
  created: function(){},
  mixins: [clickaway]
}

$(document).ready(function(){
  // highlight.highlights.collapseCode();
});