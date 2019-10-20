<template>
    
    <div class="modal modal-center fade" id="payment-page" tabindex="-1" style="display: block; padding-right: 17px;">
        <div class="modal-dialog payment-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">PAYMENT</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
            <div class="modal-body">
                <h6>
                    <span class="text-uppercase">Due Amount</span>
                    <span class="float-right">
                        <div class="btn btn-xs btn-round btn-success">N10,000
                        </div>
                    </span>
                </h6>
                <hr class="w-50px ml-0 bt-2 border-success hr-sm">
                <div class="header-bar pl-0 pr-0 flexbox mb-20">
                    <h6>Card Details</h6>
                    <div>
                        <img src="/static/assets/img/cards.jpg" alt="...">
                    </div>
                </div>
                <form>
                    <div class="form-group">
                        <label>Card Number</label>
                        <input type="text" class="form-control" >
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
                    <button type="button" class="btn btn-bold btn-pure bg-danger" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-bold btn-pure bg-success">Pay</button>
                </div>
            </div>
            </div>
        </div>
    </div>  

</template>
