export default function () {
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
}
