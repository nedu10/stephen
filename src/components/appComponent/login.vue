<template>
	<div>
		<div class="site-noise"></div>
		<notifications group="error" position="top right" :max="max"/>
		<div class="pace pace-inactive">
			<div class="pace-progress" data-progress-text="100%" data-progress="99" style="width: 100%;">
				<div class="pace-progress-inner"></div>
			</div>
			<div class="pace-activity"></div>
		</div>

		<div class="row min-h-fullscreen center-vh p-20 m-0 make-dark">
			<div class="col-12">
				<div
					class="m-makeTop card card-shadowed px-50 py-30 w-400px mx-auto"
					style="max-width: 100%; z-index:200"
				>
					<h5 class="text-uppercase">Login To NBA MemberShip</h5>
					<br>

					<form class="form-type-fill" method="POST" @submit.prevent="logIn()">
						<div class="form-group">
							<input
								v-model="member.email_username"
								type="text" 
								class="form-control form-control-lg"
								id="email"
							>
							<label for="email">Email address/Username</label>
							<span v-if="error.email_username" class="text-danger">Email or Username is required</span>
						</div>

						<div class="form-group">
							<input
								v-model="member.password"
								type="password"
								class="form-control form-control-lg"
								id="password"
							>
							<label for="password">Password</label>
							<span v-if="error.password" class="text-danger">Password is required</span>
						</div>

						<!-- <div class="form-group flexbox flex-column flex-md-row">
							<a class="text-muted hover-primary fs-13 mt-2 mt-md-0" href="#">Forgot password?</a>
						</div>-->
						<div class="form-group">
							<button class="btn btn-bold btn-block btn-lg btn-primary" type="submit">Login</button>
						</div>
					</form>
					<p class="text-center text-muted fs-13 mt-20">
						Don't have an account?
						<a tag="a" href="/register" class="text-primary fw-500">Register</a>
					</p>
				</div>
				<!-- <p class="text-center text-muted fs-13 mt-20">
          Don't have an account?
          <a class="text-primary fw-500" href="#">Sign up</a>
				</p>-->
			</div>

			<footer class="col-12 align-self-end text-center fs-13">
				<p class="text-white">
					Copyright © 2019. All Rights Reserved | Powered by
					<a
						href="http://www.crenettechlabs.com"
						class="text-white font-weight-bold"
					>Crenet TechLabs</a>
				</p>
			</footer>
		</div>
	</div>
</template>
<script>
import Vue from "vue";
export default {
	data() {
		return {
			max: 1,
			member: {
				email_username: "",
				password: ""
			},
			error: {
				email_username: false,
				password: false
			}
		};
	},
	computed: {
		API() {
			return this.$store.state.API;
		},
		returnDate() {
			let date = new Date();
			return date.getFullYear();
		}
	},
	methods: {
		logIn() {
			this.error.email_username = false;
			if (this.member.email_username === "" || this.member.password === "") {
				if (this.member.email_username === "") {
					this.error.email_username = true;
				}
				if (this.member.password === "") {
					this.error.password = true;
				}
			} else {
				this.$http
					.post(`${this.API}login`, {
						email: this.member.email_username,
						password: this.member.password
					})
					.then(response => {
						// console.log(response);
						this.validationNotification(response.body.message, "success");
						// console.log(response.body.result);
						localStorage.setItem("membershipToken", response.body.result.token);
						const vm = this;
						setTimeout(() => {
							vm.$router.push("/account/dashboard");
						}, 1500);
					})
					.catch(error => {
						console.log(error);
						// console.log(error.response);
						this.validationNotification(error.body.message, "error");
					});
			}
		},
		validationNotification(message, type) {
			Vue.notify({
				group: "error",
				text: "* " + message,
				type: type,
				duration: 2500
			});
		}
	}
};
</script>


<style>
.make-dark {
	background-color: rgba(68, 68, 68, 0.47);
}
.site-noise {
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	pointer-events: none;
	z-index: 90;
}

.site-noise::before {
	content: "";
	position: absolute;
	top: -100%;
	left: -100%;
	height: 300%;
	width: 300%;
	background: url(../../assets/noise.png);
	pointer-events: none;
	display: block;
	opacity: 0.6;
	-webkit-animation: grain 2s steps(10) infinite;
	animation: grain 2s steps(10) infinite;
	will-change: transform;
}
</style>
