<template src="./App.html"></template>

<script src="./App.js"></script>

<style lang="scss">

#app{
	 background: url('~./assets/bg_pattern.png');
	 font-family: Helvetica;
	 min-height: 100vh;
	 #navigation{
	    background: #000;
	    width: 100%;
	    height: 55px;
	 	z-index: 11;
	 }
	 nav{
	 	border: none !important;
	 	border-radius: 0px !important;
	 	z-index: 3;
	 	opacity: 1;
    	background: #000 !important;
    	// margin: auto;
    	// max-width: 600px;
	 	.navbar-brand{
		    float: left;
		    padding: 0px 15px;
		    font-size: 18px;
		    line-height: 20px;
		    height: 50px;
	 	}
	 	.black-bk{
	 		background: black;
	 		width: 100%;
	 		height: 60px;
	 		margin-top: 20px;
	 	}
	 	border-bottom: 0px solid #c9c9c9;
	 	ul{
	 		li{
	 			cursor: pointer;
	 			a{
	 				color: white;
	 			}
	 		}
	 	}
	 }
}

.cta{
	margin-top:20px;
	margin-bottom:20px;
}

// @import "./scss/reset";
@import "./scss/main.scss";
</style>
