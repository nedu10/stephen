<template>
	<div>
		<div class="noise"></div>
		<notifications group="error" position="top right" :max="max"/>
		<clip-loader
			style="margin-top: 40vh !important;"
			:loading="!meta_data.generalSettings"
			:color="'green'"
			:size="'80px'"
		></clip-loader>
		<div class="pace pace-inactive" v-if="meta_data.generalSettings">
			<div class="pace-progress" data-progress-text="100%" data-progress="99" style="width: 100%;">
				<div class="pace-progress-inner"></div>
			</div>
			<div class="pace-activity"></div>
		</div>
		<div class="container pt-20" v-if="meta_data.generalSettings">
			<div class="row">
				<!-- <pre>{{errors}}</pre> -->
				<div class="col-md-8 mx-auto">
					<div
						class="c-card--squared m-rmboxshadow px-50 py-30 w-800px mb-0"
						style="max-width: 100%; z-index:2000;"
					>
						<div class="mx-auto">
							<img
								:src="settings.org_logo_url"
								v-if="settings.org_logo_url"
								class="img-responsive logo-size w-80 mx-auto"
								alt="NBA-SBL logo"
							>
							<img
								v-else
								src="\static\img\nbasbl-reg-form-logo.jpg"
								class="img-responsive w-80 logo-size"
								alt="NBA-SBL logo"
							>
						</div>
						<h4
							v-if="settings.registration_title && tab.register"
							class="pt-15 text-capitalize heading-big"
						>{{settings.registration_title}}</h4>
						<p
							v-if="settings.registration_sub_header && tab.register"
							class="heading-sub"
						>{{settings.registration_sub_header}}</p>
						<p v-if="confirmRegistrationDataToggler" class="heading-big pt-3">Verify your information</p>
						<form data-provide="wizard" @submit.prevent="confirmRegistration" novalidate="true">
							<div class="tab-content">
								<div
									class="tab-pane fade"
									:class="{'active': tab.register, 'show': tab.register}"
									v-show="tab.register"
									id="wizard-validate-1"
									data-provide="validation"
									novalidate="true"
									aria-expanded="true"
								>
									<br>
									<div class="row">
										<div class="col-md-6 form-group">
											<label class="c-label">Title</label>
											<select
												placeholder="Select your title"
												required
												@change="error.title = false"
												name="Title"
												v-model="member.title"
												class="form-control"
												:style="{'background': (errors.has('Title')) ? '#ffdbdb' : ''}"
											>
												<option value hidden>Select your title</option>
												<option
													class="select-option"
													v-for="(eachTitle, i) in title"
													:value="eachTitle"
													:key="i"
												>{{eachTitle.title_label}}</option>
											</select>
											<span v-if="error.title && !errors.has('Title')" class="text-danger">Title is required</span>
											<span class="text-danger" v-show="errors.has('Title')">{{ errors.first('Title') }}</span>
										</div>
										<div class="col-md-6 form-group">
											<label class="c-label">Senior Advocate Of Nigeria (SAN)</label>
											<select
												@change="changeSan"
												required
												:style="{'background': (errors.has('SAN')) ? '#ffdbdb' : ''}"
												name="SAN"
												v-validate="'required'"
												v-model="member.senior_advocate_of_nigeria"
												class="form-control"
											>
												<option value hidden>Are you a SAN</option>
												<option :value="1">Yes</option>
												<option :value="0">No</option>
											</select>
											<span
												v-if="error.senior_advocate_of_nigeria && !errors.has('SAN')"
												class="text-danger"
											>SAN is required</span>
											<span class="text-danger" v-show="errors.has('SAN')">{{ errors.first('SAN') }}</span>
										</div>
									</div>
									<div class="row">
										<div class="col-md-6 form-group">
											<label class="c-label">First Name</label>
											<input
												@change="error.first_name = false"
												required
												v-model="member.first_name"
												type="text"
												:style="{'background': (errors.has('Fast Name')) ? '#ffdbdb' : ''}"
												name="Fast Name"
												class="form-control"
												v-validate="'required'"
												placeholder="First Name"
											>
											<span
												v-if="error.first_name && !errors.has('Fast Name')"
												class="text-danger"
											>First Name is required</span>
											<span
												class="text-danger"
												v-show="errors.has('Fast Name')"
											>{{ errors.first('Fast Name') }}</span>
										</div>
										<div class="col-md-6 form-group">
											<label class="c-label">Last Name</label>
											<input
												@change="error.last_name = false"
												required
												v-model="member.last_name"
												type="text"
												class="form-control"
												:style="{'background': (errors.has('Last Name')) ? '#ffdbdb' : ''}"
												name="Last Name"
												v-validate="'required'"
												placeholder="Last Name"
											>
											<span
												v-if="error.last_name && !errors.has('Last Name')"
												class="text-danger"
											>Last Name is required</span>
											<span
												class="text-danger"
												v-show="errors.has('Last Name')"
											>{{ errors.first('Last Name') }}</span>
										</div>
									</div>
									<div class="row">
										<div class="col-md-6 form-group">
											<label class="c-label">Phone Number</label>
											<div class="input-group">
												<span class="input-group-btn">
													<v-select
														label="dial_code"
														:options="countryCode"
														v-model="country_code_data"
														class="form-control"
													></v-select>
													<!-- <select class="btn">
														<option>+234</option>
														<option>+41</option>
														<option>+741</option>
													</select>-->
												</span>
												<input
													required
													@change="error.phone_no = false"
													v-model="member.phone_no"
													name="Phone Number"
													:style="{'background': (errors.has('Phone Number')) ? '#ffdbdb' : ''}"
													v-validate="'required|max:16|min:10'"
													type="number"
													class="form-control"
													placeholder="Provide a valid Phone Number"
												>
											</div>
											<span
												v-if="error.phone_no && !errors.has('Phone Number')"
												class="text-danger"
											>Phone Number is required</span>
											<span
												class="text-danger"
												v-show="errors.has('Phone Number')"
											>{{ errors.first('Phone Number') }}</span>
										</div>
										<!-- <div class="col-md-6 form-group">
											<label class="c-label">Phone Number</label>
											<input
												required
												@change="error.phone_no = false"
												v-model="member.phone_no"
												name="Phone Number"
												:style="{'background': (errors.has('Phone Number')) ? '#ffdbdb' : ''}"
												v-validate="'required|max:11'"
												type="number"
												class="form-control"
												placeholder="08000000000"
											>
											<span
												v-if="error.phone_no && !errors.has('Phone Number')"
												class="text-danger"
											>Phone Number is required</span>
											<span
												class="text-danger"
												v-show="errors.has('Phone Number')"
											>{{ errors.first('Phone Number') }}</span>
										</div>-->
										<div class="col-md-6 form-group">
											<label class="c-label">Email</label>
											<input
												required
												@change="error.email = false"
												v-validate="'required|email'"
												v-model="member.email"
												:style="{'background': (errors.has('Email')) ? '#ffdbdb' : ''}"
												type="email"
												name="Email"
												class="form-control"
												placeholder="Provide a valid Email"
											>
											<span v-if="error.email && !errors.has('Email')" class="text-danger">Email is required</span>
											<span class="text-danger" v-show="errors.has('Email')">{{ errors.first('Email') }}</span>
										</div>
									</div>
									<div class="row">
										<div class="col-md-6 form-group">
											<label class="c-label">Gender</label>
											<select
												required
												id="select"
												@change="error.gender = false"
												name="Gender"
												v-validate="'required'"
												v-model="member.gender"
												:style="{'background': (errors.has('Gender')) ? '#ffdbdb' : ''}"
												class="form-control"
											>
												<option value hidden>Select your Gender</option>
												<option value="male">Male</option>
												<option value="female">Female</option>
											</select>
											<span v-if="error.gender && !errors.has('Gender')" class="text-danger">Gender is required</span>
											<span class="text-danger" v-show="errors.has('Gender')">{{ errors.first('Gender') }}</span>
										</div>
										<div class="col-md-6 form-group">
											<label class="c-label">Year of Call to Bar</label>
											<input
												required
												name="Year of call to Bar"
												:style="{'background': (errors.has('Year of call to Bar')) ? '#ffdbdb' : ''}"
												v-validate="'required|max:4|min_value:1960'"
												@change="yearOfCallCal"
												v-model="member.year_of_call"
												type="number"
												class="form-control"
												placeholder
											>
											<span
												v-if="error.year_of_call && !errors.has('Year of call to Bar')"
												class="text-danger"
											>Year of Call to Bar is required</span>
											<span
												v-if="error.trigger_wrong_year && !errors.has('Year of call to Bar')"
												class="text-danger"
											>greater than current year</span>
											<span
												class="text-danger"
												v-show="errors.has('Year of call to Bar')"
											>{{ errors.first('Year of call to Bar') }}</span>
										</div>
									</div>
									<div class="row">
										<div class="col-md-6">
											<label class="c-label">Supreme Court Number (SCN)</label>
											<div class="form-group input-group">
												<span class="input-group-addon w-50px">SCN</span>
												<input
													required
													name="supreme court number"
													:style="{'background': (errors.has('supreme court number')) ? '#ffdbdb' : ''}"
													@change="error.supreme_court_number = false"
													v-model="member.supreme_court_number"
													v-validate="'required|max:8|min:5|alpha_num'"
													type="text"
													class="form-control"
													placeholder="Your enrollment number"
												>
											</div>
											<span
												v-if="error.supreme_court_number && !errors.has('supreme court number')"
												class="text-danger"
											>SCN is required</span>
											<span
												class="text-danger"
												v-show="errors.has('supreme court number')"
											>{{ errors.first('supreme court number') }}</span>
										</div>
										<div class="col-md-6 form-group">
											<label class="c-label">NBA Branch</label>
											<v-select
												placeholder="Select your branch"
												label="branch_label"
												:options="branch"
												v-model="member.nba_branch_id"
												class="form-control"
											></v-select>
										</div>
									</div>

									<div class="row">
										<div class="col-md-12 form-group" v-if="!create_firm.toggle">
											<label class="c-label" v-if="!create_firm.toggle">Organization</label>
											<div class="d-flex">
												<v-select
													v-if="!create_firm.toggle"
													name="firm"
													:style="{'background': (errors.has('firm')) ? '#ffdbdb' : ''}"
													@change="error.firm = false"
													v-validate="'required'"
													placeholder="Select your organization"
													label="firm_name"
													:options="meta_data.firm"
													v-model="member.firm"
													class="form-control"
												></v-select>
												<div v-if="!create_firm.toggle" class="w-50px text white c-addon" @click="openAddFirm">
													<i class="fa fa-plus"></i>
												</div>
											</div>
											<span class="d-flex">Kindly add your organization if you can't find it in the list above</span>
											<span
												v-if="error.firm && !errors.has('firm')"
												class="text-danger"
											>Organization is required</span>
											<span class="text-danger" v-show="errors.has('firm')">{{ errors.first('firm') }}</span>
										</div>
										<div class="col-12" v-if="create_firm.toggle">
											<form>
												<div class="row">
													<div class="form-group col-md-6">
														<label class="c-label" for="firm_type">Organization Type</label>
														<select
															@change="error.firm_type = false"
															class="form-control"
															name="firm type"
															:style="{'background': (errors.has('firm type')) ? '#ffdbdb' : ''}"
															v-validate="'required'"
															v-model="create_firm.firm_type"
															id="firm_type"
														>
															<option value hidden>Enter Organization type</option>
															<option
																v-for="(firmType, i) in meta_data.firmType"
																:key="i"
																:value="firmType.id"
															>{{firmType.firm_type_label}}</option>
														</select>
														<span
															v-if="error.firm_type && !errors.has('firm type')"
															class="text-danger"
														>Organization type is required</span>
														<span
															class="text-danger"
															v-show="errors.has('firm type')"
														>{{ errors.first('firm type') }}</span>
													</div>
													<div class="form-group col-md-6">
														<label class="c-label" for="firm_name">Organization Name</label>
														<input
															type="text"
															@change="error.firm_name = false"
															name="firm name"
															:style="{'background': (errors.has('firm name')) ? '#ffdbdb' : ''}"
															v-validate="'required'"
															v-model="create_firm.firm_name"
															class="form-control"
															id="firm_name"
															placeholder="Enter Organization name"
														>
														<span
															v-if="error.firm_name && !errors.has('firm name')"
															class="text-danger"
														>Organization name is required</span>
														<span
															class="text-danger"
															v-show="errors.has('firm name')"
														>{{ errors.first('firm name') }}</span>
													</div>
												</div>

												<button @click.prevent="closeAddFirm" class="btn btn-danger">Cancel</button>
											</form>
										</div>
									</div>

									<div class="row">
										<!-- is firm paying -->
										<!-- Radio Button -->
										<div class="col-sm-12 form-group">
											<label class="c-label">Will your organization take up the Membership Costs</label>
											<select v-model="member.is_firm_paying" class="form-control">
												<option :value="true">Yes</option>
												<option :value="false">No</option>
											</select>
										</div>
									</div>

									<hr
										style="border-top-color: rgba(0, 0, 0, 0.27) !important; margin: 1rem auto !important;"
									>
									<div class="row w-100">
										<div class="d-flex w-100 justify-content-end">
											<button
												class="btn btn-secondary"
												:disabled="errors.items.length > 0"
												type="button"
												@click.prevent="committeeAction"
											>Next</button>
										</div>
									</div>
								</div>

								<div
									class="tab-pane fade"
									:class="{'active': tab.committee, 'show': tab.committee}"
									v-show="tab.committee"
									id="wizard-validate-2"
									data-provide="validation"
									novalidate="true"
								>
									<p class="fs-24 heading-big pt-3">Select Committees</p>
									<small
										class="text-uppercase"
									>You are entitled to {{settings.no_of_free_committee}} free committee(s).</small>
									<br>
									<br>

									<div class="row">
										<div class="col-md-6 c-pb-10" v-for="(committee, i) in committees" :key="i">
											<label class="custom-control custom-control-lg custom-checkbox">
												<input
													:disabled=" (!settings.allow_extra_committee) ? ((!committee_array.includes(committee.id) && (committee_array.length >= settings.no_of_free_committee)) ? true : false ) : false"
													type="checkbox"
													v-model="committee_array"
													:key="committee.id"
													:value="committee.id"
													class="custom-control-input"
													name="checkbox-size"
												>
												<span class="c-make-gray custom-control-indicator"></span>
												<span class="custom-control-description c-desc">{{committee.committee_label}}</span>
											</label>
										</div>
									</div>
									<hr
										style="border-top-color: rgba(0, 0, 0, 0.27) !important; margin: 1rem auto !important;"
									>
									<div class="row w-100">
										<div class="d-flex w-100 justify-content-between">
											<button class="btn btn-secondary" type="button" @click.prevent="registerAction">Back</button>
											<button class="btn btn-success" type="submit">
												<span>Done</span>
											</button>
										</div>
									</div>
								</div>
							</div>
						</form>

						<!-- confirming registration -->
						<form @submit.prevent="signUp" v-if="confirmRegistrationDataToggler">
							<div class="row b-3 p-3">
								<div class="row">
									<div class="col-6">Name :</div>
									<div class="col-6 font-weight-bold text-right text-capitalize">
										{{member.title.title_label}}. {{member.first_name}} {{member.last_name}}
										<span
											v-if="member.senior_advocate_of_nigeria"
										>(SAN)</span>
									</div>
									<!-- <div class="col-6">Last Name :</div>
									<div class="col-6 font-weight-bold text-right text-capitalize">{{member.last_name}}</div>-->
									<div class="col-6">Phone Number :</div>
									<div class="col-6 font-weight-bold text-right">{{member.phone_no}}</div>
									<div class="col-3">Email :</div>
									<div
										class="col-9 font-weight-bold text-right"
										style="word-break: break-all;"
									>{{member.email}}</div>
									<div class="col-6">Gender :</div>
									<div class="col-6 font-weight-bold text-right text-uppercase">{{member.gender}}</div>
									<div class="col-6">Year Of Call :</div>
									<div class="col-6 font-weight-bold text-right">{{member.year_of_call}}</div>
									<div class="col-6">Are you a SAN? :</div>
									<div
										class="col-6 font-weight-bold text-right"
										v-if=" member.senior_advocate_of_nigeria == 1"
									>Yes</div>
									<div class="col-6 text-right font-weight-bold" v-else>No</div>
									<div class="col-6">SCN Number :</div>
									<div class="col-6 font-weight-bold text-right">{{member.supreme_court_number}}</div>
									<div class="col-6">NBA Branch :</div>
									<div class="col-6 font-weight-bold text-right">{{member.nba_branch_id.branch_label}}</div>
									<div class="col-6">Organization :</div>
									<div
										class="col-6 font-weight-bold text-right"
									>{{(create_firm.toggle) ? create_firm.firm_name : member.firm.firm_name}}</div>
									<div class="form-check col-11 mx-3">
										<input
											type="checkbox"
											v-model="member.is_data_confirmed"
											required
											class="form-check-input"
											id="confirmRegistrationcheckbox"
										>
										<label
											class="form-check-label pl-0"
											for="confirmRegistrationcheckbox"
										>Click to confirm that your data is correct</label>
									</div>
								</div>
							</div>
							<!-- <button type="submit" class="btn btn-success text-white">Register</button> -->
							<hr style="border-top-color: rgba(0, 0, 0, 0.27) !important; margin: 1rem auto !important;">
							<div class="row w-100">
								<div class="d-flex w-100 justify-content-between">
									<button class="btn btn-secondary" type="button" @click.prevent="registerAction">Back</button>
									<button class="btn btn-success" :disabled="(disableButton) ? true : false" type="submit">
										<span v-if="disableButton">Registering</span>
										<span v-else>Register</span>
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div class="col-md-4" v-if="settings.allow_payment_at_reg">
					<div class="c-card--squared mm-beside m-rmboxshadow">
						<ul class="nav nav-process nav-process-circle" v-if="!confirmRegistrationDataToggler">
							<li class="nav-item" :class="{ 'complete': tab.committee, 'processing': tab.register}">
								<span class="nav-title">Account</span>
								<a
									class="nav-link active"
									:class="{'active': tab.register}"
									@click.prevent="registerAction"
									aria-expanded="true"
								></a>
							</li>

							<li class="nav-item" :class="{ 'processing': tab.committee}">
								<span class="nav-title">Committee</span>
								<a class="nav-link" :class="{'active': tab.committee}" @click.prevent="committeeAction"></a>
							</li>

							<!-- <li class="nav-item">
                  <span class="nav-title">Set Password</span>
                  <a class="nav-link" data-toggle="tab" ></a>
							</li>-->
						</ul>
						<div class="container">
							<div class="side-nav">
								<h3 class="text-uppercase mk-bold" v-if="checkAmount>0">Membership Fees</h3>
								<div class="bill-calc" v-if="checkAmount>0">
									<h4 class="text-uppercase bill-caption">Amount to pay is:</h4>
									<span class="bill c-span">{{checkAmount | ToCurrency}}</span>
									
									<small
										class="text-uppercase"
										v-if="!(committee_array.length > settings.no_of_free_committee)"
									>You are entitled to {{settings.no_of_free_committee}} free committee(s).</small>
								</div>
								<div class="bill-breakdown" v-if="committee_array.length > settings.no_of_free_committee">
									<small
										class="text-uppercase"
									>You are entitled to {{settings.no_of_free_committee}} free committee(s).</small>
									<br>
									<span
										class="c-span"
									>You just selected {{committee_array.length - settings.no_of_free_committee}} additional committee(s) which will cost {{(committee_array.length - settings.no_of_free_committee) * settings.amount_for_extra_committee | ToCurrency}} extra.</span>
								</div>

								<h2 class="bill-categories text-upperCase mt-30">{{settings.code_prefix}} MEMBERS</h2>
								<ul class="prices-listing">
									<li v-for="(eachMember, i) in meta_data.currentYearDues" :key="i">
										{{eachMember.memberCategories.category_label}}:
										<span>{{eachMember.amount_due | ToCurrency}}</span>
									</li>
								</ul>
								<img class="mt-30" src="/static/img/cards.png">
								<!-- Start: Payment Notification -->
							</div>
							<!-- <p class="text-center text-muted fs-13 mt-20">
								Already have an account?
								<a class="text-primary fw-500" href="/login">Sign in</a>
							</p>-->
						</div>
					</div>
					<p class="text-center">
						<a href="http://www.crenettechlabs.com">
							<small
								class="font-weight-bold text-black"
								style="color: black; cursor: pointer;"
							>POWERED BY CRENET TECHLABS</small>
						</a>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from "vue";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
