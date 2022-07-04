import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LoginRoute extends Route {
  @service router;
  @service session;

  beforeModel() {
    const { isUserLoggedIn } = this.session;

    if (isUserLoggedIn) {
      this.router.transitionTo('home');
      return;
    }
  }
}
