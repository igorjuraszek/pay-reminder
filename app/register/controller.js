import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class RegisterController extends Controller {
  @service store;
  @service router;

  @action
  onLoginChange({ target: { value } }) {
    this.model.username = value;
  }

  @action
  onEmailChange({ target: { value } }) {
    this.model.email = value;
  }

  @action
  onPasswordChange({ target: { value } }) {
    this.model.password = value;
  }

  @action
  async onSubmit(event) {
    event.preventDefault();
    await this.model.save();
    this.router.transitionTo('login');
  }
}
