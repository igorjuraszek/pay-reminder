export default function () {
  // These comments are here to help you get started. Feel free to delete them.
  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing
  this.get('/users');
  this.get('/users/:id');
  this.post('/users');
  this.put('/users/:id');

  this.get('/contributions');
  this.get('/contributions/:id');
  this.post('/contributions');
  this.put('/contributions/:id');

  this.get('/contributionUsers');
  this.get('/contributionUsers/:id');
  this.post('/contributionUsers');
  this.put('/contributionUsers/:id');
  /*
    Shorthand cheatsheet:

    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    https://www.ember-cli-mirage.com/docs/route-handlers/shorthands
  */
}
