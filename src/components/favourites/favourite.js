import $ from 'jquery';
import {VueFire, firebase, config, firebaseApp, db, signIn, createNewUser, returnCurrentUser, signOut} from '../../firebase';

export default{
	name: 'favourite',
	data(){
		return{

		}
	},
	mounted(){
		console.log(this.getFavs());
	},
	methods: {
		getFavs(){
			return returnCurrentUser;
		}
	},
	firebase: {
		posts: db.ref('posts/list')
	}
}