export default {
	data() {
		return {
			confirmRegistrationDataToggler: false,
			formattedNumber: "",
			create_firm: {
				toggle: false,
				firm_type: "",
				firm_name: ""
			},
			registration_response: {},
			checking_year: 0,
			dues_amount: 0,
			committee_array: [],
			tab: {
				register: true,
				committee: false
			},
			// errors: [],
			disableButton: false,
			max: 1,
			member: {
				is_data_confirmed: false,
				gender: "",
				title: "",
				first_name: "",
				last_name: "",
				email: "",
				// country_code_data: {},
				country_code_data: "",
				phone_no: "",
				username: "",
				senior_advocate_of_nigeria: "",
				year_of_call: "",
				nba_branch_id: "",
				supreme_court_number: "",
				firm: "",
				is_firm_paying: false
			},
			error: {
				trigger_wrong_year: false,
				gender: false,
				title: false,
				first_name: false,
				last_name: false,
				email: false,
				phone_no: false,
				username: false,
				senior_advocate_of_nigeria: false,
				year_of_call: false,
				supreme_court_number: false,
				firm: false,
				firm_type: false,
				firm_name: false
			}
		};
	},
	computed: {
		checkAmount() {
			// console.log(this.committee_array);
			if (this.settings.no_of_free_committee) {
				var new_amount = 0;
				if (this.committee_array.length > this.settings.no_of_free_committee) {
					var committeeDifference =
						this.committee_array.length - this.settings.no_of_free_committee;
					// console.log("heree is cd >> ", committeeDifference);
					new_amount =
						this.settings.amount_for_extra_committee * committeeDifference;
				}
				return this.dues_amount + new_amount;
			} else {
				return this.dues_amount;
			}
		},
		branch() {
			return this.$store.state.meta_data.branch;
		},
		// country_code_data: {
		// 	get() {
		// 		if (this.$store.state.meta_data.countryCode) {
		// 			return this.$store.state.meta_data.countryCode[0];
		// 		} else {
		// 			return {};
		// 		}
		// 	},
		// 	set(country_code_data) {
		// 		if (this.$store.state.meta_data.countryCode) {
		// 			this.$store.state.meta_data.countryCode[0] = country_code_data;
		// 		}
		// 	}

		// 	// if (this.$store.state.meta_data.countryCode) {
		// 	// 	return this.$store.state.meta_data.countryCode[0];
		// 	// } else {
		// 	// 	return {};
		// 	// }
		// },
		countryCode() {
			if (this.$store.state.meta_data.countryCode) {
				this.country_code_data = this.$store.state.meta_data.countryCode[0];
			}
			return this.$store.state.meta_data.countryCode;
		},
		committees() {
			return this.$store.state.meta_data.committees;
		},
		settings() {
			if (this.$store.state.meta_data.generalSettings) {
				return this.$store.state.meta_data.generalSettings[0];
			}
			return {};
		},
		meta_data() {
			return this.$store.state.meta_data;
		},
		title() {
			return this.$store.state.meta_data.title;
		},
		API() {
			return this.$store.state.API;
		}
	},
	components: {
		ClipLoader: ClipLoader
	},
	methods: {
		closeAddFirm() {
			this.create_firm.toggle = false;
			this.create_firm.firm_name = "";
			this.create_firm.firm_type = "";
		},
		openAddFirm() {
			this.create_firm.toggle = true;
			this.member.firm = "";
		},
		changeSan() {
			this.phoneMethod();
			// console.log("am here again >> ", this.member.senior_advocate_of_nigeria);
			this.error.senior_advocate_of_nigeria = false;
			if (this.member.senior_advocate_of_nigeria == 1) {
				if (this.meta_data.currentYearDues) {
					for (let i = 0; i < this.meta_data.currentYearDues.length; i++) {
						// console.log(i);
						// console.log("second >> ", this.meta_data.currentYearDues[i]);
						if (
							this.meta_data.currentYearDues[i].memberCategories.category_label
								.replace(" ", "_")
								.toLowerCase() == "san"
						) {
							this.dues_amount = this.meta_data.currentYearDues[i].amount_due;
							break;
						} else {
							this.yearOfCallCal();
						}
					}
				}
			} else {
				if (this.member.year_of_call) {
					this.yearOfCallCal();
				} else {
					this.dues_amount = 0;
				}
			}
		},
		elseYearOfCallCal(getDateDifference) {
			if (getDateDifference <= 7) {
				if (this.meta_data.currentYearDues) {
					// console.log(
					//   "am_here >> ",
					//   this.meta_data.currentYearDues.length,
					//   this.meta_data.currentYearDues
					// );
					for (let i = 0; i < this.meta_data.currentYearDues.length; i++) {
						if (
							this.meta_data.currentYearDues[i].memberCategories.category_label
								.replace(" ", "_")
								.toLowerCase() == "young_lawyer"
						) {
							// console.log("see me here");
							this.dues_amount = this.meta_data.currentYearDues[i].amount_due;
						}
					}
				}
			} else {
				if (this.meta_data.currentYearDues) {
					for (let i = 0; i < this.meta_data.currentYearDues.length; i++) {
						if (
							this.meta_data.currentYearDues[i].memberCategories.category_label
								.replace(" ", "_")
								.toLowerCase() == "senior_lawyer"
						) {
							this.dues_amount = this.meta_data.currentYearDues[i].amount_due;
						}
					}
				}
			}
		},
		yearOfCallCal() {
			this.error.trigger_wrong_year = false;
			this.error.year_of_call = false;
			if (this.member.year_of_call) {
				var currentYear = new Date().getFullYear();
				var getDateDifference = currentYear - Number(this.member.year_of_call);
				if (getDateDifference >= 0) {
					this.checking_year = getDateDifference;
					if (this.member.senior_advocate_of_nigeria == 1) {
						if (this.meta_data.currentYearDues) {
							for (let i = 0; i < this.meta_data.currentYearDues.length; i++) {
								if (
									this.meta_data.currentYearDues[
										i
									].memberCategories.category_label
										.replace(" ", "_")
										.toLowerCase() == "san"
								) {
									this.dues_amount = this.meta_data.currentYearDues[
										i
									].amount_due;
									break;
								} else {
									this.elseYearOfCallCal(getDateDifference);
								}
							}
						}
					} else {
						this.elseYearOfCallCal(getDateDifference);
						// if (getDateDifference <= 7) {
						// 	if (this.meta_data.currentYearDues) {
						// 		// console.log(
						// 		//   "am_here >> ",
						// 		//   this.meta_data.currentYearDues.length,
						// 		//   this.meta_data.currentYearDues
						// 		// );
						// 		for (
						// 			let i = 0;
						// 			i < this.meta_data.currentYearDues.length;
						// 			i++
						// 		) {
						// 			if (
						// 				this.meta_data.currentYearDues[
						// 					i
						// 				].memberCategories.category_label
						// 					.replace(" ", "_")
						// 					.toLowerCase() == "young_lawyer"
						// 			) {
						// 				// console.log("see me here");
						// 				this.dues_amount = this.meta_data.currentYearDues[
						// 					i
						// 				].amount_due;
						// 			}
						// 		}
						// 	}
						// } else {
						// 	if (this.meta_data.currentYearDues) {
						// 		for (
						// 			let i = 0;
						// 			i < this.meta_data.currentYearDues.length;
						// 			i++
						// 		) {
						// 			if (
						// 				this.meta_data.currentYearDues[
						// 					i
						// 				].memberCategories.category_label
						// 					.replace(" ", "_")
						// 					.toLowerCase() == "senior_lawyer"
						// 			) {
						// 				this.dues_amount = this.meta_data.currentYearDues[
						// 					i
						// 				].amount_due;
						// 			}
						// 		}
						// 	}
						// }
					}

					// var getting_array = [{m: 7, u: 2000}, {m: 15, u: 5000}, {m: 15+1, u: 10000}]
					// for (let i = 0; i < getting_array.length; i++) {
					//   if (this.checking_year <= getting_array[i].m && this.checking_year >= ((i == 0) ? 0 : getting_array[i - 1])) {
					//     this.dues_amount = getting_array[i].u
					//     break;
					//   }

					// }

					// console.log(this.checking_year);
				} else {
					this.error.trigger_wrong_year = true;
				}
			}
		},
		registerAction() {
			this.tab.register = true;
			this.tab.committee = false;
			this.confirmRegistrationDataToggler = false;
		},
		phoneMethod() {
			if (this.member.phone_no.substr(0, 1) == 0) {
				this.formattedNumber =
					this.country_code_data.dial_code +
					this.member.phone_no.substr(1, this.member.phone_no.length);
			} else {
				this.formattedNumber =
					this.country_code_data.dial_code + this.member.phone_no;
			}

			// console.log("fff >> ", this.formattedNumber);
		},
		confirmRegistration() {
			// console.log(this.member.title);
			// console.log(this.member.nba_branch_id.id);
			(this.error.gender = false),
				(this.error.title = false),
				(this.error.first_name = false),
				(this.error.last_name = false),
				(this.error.email = false),
				(this.error.phone_no = false),
				(this.error.username = false),
				(this.error.senior_advocate_of_nigeria = false),
				(this.error.year_of_call = false),
				(this.error.supreme_court_number = false);
			this.error.firm = false;
			this.error.firm_name = false;
			this.error.firm_type = false;

			if (
				this.member.senior_advocate_of_nigeria === "" ||
				!this.member.year_of_call ||
				!this.member.supreme_court_number ||
				!this.member.gender ||
				!this.member.phone_no ||
				!this.member.email ||
				!this.member.first_name ||
				!this.member.last_name ||
				!this.member.title ||
				(!this.member.firm &&
					(!this.create_firm.firm_type || !this.create_firm.firm_name)) ||
				this.error.trigger_wrong_year
			) {
				if (this.member.senior_advocate_of_nigeria === "") {
					this.error.senior_advocate_of_nigeria = true;
				}
				if (!this.member.year_of_call) {
					this.error.year_of_call = true;
				}
				if (!this.member.supreme_court_number) {
					this.error.supreme_court_number = true;
				}
				if (!this.member.gender) {
					this.error.gender = true;
				}
				if (!this.member.phone_no) {
					this.error.phone_no = true;
				}
				if (!this.member.email) {
					this.error.email = true;
				}
				if (!this.member.last_name) {
					this.error.last_name = true;
				}
				if (!this.member.first_name) {
					this.error.first_name = true;
				}
				if (!this.member.title) {
					this.error.title = true;
				}
				if (
					!this.member.firm &&
					(!this.member.firm_type || !this.member.firm_name)
				) {
					if (!this.member.firm && !this.create_firm.toggle) {
						this.error.firm = true;
					}
					if (!this.create_firm.firm_type && this.create_firm.toggle) {
						// console.log(" am here firm type >> ", this.create_firm.firm_type);
						this.error.firm_type = true;
					}
					if (!this.create_firm.firm_name && this.create_firm.toggle) {
						this.error.firm_name = true;
					}
				}
			} else {
				this.confirmRegistrationDataToggler = true;
				this.tab.register = false;
				this.tab.committee = false;
			}
		},
		committeeAction() {
			// console.log(this.member.title);
			// console.log(this.member.nba_branch_id.id);
			(this.error.gender = false),
				(this.error.title = false),
				(this.error.first_name = false),
				(this.error.last_name = false),
				(this.error.email = false),
				(this.error.phone_no = false),
				(this.error.username = false),
				(this.error.senior_advocate_of_nigeria = false),
				(this.error.year_of_call = false),
				(this.error.supreme_court_number = false);
			this.error.firm = false;
			this.error.firm_name = false;
			this.error.firm_type = false;

			if (
				this.member.senior_advocate_of_nigeria === "" ||
				!this.member.year_of_call ||
				!this.member.supreme_court_number ||
				!this.member.gender ||
				!this.member.phone_no ||
				!this.member.email ||
				!this.member.first_name ||
				!this.member.last_name ||
				!this.member.title ||
				(!this.member.firm &&
					(!this.create_firm.firm_type || !this.create_firm.firm_name)) ||
				this.error.trigger_wrong_year
			) {
				if (this.member.senior_advocate_of_nigeria === "") {
					this.error.senior_advocate_of_nigeria = true;
				}
				if (!this.member.year_of_call) {
					this.error.year_of_call = true;
				}
				if (!this.member.supreme_court_number) {
					this.error.supreme_court_number = true;
				}
				if (!this.member.gender) {
					this.error.gender = true;
				}
				if (!this.member.phone_no) {
					this.error.phone_no = true;
				}
				if (!this.member.email) {
					this.error.email = true;
				}
				if (!this.member.last_name) {
					this.error.last_name = true;
				}
				if (!this.member.first_name) {
					this.error.first_name = true;
				}
				if (!this.member.title) {
					this.error.title = true;
				}
				if (
					!this.member.firm &&
					(!this.member.firm_type || !this.member.firm_name)
				) {
					if (!this.member.firm && !this.create_firm.toggle) {
						this.error.firm = true;
					}
					if (!this.create_firm.firm_type && this.create_firm.toggle) {
						// console.log(" am here firm type >> ", this.create_firm.firm_type);
						this.error.firm_type = true;
					}
					if (!this.create_firm.firm_name && this.create_firm.toggle) {
						this.error.firm_name = true;
					}
				}
			} else {
				this.tab.register = false;
				this.tab.committee = true;
				this.confirmRegistrationDataToggler = false;
			}
		},
		signUp() {
			this.disableButton = true;
			// console.log(this.member.title);
			// console.log(this.member.nba_branch_id.id);
			(this.error.gender = false),
				(this.error.title = false),
				(this.error.first_name = false),
				(this.error.last_name = false),
				(this.error.email = false),
				(this.error.phone_no = false),
				(this.error.username = false),
				(this.error.senior_advocate_of_nigeria = false),
				(this.error.year_of_call = false),
				(this.error.supreme_court_number = false);
			this.error.firm = false;
			this.error.firm_name = false;
			this.error.firm_type = false;

			if (
				this.member.senior_advocate_of_nigeria === "" ||
				!this.member.year_of_call ||
				!this.member.supreme_court_number ||
				!this.member.gender ||
				!this.member.phone_no ||
				!this.member.email ||
				!this.member.first_name ||
				!this.member.last_name ||
				!this.member.title ||
				(!this.member.firm &&
					(!this.create_firm.firm_type || !this.create_firm.firm_name)) ||
				this.error.trigger_wrong_year
			) {
				if (this.member.senior_advocate_of_nigeria === "") {
					this.error.senior_advocate_of_nigeria = true;
				}
				if (!this.member.year_of_call) {
					this.error.year_of_call = true;
				}
				if (!this.member.supreme_court_number) {
					this.error.supreme_court_number = true;
				}
				if (!this.member.gender) {
					this.error.gender = true;
				}
				if (!this.member.phone_no) {
					this.error.phone_no = true;
				}
				if (!this.member.email) {
					this.error.email = true;
				}
				if (!this.member.last_name) {
					this.error.last_name = true;
				}
				if (!this.member.first_name) {
					this.error.first_name = true;
				}
				if (!this.member.title) {
					this.error.title = true;
				}
				if (
					!this.member.firm &&
					(!this.member.firm_type || !this.member.firm_name)
				) {
					if (!this.member.firm && !this.create_firm.toggle) {
						this.error.firm = true;
					}
					if (!this.create_firm.firm_type && this.create_firm.toggle) {
						// console.log(" am here firm type >> ", this.create_firm.firm_type);
						this.error.firm_type = true;
					}
					if (!this.create_firm.firm_name && this.create_firm.toggle) {
						this.error.firm_name = true;
					}
				}
				this.disableButton = false;
			} else {
				this.phoneMethod();
				this.max = 1;
				console.log("country code", this.formattedNumber);
				this.$http
					.post(`${this.API}register`, {
						first_name: this.member.first_name,
						last_name: this.member.last_name,
						email: this.member.email,
						title_id: this.member.title.id,
						gender: this.member.gender,
						is_san: this.member.senior_advocate_of_nigeria,
						scn_number: `SCN${this.member.supreme_court_number}`,
						year_of_call: this.member.year_of_call,
						nba_branch_id: this.member.nba_branch_id.id,
						phone_no: this.formattedNumber,
						firm_id: this.member.firm ? this.member.firm.id : 0,
						firm_name: this.create_firm.firm_name,
						firm_type_id: this.create_firm.firm_type,
						amount: this.checkAmount ? this.checkAmount : 0,
						is_firm_paying: this.member.is_firm_paying ? true : false,
						is_data_confirmed: this.member.is_data_confirmed
					})
					.then(response => {
						// console.log('am looking for you >. ',response);
						this.registration_response = response.body.result;
						if (this.committee_array.length > 0) {
							this.$http
								.post(
									`${this.API}select-committees/${
										response.body.result.confirmation_token
									}`,
									{
										committee_id: this.committee_array
									}
								)
								.then(committeeResponse => {
									// console.log("committee response >> ", committeeResponse);
									this.max = 1;
									this.validationNotification(
										"Successfully registered",
										"success"
									);
									const vm = this;
									setTimeout(() => {
										vm.disableButton = false;
										if (vm.settings.set_password_at_reg) {
											// console.log(vm.registration_response);
											vm.$router.push(
												`/register/create-password/${
													vm.registration_response.confirmation_token
												}`
											);
										} else if (vm.settings.allow_payment_at_reg) {
											// console.log("am here ");
											vm.$router.push(
												`/register/payment/${
													vm.registration_response.member_reg_code
												}`
											);
										} else {
											vm.$router.push("/feedback");
										}
									}, 1000);
								})
								.catch(error1 => {
									console.log(error1);
								});
						} else {
							this.max = 1;
							this.validationNotification("Successfully registered", "success");
							const vm = this;
							setTimeout(() => {
								vm.disableButton = false;
								if (vm.settings.set_password_at_reg) {
									// console.log(vm.registration_response);
									vm.$router.push(
										`/register/create-password/${
											vm.registration_response.confirmation_token
										}`
									);
								} else if (vm.settings.allow_payment_at_reg) {
									// console.log("am here ");
									vm.$router.push(`/register/payment`);
								} else {
									vm.$router.push("/feedback");
								}
							}, 1500);
						}
					})
					.catch(error => {
						console.log(error);
						this.disableButton = false;
						for (let i = 0; i < error.body.length; i++) {
							this.max = i + 1;
							this.validationNotification(error.body[i].message, "error");
						}
						this.registerAction();
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
				// console.log(response.body.data.currentYearDues);
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
.c-addon {
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	-webkit-box-pack: center;
	justify-content: center;
	background-color: #f9fafb;
	border: 1px solid #ebebeb;
	color: #929daf;
	cursor: pointer;
	font-weight: 300;
	border-radius: 2px;
	padding: 5px 12px;
	font-size: 14px;
	line-height: inherit;
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
.mm-beside {
	background-color: #ffffff;
	color: #282828;
	margin-left: -30px;
	z-index: 1000;
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

/* phone number select */
.input-group-btn select {
	border-color: #ccc;
	margin-top: 0px;
	margin-bottom: 0px;
	padding-top: 7px;
	padding-bottom: 7px;
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
