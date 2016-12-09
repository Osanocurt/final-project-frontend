angular.module('finalProject')
  .factory('Feedback', Feedback);

Feedback.$inject = ['$resource', 'API_URL'];
function Feedback($resource, API_URL) {
  return new $resource(`${API_URL}/feedbacks/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
