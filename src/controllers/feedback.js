angular.module('finalProject')
  .controller('FeedbacksIndexController', FeedbacksIndexController)
  .controller('FeedbacksNewController', FeedbacksNewController)
  .controller('FeedbacksShowController', FeedbacksShowController);


FeedbacksNewController.$inject = ['Feedback', '$state', '$auth'];
function FeedbacksNewController(Feedback, $state, $auth) {
  const feedbacksNew = this;
  feedbacksNew.feedback = {};

  function createFeedback() {
    console.log('Going to try to save: ', feedbacksNew.feedback);
    Feedback.save(feedbacksNew.feedback);
    $state.go('feedbacksIndex');

  }
  feedbacksNew.createFeedback = createFeedback;
  feedbacksNew.isLoggedIn = $auth.isAuthenticated;
}

FeedbacksIndexController.$inject = ['Feedback'];
function FeedbacksIndexController(Feedback) {
  const feedbacksIndex = this;

  feedbacksIndex.all = Feedback.query();
}

FeedbacksShowController.$inject = ['Feedback', '$state', '$auth'];
function FeedbacksShowController(Feedback, $state, $auth) {
  const feedbacksShow = this;
  feedbacksShow.feedback = Feedback.get($state.params);


  feedbacksShow.isLoggedIn = $auth.isAuthenticated;

  function isCurrentFeedback() {
    return $auth.getPayload().id === parseFloat($state.params.id);
  }

  feedbacksShow.isCurrentFeedback = isCurrentFeedback;
}
