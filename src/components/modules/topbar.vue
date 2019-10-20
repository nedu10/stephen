<template>
	<header class="topbar">
		<div class="topbar-left">
			<span class="topbar-btn sidebar-toggler">
				<i>&#9776;</i>
			</span>

			<!-- <div class="lookup d-none d-md-block topbar-search" id="theadmin-search">
            <input class="form-control w-300px" type="text">
            <div class="lookup-placeholder">
                <i class="ti-search"></i>
                <span><strong>Search</strong></span>
            </div>
			</div>-->
		</div>

		<div class="topbar-right">
			<ul class="topbar-btns">
				<li class="dropdown">
					<span class="topbar-btn" data-toggle="dropdown">
						<img class="avatar" src="/static/assets/img/avatar/1.jpg" alt="...">
					</span>
					<div class="dropdown-menu dropdown-menu-right">
						<router-link
							v-if="accessLevel == 'User'"
							tag="a"
							to="/account/view-profile"
							class="dropdown-item"
						>
							<i class="ti-user"></i> Profile
						</router-link>
						<!-- <a class="dropdown-item" href="#">
							<div class="flexbox">
								<i class="ti-email"></i>
								<span class="flex-grow">Inbox</span>
								<span class="badge badge-pill badge-info">5</span>
							</div>
						</a>-->
						<!-- <router-link tag="a" to="/settings/general-settings" class="dropdown-item">
							<i class="ti-settings"></i> Settings
						</router-link>-->
						<!-- <div class="dropdown-divider"></div> -->
						<a class="dropdown-item" @click.prevent="initializeLogout" href="#">
							<i class="ti-power-off"></i> Logout
						</a>
					</div>
				</li>

				<!-- Notifications  -->
				<li class="dropdown d-md-block">
					<span class="topbar-btn has-new" data-toggle="dropdown">
						<i class="ti-briefcase"></i>
						<span class="badge badge-primary c-badge" v-if="cartItems.length > 0">{{cartItems.length}}</span>
					</span>
					<div class="dropdown-menu dropdown-menu-right">
						<div
							class="media-list media-list-hover media-list-divided media-list-xs"
							v-if="cartItems.length == 0"
						>
							<div class="default-ImageEmpty">
								<img
									src="/static/assets/img/img-noapproved-pr.svg"
									alt
									style="width: 100px; height: 100px;"
								>
								<h3 class="defaultTitle">
									<span class="fs-16 fw-400">Ops! There are no item in the Cart</span>
								</h3>
							</div>
						</div>

						<div
							class="media-list media-list-hover media-list-divided media-list-xs"
							v-for="(item, i) in cartItems"
							:key="i"
							v-else
						>
							<div class="media">
								<div class="media-body">
									<p>{{item.name}}</p>
									<time datetime="2017-07-14 20:00">{{item.price | ToCurrency}}</time>
								</div>
								<span @click="removeItem(i)">
									<i class="ti-trash btn btn-danger"></i>
								</span>
							</div>
						</div>

						<div class="dropdown-footer" v-if="cartItems.length > 0">
							<div class="left">
								<a href="#" class="fw-400 text-primary">TOTAL</a>
							</div>

							<div class="right">
								<a href="#" data-provide="tooltip" title="Settings">{{cartTotal | ToCurrency }}</a>
							</div>
						</div>
						<div class="dropdown-footer" v-if="cartItems.length > 0">
							<div class="left">
								<p class="mt-3">Proceed to pay</p>
							</div>

							<div class="right">
								<button class="mt-2 mb-2 fw-400 fs-16 btn btn-primary" @click="checkout()">Checkout</button>
							</div>
						</div>
					</div>
				</li>
				<!-- END Notifications  -->
				<!-- Messages -->
				<!-- <li class="dropdown d-none d-md-block">
                <span class="topbar-btn" data-toggle="dropdown"><i class="ti-email"></i></span>
                <div class="dropdown-menu dropdown-menu-right">

                    <div class="media-list media-list-divided media-list-hover media-list-xs scrollable" style="height: 290px">
                        <a class="media media-new" href="#">
                            <span class="avatar status-success">
                                    <img src="/static/assets/img/avatar/1.jpg" alt="...">
                                </span>

                            <div class="media-body">
                                <p><strong>Maryam Amiri</strong> <time class="float-right" datetime="2017-07-14 20:00">23 min ago</time></p>
                                <p class="text-truncate">Authoritatively exploit resource maximizing technologies before technically.</p>
                            </div>
                        </a>

                        <a class="media media-new" href="#">
                            <span class="avatar status-warning">
                                  <img src="/static/assets/img/avatar/2.jpg" alt="...">
                                </span>

                            <div class="media-body">
                                <p><strong>Hossein Shams</strong> <time class="float-right" datetime="2017-07-14 20:00">48 min ago</time></p>
                                <p class="text-truncate">Continually plagiarize efficient interfaces after bricks-and-clicks niches.</p>
                            </div>
                        </a>

                        <a class="media" href="#">
                            <span class="avatar status-dark">
                                    <img src="/static/assets/img/avatar/3.jpg" alt="...">
                                </span>

                            <div class="media-body">
                                <p><strong>Helen Bennett</strong> <time class="float-right" datetime="2017-07-14 20:00">3 hours ago</time></p>
                                <p class="text-truncate">Objectively underwhelm cross-unit web-readiness before sticky outsourcing.</p>
                            </div>
                        </a>

                        <a class="media" href="#">
                            <span class="avatar status-success bg-success">FT</span>

                            <div class="media-body">
                                <p><strong>Fidel Tonn</strong> <time class="float-right" datetime="2017-07-14 20:00">21 hours ago</time></p>
                                <p class="text-truncate">Interactively innovate transparent relationships with holistic infrastructures.</p>
                            </div>
                        </a>

                        <a class="media" href="#">
                            <span class="avatar status-danger">
                                    <img src="/static/assets/img/avatar/4.jpg" alt="...">
                                </span>

                            <div class="media-body">
                                <p><strong>Freddie Arends</strong> <time class="float-right" datetime="2017-07-14 20:00">Yesterday</time></p>
                                <p class="text-truncate">Collaboratively visualize corporate initiatives for web-enabled value.</p>
                            </div>
                        </a>

                        <a class="media" href="#">
                            <span class="avatar status-success">
                                    <img src="/static/assets/img/avatar/5.jpg" alt="...">
                                </span>

                            <div class="media-body">
                                <p><strong>Freddie Arends</strong> <time class="float-right" datetime="2017-07-14 20:00">Yesterday</time></p>
                                <p class="text-truncate">Interactively reinvent standards compliant supply chains through next-generation bandwidth.</p>
                            </div>
                        </a>
                    </div>

                    <div class="dropdown-footer">
                        <div class="left">
                            <a href="#">Read all messages</a>
                        </div>

                        <div class="right">
                            <a href="#" data-provide="tooltip" title="Mark all as read"><i class="fa fa-circle-o"></i></a>
                            <a href="#" data-provide="tooltip" title="Settings"><i class="fa fa-gear"></i></a>
                        </div>
                    </div>

                </div>
				</li>-->
				<!-- END Messages -->
			</ul>
		</div>
	</header>
