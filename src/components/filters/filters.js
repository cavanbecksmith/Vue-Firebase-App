import Vue from 'vue'
import {VueFire, firebase, config, firebaseApp, db, signIn, createNewUser, returnCurrentUser, signOut} from '@/firebase.js'
import $ from 'jquery';

export default{
  	firebase: {
	    posts: db.ref('posts/list')
	},
	data: function(){
		return{
			
		}
	},
	mounted: function(){
		var $this = this;
		$this.returnCategoryInputs($('.categories'));
		// window.getList = $this.returnCategoryInputs($('.categories'));
		
		// setTimeout(function(){
			$this.checkboxClick();
		// }, 300)
		window.document.body.onscroll = function() {
		    if (window.pageYOffset >= 110){
		    	$("#fixedPostHeader").addClass("fixed")
		    }
		    else {
		    	$("#fixedPostHeader").removeClass("fixed")
		    }
		}
	},
	methods: {
		returnCategoryInputs: function(obj){

			var $this = this;
			var x;
			var list = $this.getList($this.posts);

      // console.log('list', list, this.posts);

			// console.log(obj);
			$this.clearList(obj);

			$.each(list, function(){
        var label = this;
        console.log('asdf', label);
				// obj.append($('<label class="checkbox-inline"><input class="checkbox" type="checkbox" :click="test()" id="inlineCheckbox1" value="'+label+'">'+label+'</label>'));
				obj.append($('<label class="custom-control custom-checkbox checkbox-inline"><input class="checkbox custom-control-input" type="checkbox" id="inlineCheckbox1" value="'+label+'"><span class="custom-control-description">'+label+'</span></label>'));
			})

			return x;			
		},
		getList: function(list){

      console.log('GetList', typeof list)
			var newList = new Array();

			// for(var i = 0; i < list.length; i++){
      for (var i in list) {
        // console.log(list[i].category);
        console.log(list[i]);

				if(newList.includes(list[i].category)){
					// console.log('Tis true')
				}
				else{
					newList.push(list[i].category);
				}
      }
      
      console.log('newlist', newList);

			return newList;
		},
		clearList: function(obj){
			obj.html('');
		},
		test: function(){
			alert('Test');
		},
		checkboxClick: function(){
			$('.categories .checkbox').on('click', function () {

				// Get variables
				var checkedBoxes = [];
				var clicked = $(this).val();
				var checked = $(this).prop('checked');
				var checkedStr;


				// Loop all options to see other checked boxes
				$('.categories').find('.checkbox').each(function(i){
					// console.log($(this), i);
					console.log();
					if($(this).prop('checked')){
						checkedBoxes.push($(this).val());
					}
				});

				checkedStr = checkedBoxes.join(' ');
				$('.posts').attr('data-checked', checkedStr);
				console.log(checkedStr);

				// Loop through each post to check if they
				// Are to be filtered

				if(checkedBoxes.length != 0){

					$('.post').each(function(){

						var category = $(this).find('.category').text();

						// Loop the checkedBoxes array
						// for(var i = 0; i < checkedBoxes.length; i++){
						// 	console.log(checkedBoxes[i]);
						// 	if(category )
						// }

						if(checkedBoxes.includes(category)){
							$(this).removeClass('hidden');
						}
						else{
							$(this).addClass('hidden');
						}

					});
				}
				else{
					$('.post').removeClass('hidden');
				}
			});

			// Vue.nextTick(function () {
			  // vm.$el.textContent === 'new message' // true
			// })

			// console.log(this.$parent.$children[0].filteredList);
			// this.$parent.$forceUpdate()


		}
	}
}