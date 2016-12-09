angular.module('finalProject')
  .controller('FeedbacksIndexController', FeedbacksIndexController)
  .controller('FeedbacksShowController', FeedbacksShowController)
  .controller('FeedbacksEditController', FeedbacksEditController);


FeedbacksIndexController.$inject = ['Feedback'];
function FeedbacksIndexController(Feedback) {
  const feedbacksIndex = this;

  feedbacksIndex.all = Feedback.query();
}

FeedbacksShowController.$inject = ['Feedback', '$state', '$auth'];
function FeedbacksShowController(Feedback, $state, $auth) {
  const feedbacksShow = this;
  feedbacksShow.feedback = Feedback.get($state.params);

  function deleteFeedback() {
    feedbacksShow.feedback.$remove(() => {
      $state.go('feedbacksIndex');
    });
  }
  feedbacksShow.delete = deleteFeedback;
  feedbacksShow.isLoggedIn = $auth.isAuthenticated;

  function isCurrentFeedback() {
    return $auth.getPayload().id === parseFloat($state.params.id);
  }

  feedbacksShow.isCurrentFeedback = isCurrentFeedback;
}

FeedbacksEditController.$inject = ['Feedback', '$state'];
function FeedbacksEditController(Feedback, $state) {
  const feedbacksEdit = this;
  feedbacksEdit.feedback = Feedback.get($state.params);

  function update() {
    feedbacksEdit.feedback.$update(() => {
      $state.go('feedbacksShow', $state.params);
    });
  }
  this.update = update;
}
