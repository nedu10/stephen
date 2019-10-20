<template>
<div class="modal modal-center fade" id="send-message" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h6 class="modal-title">Send A New Message to <span v-if="$store.state.messageMember">{{$store.state.messageMember}}</span></h6>
        <button type="button" class="close" data-dismiss="modal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form">
          <div class="form-group">
            <input class="form-control" type="text" placeholder="Subject">
          </div>
          <textarea class="form-control" rows="5" placeholder="Message" style="resize:none;"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <a href="confirm-sent-message.php" class="mt-20 btn btn-bold btn-success">Send</a>
      </div>
    </div>
  </div>
</div>
</template>
