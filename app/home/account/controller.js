import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class HomeAccountController extends Controller {
  @service session;

  get currentUser() {
    return this.session.currentUser;
  }
}
