import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class HomeUserShowRoute extends Route {
  @service store;

  async model({ id }) {
    return await this.store.findRecord('user', id);
  }
}
