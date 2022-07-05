import EmberRouter from '@ember/routing/router';
import config from 'pay-reminder/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('home', { path: '/' }, function () {
    this.route('account');
    this.route('users');
    this.route('user', function () {
      this.route('show', { path: '/:id' });
    });
    this.route('dashboard');
    this.route('contributions', function () {
      this.route('show', { path: '/' });
      this.route('history');
    });
    this.route('contribution', function () {
      this.route('show', { path: '/:id' });
      this.route('new');
    });
  });
  this.route('login');
  this.route('register');
});
