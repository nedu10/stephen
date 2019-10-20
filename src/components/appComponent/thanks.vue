<template>
	<div>
		<div class="noise"></div>
		<notifications group="error" position="top right" :max="max"/>
		<div class="pace pace-inactive">
			<div class="pace-progress" data-progress-text="100%" data-progress="99" style="width: 100%;">
				<div class="pace-progress-inner"></div>
			</div>
			<div class="pace-activity"></div>
		</div>
		<div class="container pt-150" v-if="true">
			<div class="col-md-5 mx-auto">
				<div class="mk-white c-card--squared c-pb text-center">
					<img
						src="/static/img/rating.svg"
						alt
						class="img-responsive mb-40"
						style="color: #aaa !important"
						width="50%"
					>
					<h1>Your Registration was Successful</h1>
				</div>
			</div>
		</div>
		<div class="container ptfailed" v-if="false">
			<div class="col-md-7 mx-auto">
				<div class="mk-white c-card--squared p-0 text-center">
					<div class="bg-dark p-3 text-center">
						<h3 class="text-danger font-weight-bold">Payment Failed !</h3>
					</div>
					<div class="p-3 pb-3 pt-5">
						<div class="b-1 mb-3">
							<h6 class="px-4 pt-4 pb-2 text-uppercase text-center">Your payment process was not complete</h6>
							<h4
								class="px-2 font-weight-bold"
							>Your registration process is not complete until you make payment</h4>
						</div>
						<small class="px-3 pt-3">
							A payment link has been sent to
							<span class="text-danger">{{user.email}}</span> for the the convenience of paying later otherwise you can use the button bellow to go to payment
						</small>
						<div class="py-3 mb-2">
							<div class="mx-auto">
								<router-link tag="a" to="/register/payment/SBL0001">
									<button class="btn btn-danger" style="border: 2px solid #37404d;">BACK TO PAYMENT</button>
								</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			max: 1,
			user: { email: "crenettechlabs@crenettechlabs.com" }
		};
	},
	computed: {
		metaData() {
			return this.$store.state.meta_data;
		}
	},
	mounted() {
		this.$store.commit("metaDataAPI", this);
	}
};
</script>



<style>
.ptfailed {
	padding-top: 150px !important;
}
.mk-white {
	background-color: white;
}
.feedback {
	font-size: 60px;
	font-weight: 500;
	color: black;
}
.feedback-img {
	width: 25%;
}
.sub {
	font-size: 18px;
	font-weight: 400;
	padding: 0 25%;
}

.c-pb {
	padding: 40px;
}

.feedback-img {
	padding: 30px;
}

.noise {
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	pointer-events: none;
	z-index: 90;
}
.noise:before {
	content: "";
	position: absolute;
	top: -100%;
	left: -100%;
	height: 300%;
	width: 300%;
	background: url(../../assets/noise.png), rgba(68, 68, 68, 0.47) !important;
	pointer-events: none;
	display: block;
	opacity: 0.7;
	-webkit-animation: grain 2s steps(10) infinite;
	animation: grain 2s steps(10) infinite;
	will-change: transform;
}

@media screen and (max-width: 1000px) {
	.c-pb {
		padding: 5px;
	}
	.feedback {
		font-size: 50px;
	}
	.sub {
		padding: 0 5%;
	}
	.feedback-img {
		width: 200px;
	}
}
@media screen and (max-width: 500px) {
	.feedback {
		font-size: 45px;
	}
	.ptfailed {
		padding-top: 30px !important;
	}
	.sub {
		padding: 0 5%;
		font-size: 15px;
	}
	.feedback-img {
		width: 200px;
	}
}
</style>



