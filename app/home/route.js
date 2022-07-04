import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class HomeRoute extends Route {
  @service router;
  @service session;

  async beforeModel() {
    const { isUserLoggedIn } = this.session;

    if (!isUserLoggedIn) {
      this.router.transitionTo('login');
      return;
    }
    await this.session.setCurrentUser();
  }
}
