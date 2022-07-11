import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class HomeContributionNewRoute extends Route {
  @service store;

  model() {
    return this.store.createRecord('contribution');
  }

  @action
  willTransition() {
    // eslint-disable-next-line ember/no-controller-access-in-routes
    const modelRecord = this.controller.get('model');

    if (modelRecord.get('hasDirtyAttributes')) {
      modelRecord.destroyRecord();
    }
  }
}
