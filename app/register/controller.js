import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class RegisterController extends Controller {
  @service store;
  @service router;

  @action
  onLoginChange(event) {
    this.model.username = event.target.value;
  }

  @action
  onEmailChange(event) {
    this.model.email = event.target.value;
  }

  @action
  onPasswordChange(event) {
    this.model.password = event.target.value;
  }

  @action
  async onSubmit(event) {
    event.preventDefault();
    await this.model.save();
    this.router.transitionTo('login');
  }
}
