<template>
  <div>
    <div class="noise"></div>
    <notifications group="error" position="top right" :max="max"/>
    <clip-loader
      style="margin-top: 40vh !important;"
      :loading="!user.first_name"
      :color="'green'"
      :size="'80px'"
    ></clip-loader>
    <div class="pace pace-inactive">
      <div class="pace-progress" data-progress-text="100%" data-progress="99" style="width: 100%;">
        <div class="pace-progress-inner"></div>
      </div>
      <div class="pace-activity"></div>
    </div>
    <div class="container pt-20">
      <div class="row">
        <div class="col-md-6 mx-auto" v-if="false">
          <div
            class="c-card--squared c-background m-rmboxshadow px-50 py-30 w-800px mb-0"
            style="max-width: 100%; z-index:2000;"
          >
            <div>
              <img
                src="\static\img\nbasbl-reg-form-logo.jpg"
                class="img-responsive logo-size"
                alt="NBA-SBL logo"
              >
            </div>
            <h4 class="pt-15 text-capitalize heading-big">{{settings.registration_title}}</h4>
            <p class="heading-sub">{{settings.registration_sub_header}}</p>
            <div class="row">
              <div class="col-12">
                <div class="header-bar pl-0 pr-0 flexbox mb-20">
                  <h6>Card Details</h6>
                  <div>
                    <img src="/static/assets/img/cards.jpg" alt="...">
                  </div>
                </div>
                <form>
                  <div class="form-group">
                    <label>Card Number</label>
                    <input type="text" class="form-control">
                  </div>
                  <div class="form-group">
                    <label>Name on card</label>
                    <input class="form-control" type="text" placeholder="John Doe">
                  </div>
                  <div class="row">
                    <div class="form-group col-lg-6">
                      <label>CVV</label>
                      <input type="text" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                      <label>Expiry Date</label>
                      <input type="text" class="form-control">
                    </div>
                  </div>
                </form>
                <div class="modal-footer">
                  <button type="button" class="btn btn-bold btn-pure bg-danger">Cancel</button>
                  <button
                    type="button"
                    @click="$router.push('/feedback')"
                    class="btn btn-bold btn-pure bg-success"
                  >Pay</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 mx-auto" v-if="user.first_name">
          <div
            class="c-card--squared m-beside m-rmboxshadow ml-0"
            :class="{'mb-0': (user.is_firm_paying == 1)}"
            style="z-index: 2000;"
          >
            <div class="container">
              <div class="side-nav">
                <h3 class="text-uppercase mk-bold">Payment</h3>
                <p
                  class="d-block mt-10 text-capitalize payment-name-size"
                  style="font-size: 16px;margin-bottom: 0px;"
                >{{this.user.first_name}} {{this.user.last_name}}</p>
                <p>
                  <span class="font-weight-bold">Membership ID - {{user.member_reg_code}}</span>
                </p>
                <div class="row">
                  <div class="col-md-12">
                    <table class="table table-bordered" style="border: 3px solid #e2e3e4;">
                      <thead>
                        <tr>
                          <th class="bill-caption">Description</th>
                          <th class="bill-caption">Quantity</th>
                          <th class="bill-caption">Amount (₦)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Membership Dues</td>
                          <td>1 year</td>
                          <td>{{dues_amount | ToCurrency}}</td>
                        </tr>
                        <tr>
                          <td>Extra Committee</td>
                          <td
                            v-if="settings.no_of_free_committee && (committee_array.length > settings.no_of_free_committee)"
                          >{{committee_array.length - settings.no_of_free_committee}}</td>
                          <td v-else>0</td>
                          <td>{{ammoutForCommittees | ToCurrency}}</td>
                        </tr>
                        <tr>
                          <td class="bill-caption" colspan="2">Total</td>
                          <td
                            class="bill-caption"
                          >{{dues_amount + ammoutForCommittees | ToCurrency}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col-md-12">
                    <div class="row m-0 w-100">
                      <h3
                        class="w-100 text-left pl-3 bill-caption"
                        v-if="user.committees.length > 0"
                      >Your selected committees are:</h3>
                      <!-- <div class="col-md-6 my-1 c-pb-10" v-for="(committee, i) in user.committees" :key="i"> -->
                      <!-- <div class="col-md-6 c-pb-10"> -->
                      <!-- <label class="custom-control custom-control-lg custom-checkbox"> -->
                      <!-- :disabled=" (!settings.allow_extra_committee) ? ((!committee_array.includes(committee.id) && (committee_array.length >= settings.no_of_free_committee)) ? true : false ) : false" -->
                      <!-- <input
														disabled
														type="checkbox"
														v-model="committee_array"
														:key="committee.id"
														:value="committee.id"
														class="custom-control-input"
														name="checkbox-size"
														@change="showCommitteeArray"
													>
													<span class="c-make-gray custom-control-indicator"></span>
													<span
														class="custom-control-description font-weight-bold text-capitalize c-desc"
                      >{{committee.committee_label}}</span>-->
                      <!-- <span class="custom-control-description c-desc">these are your committee</span> -->
                      <!-- </label> -->
                      <!-- <div>
												{{committee.committee_label}}
                      </div>-->
                      <!-- </div> -->
                      <!-- committee listing -->
                      <div class="w-100" v-for="(committee, i) in user.committees" :key="i">
                        <div class>
                          <!-- <h5 class="card-title">
														<strong>Notifications</strong>
                          </h5>-->
                          <div class="media-list media-list-hover media-list-divided">
                            <a class="py-0 media media-single" href="#">
                              <span class>
                                <i class="fa fa-dot-circle-o"></i>
                              </span>
                              <span class="title">{{committee.committee_label}}.</span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div v-if="user.due_payment_year == this.currentDate" class="w-50 paid-icon">
                        <img class="mt-30 w-100 p-3" src="/static/img/paid-icon.png">
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="row mt-4"
                  v-if="((user.due_payment_year == 0) && (user.is_firm_paying == 0))"
                >
                  <h3
                    class="w-100 text-center bill-caption"
                  >Complete registration by making payment now</h3>
                  <div class="col-8 mx-auto">
                    <button
                      @click="makePayment()"
                      class="btn btn-success btn-lg btn-block"
                      :disabled="paymentDisable"
                    >Make Payment</button>
                  </div>
                </div>

                <img
                  class="mt-30 p-3"
                  v-if="((user.due_payment_year == 0) && (user.is_firm_paying == 0))"
                  src="/static/img/cards.png"
                >

                <!-- Start: Payment Notification -->
              </div>
            </div>
          </div>
          <!-- if firm is making payment -->
          <div
            class="px-0 mb-3 pt-3 text-white"
            style="background-color : #091077;"
            v-if="user.is_firm_paying == 1"
          >
            <div class="col-md-12 pl-3 pb-3">
              <div class="col-md-12 pl-3 pb-3">
                <p
                  class="mb-8"
                >You will need to provide your Organization with the following information so that the payment made can be attributed to your Section Membership Account</p>
                <h3 class="w-100 bill-caption text-white">Information</h3>
                <div class="w-100 text-white">
                  <p class="text-capitalize mb-1">
                    <span class="font-weight-bold">Name - {{user.first_name}} {{user.last_name}}</span>
                    <br>
                    <span class="font-weight-bold">Membership ID - {{user.member_reg_code}}</span>
                  </p>
                </div>

                <h3 class="w-100 pt-4 bill-caption text-white">Bank Details</h3>
                <div class="mb-0 pb-0 text-white">
                  <p
                    class="font-weight-bold"
                    style="white-space: pre-line;"
                    v-html="settings.bank_details"
                  ></p>
                  <!-- <span class="font-weight-bold">Account Number - 0946111827</span> -->
                </div>
              </div>

              <!-- <h3
								class="w-100 bill-caption text-center text-white"
							>Complete registration by sending payment information to your organisation</h3>
							<div class="w-100 text-white">
								<p class="text-center text-capitalize mb-1">
									Your member registration code is
									<span class="font-weight-bold">{{user.member_reg_code}}</span>
								</p>
								<p class="mb-0 pb-0 text-center">
									<small class="text-center text-white">
										<i>--------- {{settings.bank_details}} ----------</i>
									</small>
								</p>
              </div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
export default {
  data() {
    return {
      currentDate: new Date().getFullYear(),
      max: 1,
      user: {},
      committee_array: [],
      backUpCommitteeArray: [],
      paymentDisable: false
    };
  },
  components: {
    ClipLoader: ClipLoader
  },
  computed: {
    settings() {
      if (this.$store.state.meta_data.generalSettings) {
        return this.$store.state.meta_data.generalSettings[0];
      }
      return {};
    },
    dues_amount() {
      if (this.user.amount && this.settings != {}) {
        if (
          this.backUpCommitteeArray.length > this.settings.no_of_free_committee
        ) {
          // console.log("hgdk");
          return (
            this.user.amount -
            (Number(this.backUpCommitteeArray.length) -
              this.settings.no_of_free_committee) *
              this.settings.amount_for_extra_committee
          );
        } else {
          // console.log("hgdk");
          return this.user.amount;
        }
      } else {
        return 0;
      }
    },
    ammoutForCommittees() {
      if (
        this.settings != {} &&
        this.committee_array.length > this.settings.no_of_free_committee
      ) {
        return (
          this.settings.amount_for_extra_committee *
          (Number(this.committee_array.length) -
            this.settings.no_of_free_committee)
        );
      } else {
        return 0;
      }
    },
    committees() {
      return this.$store.state.meta_data.committees;
    },
    API() {
      return this.$store.state.API;
    }
  },
  methods: {
    showCommitteeArray() {
      // console.log(this.committee_array);
    },
    populateCommittee() {
      //populate committee.array in the data methods
      this.user.committees.forEach(element => {
        this.committee_array.push(element.id);
      });
      this.backUpCommitteeArray = this.committee_array;
    },
    makePayment() {
      this.paymentDisable = true;
      // initialize payment
      // console.log("áction startes");
      this.$http
        .post(`${this.API}payment/pay-dues`, {
          email: this.user.email,
          amount: (this.dues_amount + this.ammoutForCommittees) * 100,
          includeCommitee:
            this.committee_array.length > this.settings.no_of_free_committee
              ? true
              : false
        })
        .then(response => {
          // console.log("latttesttttt  >> ", response);
          window.location = response.body.authorization_url; //open url on the same page
          // window.open(response.body.authorization_url, "_blank"); // opns url on a new tab
        })
        .catch(error => {
          this.paymentDisable = false;
          // console.log(error);
        });
    },
    fetchUser() {
      // fetching users via membership code
      this.$http
        .get(`${this.API}users/${this.$route.params.user_id}`)
        .then(response => {
          // console.log(response.body.result);
          this.user = response.body.result;

          this.populateCommittee();
        })
        .catch(error => {
          console.log(error);
          this.$router.push({ name: "FourOhFour" });
        });
    }
  },
  mounted() {
    this.$http
      .get(`${this.API}meta-data`)
      .then(response => {
        // console.log("showing  meta data >> ", response.body.data);
        this.$store.state.meta_data = response.body.data;
      })
      .catch(error => {
        console.log(error);
      });

    this.fetchUser();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (localStorage.getItem("reloaded")) {
        localStorage.removeItem("reloaded");
      } else {
        localStorage.setItem("reloaded", "1");
        location.reload(true);
      }
    });
  }
};
</script>
<style scoped>
.paid-icon {
  position: absolute;
  bottom: 5%;
  left: 45%;
}
.payment-name-size {
  font-size: 22px !important;
  /* margin-bottom: 12px !important; */
}
</style>

<style >
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

.mk-bold {
  color: #465161;
  display: inline-block;
  justify-content: center;
  text-align: center;
  font-size: 28px;
  padding-left: 10px;
  border-left: 5px solid;
}
.bill-caption {
  font-size: 15px;
  font-weight: 500;
}
.bill {
  padding: 40px 20px;
  background-color: #dedede;
  color: #2b2b2b;
  font-size: 50px;
  font-weight: 600;
  border: 2px solid #d6d6d6;
}
.c-span {
  display: block;
}
</style>
