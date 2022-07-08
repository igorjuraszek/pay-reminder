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
    const modelRecord = this.controller.get('model');

    if (modelRecord.get('hasDirtyAttributes')) {
      debugger;
      modelRecord.destroyRecord();
    }
  }
}
