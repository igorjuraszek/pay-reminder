import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class HomeContributionShowRoute extends Route {
  @service store;

  async model(params) {
    const contribution = await this.store.findRecord('contribution', params.id);
    return contribution;
  }
}
