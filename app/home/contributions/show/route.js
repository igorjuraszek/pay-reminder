import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class HomeContributionsShowRoute extends Route {
  @service store;

  model() {
    const contributions = this.store.findAll('contribution');
    return contributions;
  }
}
