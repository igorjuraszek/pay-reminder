import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class HomeContributionsNewController extends Controller {
  @service store;

  get allUsers() {
    return this.store.findAll('user');
  }
}
