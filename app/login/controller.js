import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LoginController extends Controller {
  @tracked loginValue;
  @tracked passwordValue;

  @action
  onLoginChange(event) {
    this.loginValue = event.target.value;
  }

  @action
  onPasswordChange(event) {
    this.passwordValue = event.target.value;
  }

  @action
  async onSubmit(event) {}
}
