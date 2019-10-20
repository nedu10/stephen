<template>
	<div>
		<myHeader></myHeader>
		<sideBar></sideBar>
		<router-view v-if="checkMembershipDues"></router-view>
		<main v-else class="main">
			<clip-loader
				style="margin-top: 40vh !important;"
				:loading="toggleSpinner"
				:color="'green'"
				:size="'80px'"
			></clip-loader>
			<div v-if="!toggleSpinner" class="main-content">
				<div class="row">
					<div class="col-md-8 mx-auto">
						<div class="custom-card card card-body text-center">
							<div>
								<img src="/static/img/svg/reminder.svg" class="img-fluid" style="max-width: 30%">
							</div>
							<div>
								<div class="m-3" style="background-color: #fcfdfe">
									<h3
										class="font-weight-bold text-uppercase"
									>You cannot access this section because your membership dues has not been paid.</h3>
									<p
										class="lead mb-1"
										style="font-weight: 500;"
									>Please Pay your dues for access to this section.</p>
									<!-- <router-link :to="`/register/payment/${member.member_reg_code}`" tag="a"> -->
									<div
										@click="payNow(member.member_reg_code)"
										class="col-4 mx-auto btn btn-block btn-lg btn-primary"
										style="background-color: #007bff !important;"
									>PAY NOW</div>
									<!-- </router-link> -->
									<p class="font-weight-bold mb-0">Payment grants you full access to:</p>
									<hr class="my-2">
									<div class="callout callout-info pl-3 p-1" role="alert">
										<div class="flexbox justify-content-start">
											<p style="font-weight: 500" class="mb-1 fs-10">View all members on the platform.</p>
										</div>
										<div class="flexbox justify-content-start">
											<p style="font-weight: 500" class="mb-1 fs-10">Add members to your contacts list.</p>
										</div>
										<div class="flexbox justify-content-start">
											<p
												style="font-weight: 500"
												class="mb-1 fs-10"
											>Direct conversations with members in your contacts.</p>
										</div>
										<div class="flexbox justify-content-start">
											<p
												style="font-weight: 500"
												class="mb-1 fs-10"
											>Register and get more information about Events.</p>
										</div>
										<div class="flexbox justify-content-start">
											<p style="font-weight: 500" class="mb-1 fs-10">Join more Committees.</p>
										</div>
									</div>

									<!-- <a class="btn btn-info" href="user-committee.php" style="color: white">PAY NOW</a> -->
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
import sideBar from "@/components/modules/sidebar.vue";
import myheader from "@/components/modules/topbar.vue";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";

export default {
	//   name: 'app',
	data() {
		return {
			toggleSpinner: false
		};
	},
	computed: {
		checkMembershipDues() {
			const currentDate = new Date().getFullYear();
			this.toggleSpinner = false;

			if (this.member.first_name && this.settings.id) {
				let checkReturn = 0;
				if (
					this.member.privileges &&
					this.member.privileges[0].privilege_type_label != "User"
				) {
					// console.log(
					// 	"ssshhhshsshhsh >> ",
					// 	this.member.privileges[0].privilege_type_label
					// );
					return (checkReturn = 1);
				} else if (currentDate == this.member.due_payment_year) {
					// console.log("thanks i paid");
					return (checkReturn = 1);
				} else if (this.settings.is_grace_period) {
					// console.log("thanks grace period");

					//flag notification for the users
					return (checkReturn = 1);
				} else {
					if (
						this.$route.path == "/account/dashboard" ||
						this.$route.path == "/account/view-profile" ||
						this.$route.path == "/account/edit-profile" ||
						this.$route.path == "/settings/general-settings"
					) {
						// console.log(this.$route);
						// console.log("wow my route is helping me");
						//allow only profile and dashboard
						return (checkReturn = 1);
					} else {
						// console.log("opps");

						// console.log(this.$route);
						return (checkReturn = 0);
					}
				}
				return checkReturn ? true : false;
				// return currentDate == this.member.due_payment_year ? true : false;
			} else {
				this.toggleSpinner = true;
				return false;
			}
		},
		member() {
			// console.log("am here index >> ", this.$store.state.memberProfile);
			return this.$store.state.memberProfile;
		},
		API() {
			return this.$store.state.API;
		},
		settings() {
			// console.log("showing settings index >> ", this.$store.state.settings2);
			return this.$store.state.settings2;
		}
	},
	components: {
		sideBar: sideBar,
		myHeader: myheader,
		ClipLoader: ClipLoader
	},
	methods: {
		payNow(member_reg_code) {
			localStorage.removeItem("membershipToken");
			localStorage.clear();
			this.$store.commit("logOut");
			this.$router.push(`/register/payment/${member_reg_code}`);
		}
	},
	mounted() {
		// console.log("happenning in index.vue");
		this.$store.commit("memberProfileAPI", this);
		this.$store.commit("metaData", this);
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			// console.log(from.path);
			if (from.path === "/login" || from.path === "/register") {
				location.reload(true);
			}
			if (
				from.path ===
				`/register/create-password/${localStorage.getItem("confirmationUrl")}`
			) {
				// console.log("am here");

				localStorage.removeItem("confirmationUrl");
				location.reload(true);
			}
		});
	}
};
</script>
<style>
</style>
