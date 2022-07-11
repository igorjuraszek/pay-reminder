import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class HomeAccountRoute extends Route {
  @service store;

  model() {
    const users = this.store.findAll('user');
    return users;
  }

  @action
  willTransition() {
    // eslint-disable-next-line ember/no-controller-access-in-routes
    const modelRecord = this.controller.get('currentUser');

    if (modelRecord.get('hasDirtyAttributes')) {
      modelRecord.rollbackAttributes();
    }
  }
}
