<template>
	<div
		class="modal modal-center fade"
		id="join-committee-alert"
		tabindex="-1"
		style="display: block; padding-right: 0px;"
	>
		<div class="modal-dialog modal-sm">
			<div class="modal-content">
				<div class="callout bl-3 border-danger bg-white" role="alert">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span>×</span>
					</button>
					<h5>0 free committees left! PAY to Join</h5>
					<div class="row">
						<div class="col-md-8">Amount For 1 Extra Committee:</div>
						<div class="col-md-4 fw-500">#10,000</div>
					</div>
				</div>
				<div class="modal-footer pt-0 justify-content-start">
					<a href="#">
						<button class="btn btn-danger">Pay Now</button>
						<!-- <button class="btn btn-success">Join</button> -->
					</a>
				</div>
			</div>
		</div>
	</div>
</template>
