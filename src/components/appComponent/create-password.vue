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
		<div class="container pt-80 pb-20">
			<div class="row">
				<div class="col-md-8 mx-auto my-auto">
					<div
						class="c-card--squared m-rmboxshadow px-50 py-20 w-800px mb-0"
						style="max-width: 100%; z-index:2000;"
					>
						<div>
							<img
								:src="settings.org_logo_url"
								v-if="settings.org_logo_url"
								class="img-responsive w-80 logo-size"
								alt="NBA-SBL logo"
							>
							<img
								v-else
								src="\static\img\nbasbl-reg-form-logo.jpg"
								class="img-responsive w-80 logo-size"
								alt="NBA-SBL logo"
							>
						</div>
						<h4 class="pt-15 text-capitalize heading-big">Account Security</h4>
						<p
							class="heading-sub pb-20"
						>Please provide a secure password which will contain at least six alpha-numeric characters for accessing your Membership Account</p>
						<form @submit.prevent="logIn" class="pb-60" novalidate="true">
							<p class="fs-24 text-uppercase">
								Create your
								<strong class="text-primary">Password</strong>
							</p>
							<div>
								<div class="form-group">
									<label for="password" class="c-label">Password</label>
									<input
										type="password"
										@change="restrictionTest"
										required
										minlength="6"
										v-model="member.password"
										class="form-control"
									>
									<p v-if="error.password" class="text-danger">Password is required</p>
									<p v-if="error.restriction" class="text-danger">{{error.restriction_message}}</p>
								</div>
								<div class="form-group mb-30">
									<label for="password" class="c-label">Confirm Password</label>
									<input
										@change="confirmPasswordFalse"
										v-model="member.confirm_password"
										minlength="6"
										required
										type="password"
										class="form-control"
									>
									<p v-if="error.confirm_password" class="text-danger">Password is required</p>
									<p v-if="error.not_match" class="text-danger">Password does not match</p>
								</div>

								<div class="form-group">
									<button :disabled="disableButton" class="btn btn-success btn-block">Create Password</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from "vue";
