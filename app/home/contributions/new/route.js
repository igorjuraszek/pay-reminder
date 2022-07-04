import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class HomeContributionsNewRoute extends Route {
  @service store;

  model() {
    return this.store.createRecord('contribution');
  }
}
