import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class HomeContributionsRoute extends Route {
  @service store;

  model() {
    const contributionUser = this.store.findAll('contribution-user');
    return contributionUser;
  }
}
