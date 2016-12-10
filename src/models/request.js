angular.module('finalProject')
  .factory('Request', Request);

Request.$inject = ['$resource', 'API_URL'];
function Request($resource, API_URL) {
  return new $resource(`${API_URL}/requests/:id`, { id: '@id' }, {
    update: { method: 'PUT' },
    accept: { method: 'POST', url: `${API_URL}/requests/:id/accept` },
    decline: { method: 'POST', url: `${API_URL}/requests/:id/decline` }
  });
}