</template>

<script>
export default {
	computed: {
		API() {
			return this.$store.state.API;
		},
		accessLevel() {
			return this.$store.getters.accessLevel;
		},
		cartItems() {
			return this.$store.getters.cartItems;
		},
		member() {
			return this.$store.state.memberProfile;
		},
		cartTotal() {
			return this.$store.getters.cartTotal;
		}
	},
	methods: {
		checkout() {
			let committees = this.$store.getters.getCommitteeCartList;
			this.$http
				.post(`${this.API}account/join-committee`, {
					committee_id: committees
				})
				.then(response => {
					console.log(response.body);

					if (response.body.message == " Successfully joined") {
						swal({
							title: "Successfully joined committee",
							text: response.body.message,
							icon: "success"
						});
					} else {
						swal({
							title: "Successfully Initialized",
							text: response.body.message,
							icon: "success"
						})
							.then(willDelete => {
								if (willDelete) {
									this.$http
										.post(`${this.API}payment/pay-committee-dues`, {
											email: this.member.email,
											amount: this.cartTotal * 100
										})
										.then(response => {
											console.log(response.body);
											window.location = response.body.authorization_url;
										})
										.catch(error => {
											console.log(error);
										});
								}
							})
							.catch(err => {
								if (err) {
									swal("Something went wrong", "error");
								}
							});
					}
				})
				.catch(error => {
					console.log(error);
				});
		},
		removeItem(id) {
			this.$store.commit("removeFromCart", id);
		},
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
			localStorage.clear();
			this.$router.push("/login");
			this.$store.commit("logOut");
		},
		mounted() {
			this.$store.commit("memberProfileAPI", this);
		}
	}
};
</script>


<style scoped>
.c-badge {
	display: inline-block;
	text-align: center;
	vertical-align: middle;
	border-radius: 200px;
	width: 20px;
	height: 20px;
	padding: 3px;
	top: 10px;
	right: 2px;
	font-size: 8px;
	position: absolute;
}
.default-ImageEmpty {
	height: 200px;
}
</style>
