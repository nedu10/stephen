<template>
	<div>
		<!-- Preloader -->
		<div class="preloader">
			<div class="spinner-dots">
				<span class="dot1"></span>
				<span class="dot2"></span>
				<span class="dot3"></span>
			</div>
		</div>
		<aside class="sidebar sidebar-icons-right sidebar-icons-boxed sidebar-expand-lg sidebar-dark">
			<header class="sidebar-header bg-regular">
				<!-- <a @click="router.push('/dashboard')" class="logo-icon">
					<img src="/static/assets/img/logo-icon-light.png" alt="logo icon">
				</a>-->
				<!-- <a class="logo-icon" href="dashboard.php"><img src="/static/assets/img/logo-icon-light.png" alt="logo icon"></a> -->
				<span class="logo">
					<a @click="router.push('/account/dashboard')">Membership App</a>
					<!-- <img src="/static/assets/img/logo-light.png" alt="logo"> -->
				</span>
			</header>

			<nav class="sidebar-navigation">
				<ul class="menu">
					<li class="menu-category" v-if="false">Members Navigation</li>

					<li class="menu-item">
						<router-link tag="a" to="/account/dashboard" class="menu-link">
							<span class="icon ti-dashboard"></span>
							<span class="title">Dashboard</span>
						</router-link>
					</li>
					<li class="menu-item">
						<router-link tag="a" to="/account/members" class="menu-link">
							<span class="icon ti-user"></span>
							<span class="title">Members</span>
						</router-link>
					</li>
					<li class="menu-item" v-if="(accessLevel == 'User')">
						<router-link to="/account/contact" tag="a" class="menu-link">
							<span class="icon ti-id-badge"></span>
							<span class="title">Contact</span>
						</router-link>
					</li>
					<li class="menu-item" v-if="(accessLevel == 'User')">
						<router-link to="/account/message" tag="a" class="menu-link">
							<span class="icon ti-comments"></span>
							<span class="title">Conversations</span>
						</router-link>
					</li>
					<!-- <li class="menu-item">
						<router-link to="/account/committee" tag="a" class="menu-link">
							<span class="icon ti-world"></span>
							<span class="title">Committees</span>
						</router-link>
					</li>-->
					<li class="menu-item">
						<router-link to="/account/transactions" tag="a" class="menu-link">
							<span class="icon ti-world"></span>
							<span class="title">Transactions</span>
						</router-link>
					</li>
					<li class="menu-item" v-if="accessLevel == 'User'">
						<a class="menu-link" href="#">
							<span class="icon ti-home"></span>
							<span class="title">Resources</span>
							<span class="arrow"></span>
						</a>
						<ul class="menu-submenu">
							<li class="menu-item">
								<router-link to="/account/resources" tag="a" class="menu-link">
									<span class="dot"></span>
									<span class="title">Resource Board</span>
								</router-link>
							</li>
							<li class="menu-item">
								<router-link tag="a" to="/account/create-resource" class="menu-link">
									<span class="dot"></span>
									<span class="title">Create Resource</span>
								</router-link>
							</li>
							<li class="menu-item">
								<router-link tag="a" to="/account/my-resource" class="menu-link">
									<span class="dot"></span>
									<span class="title">My Resources</span>
								</router-link>
							</li>
						</ul>
					</li>
					<!-- registration -->
					<li v-if="!(accessLevel == 'User')" class="menu-item">
						<a class="menu-link" href="#">
							<span class="icon ti-crown"></span>
							<span class="title">Registration</span>
							<span class="arrow"></span>
						</a>
						<ul class="menu-submenu">
							<li class="menu-item">
								<router-link tag="a" to="/account/admin-registration" class="menu-link">
									<span class="dot"></span>
									<span class="title">Member Registration</span>
								</router-link>
							</li>
							<li class="menu-item">
								<router-link tag="a" class="menu-link" to="/account/special-registration">
									<span class="dot"></span>
									<span class="title">Special Registration</span>
								</router-link>
							</li>
						</ul>
					</li>
					<!-- profile -->
					<li v-if="accessLevel == 'User'" class="menu-item">
						<a class="menu-link" href="#">
							<span class="icon ti-crown"></span>
							<span class="title">Profile</span>
							<span class="arrow"></span>
						</a>
						<ul class="menu-submenu">
							<li class="menu-item">
								<router-link tag="a" to="/account/view-profile" class="menu-link">
									<span class="dot"></span>
									<span class="title">View Profile</span>
								</router-link>
							</li>
							<li class="menu-item">
								<router-link tag="a" class="menu-link" to="/account/edit-profile">
									<span class="dot"></span>
									<span class="title">Edit Profile</span>
								</router-link>
							</li>
						</ul>
					</li>

					<li v-if="accessLevel != 'User'" class="menu-item">
						<a class="menu-link" href="#">
							<span class="icon ti-home"></span>
							<span class="title">Resources Management</span>
							<span class="arrow"></span>
						</a>
						<ul class="menu-submenu">
							<li class="menu-item">
								<router-link tag="a" to="/resources/create-resource" class="menu-link">
									<span class="dot"></span>
									<span class="title">Create Resource</span>
								</router-link>
							</li>
							<li class="menu-item">
								<router-link tag="a" class="menu-link" to="/resources/pending-resources">
									<span class="dot"></span>
									<span class="title">Pending</span>
								</router-link>
							</li>
							<li class="menu-item">
								<router-link tag="a" class="menu-link" to="/resources/approved-resources">
									<span class="dot"></span>
									<span class="title">Aproved</span>
								</router-link>
							</li>
							<li class="menu-item">
								<router-link tag="a" class="menu-link" to="/resources/disapproved-resources">
									<span class="dot"></span>
									<span class="title">Rejected</span>
								</router-link>
							</li>
						</ul>
					</li>
					<li v-if="accessLevel != 'User'" class="menu-item">
						<a class="menu-link" href="#">
							<span class="icon ti-home"></span>
							<span class="title">Change Details</span>
							<span class="arrow"></span>
						</a>
						<ul class="menu-submenu">
							<li class="menu-item">
								<router-link tag="a" class="menu-link" to="/settings/approved-request">
									<span class="dot"></span>
									<span class="title">Approved changes</span>
								</router-link>
							</li>
							<li class="menu-item">
								<router-link tag="a" class="menu-link" to="/settings/pending-request">
									<span class="dot"></span>
									<span class="title">Pending changes</span>
								</router-link>
							</li>
							<li class="menu-item">
								<router-link tag="a" class="menu-link" to="/settings/rejected-request">
									<span class="dot"></span>
									<span class="title">Disapproved changes</span>
								</router-link>
							</li>
						</ul>
					</li>

					<li class="menu-item">
						<router-link to="/account/notification" tag="a" class="menu-link">
							<span class="icon ti-blackboard"></span>
							<span class="title">Notifications</span>
						</router-link>
					</li>

					<li v-if="accessLevel != 'User' && false " class="menu-item">
						<a class="menu-link" href="#">
							<span class="icon ti-settings"></span>
							<span class="title">Settings</span>
							<span class="arrow"></span>
						</a>
						<ul class="menu-submenu">
							<!-- <li class="menu-item">
								<router-link tag="a" to="/settings/general-settings" class="menu-link">
									<span class="dot"></span>
									<span class="title">General Settings</span>
								</router-link>
							</li>-->
							<!-- <li class="menu-item">
								<router-link class="menu-link" tag="a" to="/settings/payment-settings">
									<span class="dot"></span>
									<span class="title">Payment</span>
								</router-link>
							</li>-->
							<li class="menu-item">
								<router-link class="menu-link" tag="a" to="/settings/dues-settings">
									<span class="dot"></span>
									<span class="title">Dues Management</span>
								</router-link>
							</li>
							<li class="menu-item">
								<router-link class="menu-link" tag="a" to="/settings/committees-settings">
									<span class="dot"></span>
									<span class="title">Manage Committees</span>
								</router-link>
							</li>
							<li class="menu-item">
								<router-link class="menu-link" tag="a" to="/settings/practice-area-settings">
									<span class="dot"></span>
									<span class="title">Practice Areas</span>
								</router-link>
							</li>
							<!-- <li class="menu-item">
								<router-link class="menu-link" tag="a" to="/settings/manage-committee">
									<span class="dot"></span>
									<span class="title">Manage committee</span>
								</router-link>
							</li>-->
							<li class="menu-item">
								<router-link class="menu-link" tag="a" to="/settings/firms-settings">
									<span class="dot"></span>
									<span class="title">Firms</span>
								</router-link>
							</li>
							<!-- <li class="menu-item">
								<router-link class="menu-link" tag="a" to="/settings/firm-type">
									<span class="dot"></span>
									<span class="title">Firm Types</span>
								</router-link>
							</li>-->
							<!-- <li class="menu-item">
								<router-link class="menu-link" tag="a" to="/settings/priviledge-type">
									<span class="dot"></span>
									<span class="title">Previlegde Type</span>
								</router-link>
							</li>-->
							<!-- <li class="menu-item">
								<router-link class="menu-link" tag="a" to="/settings/resource-type">
									<span class="dot"></span>
									<span class="title">Resource Type</span>
								</router-link>
							</li>-->
							<li class="menu-item">
								<router-link class="menu-link" tag="a" to="/settings/members-settings">
									<span class="dot"></span>
									<span class="title">Member Categories</span>
								</router-link>
							</li>
							<!-- <li class="menu-item">
								<router-link class="menu-link" tag="a" to="/settings/event-rate">
									<span class="dot"></span>
									<span class="title">Event Rate Group</span>
								</router-link>
							</li>-->
							<li class="menu-item">
								<router-link class="menu-link" tag="a" to="/settings/title-meta-settings">
									<span class="dot"></span>
									<span class="title">Titles</span>
								</router-link>
							</li>
							<li class="menu-item">
								<router-link class="menu-link" tag="a" to="/settings/branch-settings">
									<span class="dot"></span>
									<span class="title">NBA Branches</span>
								</router-link>
							</li>
						</ul>
					</li>
					<li class="menu-item">
						<a class="menu-link" @click.prevent="initializeLogout" href="#">
							<span class="icon ti-new-window"></span>
							<span class="title">Log Out</span>
						</a>
					</li>
				</ul>
			</nav>
		</aside>
	</div>
</template>
<script>
export default {
	computed: {
		accessLevel() {
			return this.$store.getters.accessLevel;
		}
	},
	methods: {
		initializeLogout() {
			swal({
				title: "Logout",
				text: "Are you sure you want to logout!",
				icon: "warning",
				buttons: true,
				dangerMode: true
			})
				.then(willDelete => {
					if (willDelete) {
						this.logOut();
					}
				})
				.catch(err => {
					if (err) {
						swal("Something went wrong", "error");
					}
				});
		},
		logOut() {
			localStorage.removeItem("membershipToken");
			localStorage.clear();
			this.$router.push("/login");
			this.$store.commit("logOut");
		}
	}
};
</script>


<style scoped>
header span {
	padding-top: 0px;
}
</style>