export default {
	data() {
		return {
			disableButton: false,
			max: 1,
			member: {
				password: "",
				confirm_password: ""
			},
			error: {
				password: false,
				confirm_password: false,
				not_match: false,
				restriction: false,
				restriction_message: ""
			}
		};
	},
	computed: {
		settings() {
			if (this.$store.state.meta_data.generalSettings) {
				return this.$store.state.meta_data.generalSettings[0];
			}
			return {};
		},
		meta_data() {
			return this.$store.state.meta_data;
		},
		confirmation_token() {
			// console.log(
			// 	"here is the confirmation token >> ",
			// 	this.$route.params.confirmation_token
			// );
			return this.$route.params.confirmation_token;
		},
		confirmPasswordFalse() {
			this.error.confirm_password = false;
			this.error.not_match = false;
			return true;
		},

		API() {
			return this.$store.state.API;
		}
	},
	methods: {
		restrictionTest() {
			// console.log("show >> ", this.member.password.search(/\d/));
			//testing password validity
			this.error.password = false;
			if (this.member.password.length < 6) {
				this.error.restriction = true;
				this.error.restriction_message =
					"Password must be atleast six(6) characters";
			} else if (this.member.password.length > 50) {
				this.error.restriction = true;
				this.error.restriction_message = "Password is too long";
			} else if (this.member.password.search(/\d/) == -1) {
				this.error.restriction = true;
				this.error.restriction_message = "Weak Password. Add Number(s)";
			} else if (this.member.password.search(/[a-zA-Z]/) == -1) {
				this.error.restriction = true;
				this.error.restriction_message = "Password must contain an alphabet";
			}
			// else if (
			// 	this.member.password.search(/[\!\@\#\$\%\^\&\*\(\)\_\+]/) == -1
			// ) {
			// 	this.error.restriction = true;
			// 	this.error.restriction_message =
			// 		"Weak Password. Add Special Character(s) like @_%&...";
			// }
			else if (
				this.member.password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) !=
				-1
			) {
				this.error.restriction = true;
				this.error.restriction_message =
					"Password contain Invalid Character(s)";
			} else {
				this.error.restriction = false;
			}
		},
		logIn() {
			this.restrictionTest();
			this.disableButton = true;
			this.error.confirm_password = false;
			this.error.password = false;
			this.error.not_match = false;

			if (
				this.error.restriction ||
				this.member.confirm_password === "" ||
				this.member.password === "" ||
				this.member.password != this.member.confirm_password
			) {
				if (this.member.password != this.member.confirm_password) {
					this.error.not_match = true;
				}
				if (this.member.confirm_password === "") {
					this.error.confirm_password = true;
				}
				if (this.member.password === "") {
					this.error.password = true;
				}
				this.disableButton = false;
			} else {
				// console.log("show me pass >> ", this.member.confirm_password);
				this.$http
					.put(`${this.API}register/confirm/${this.confirmation_token}`, {
						new_password: this.member.confirm_password
					})
					.then(response => {
						// console.log(response);
						this.disableButton = false;
						this.validationNotification(response.body.message, "success");
						// console.log(response.body.token.token);
						localStorage.setItem("confirmationUrl", this.confirmation_token);
						// localStorage.setItem("membershipToken", response.body.token.token);
						const vm = this;
						setTimeout(() => {
							if (vm.settings.allow_payment_at_reg) {
								// console.log("am here ");
								vm.$router.push(
									`/register/payment/${response.body.member_reg_code}`
								);
							} else {
								vm.$router.push("/feedback");
							}
							// vm.$router.push("/dashboard");
						}, 1500);
					})
					.catch(error => {
						console.log(error);
						this.disableButton = false;
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
	},
	mounted() {
		this.$http
			.get(`${this.API}meta-data`)
			.then(response => {
				// console.log(response.body.data);
				this.$store.state.meta_data = response.body.data;
			})
			.catch(error => {
				console.log(error);
			});
	}
};
</script>
<style >
span.custom-control-indicator.c-make-gray {
	border: solid 1px #aaa;
}
.c-label {
	color: black;
	font-size: 14px;
}
.c-span {
	display: block;
}
.c-desc {
	font-size: 16px;
	font-weight: 500;
}
.c-pb-10 {
	padding-bottom: 15px;
}

.m-divide {
	border-color: rgba(0, 0, 0, 0.36);
}
.mk-bold {
	font-size: 30px;
	font-weight: 500;
	color: black;
}
.bill-caption {
	font-size: 15px;
	font-weight: 500;
}
.prices-listing {
	list-style: none;
	padding: 0px;
}
.prices-listing li {
	color: black;
	font-weight: 500;
	font-size: 15px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding-bottom: 5px;
	border-bottom: 1px solid black;
}

.bill-categories {
	margin-top: 4px;
	font-size: 17px;
	font-weight: 600;
}
.bill {
	padding: 40px 20px;
	background-color: #dedede;
	color: #2b2b2b;
	font-size: 50px;
	font-weight: 600;
	border: 2px solid #d6d6d6;
}
.bill-breakdown {
	font-size: 14px;
	background-color: #252525;
	color: white;
	padding: 8px;
	margin-bottom: 0px;
	font-weight: 400;
}
.m-rmboxshadow {
	box-shadow: none;
}
input {
	font-weight: 400;
	color: black;
}
.m-beside {
	background-color: #ffffff;
	color: #282828;
	margin-left: -30px;
	/* z-index: 1000; */
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

.select-option {
	padding: 5px;
}

.heading-big {
	font-size: 2rem;
	font-weight: 500;
}

.heading-sub {
	font-size: 15px;
	font-weight: 500;
}

.dropdown-toggle::after {
	margin-top: 12px !important;
	cursor: pointer !important;
}
.v-select .vs__actions {
	display: none !important;
}
.v-select.searchable .dropdown-toggle {
	border: 0 !important;
	padding: 0px !important;
}

ul.dropdown-menu[role="listbox"] {
	max-height: 150px !important;
}

.logo-size {
	width: 65%;
}

@media screen and (max-width: 500px) {
	.heading-big {
		font-size: 1.4rem;
		line-height: 128%;
	}

	.px-50 {
		padding-right: 20px !important;
		padding-left: 20px !important;
	}

	.logo-size {
		width: 100%;
	}

	p.heading-sub {
		line-height: 125%;
	}
}
</style>
