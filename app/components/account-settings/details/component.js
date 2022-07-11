import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AccountSettingsDetailsComponent extends Component {
  @service store;
  @tracked editMode = false;

  get currentUser() {
    return this.args.currentUser;
  }

  get shouldBeButtonDisabled() {
    return !this.currentUser.hasDirtyAttributes;
  }

  get shouldBeLocked() {
    return !this.editMode;
  }

  get isFormFilledCorrectly() {
    const { name, surname, username, password, email } = this.currentUser;
    return Boolean(name && surname && username && password && email);
  }

  @action
  onPropertyChange(key, { target: { value } }) {
    this.currentUser[key] = value || null;
  }

  @action
  async onSubmit() {
    if (!this.isFormFilledCorrectly) {
      return;
    }
    await this.currentUser.save();
    this.editMode = !this.editMode;
  }

  @action
  discardChanges() {
    if (this.currentUser.hasDirtyAttributes) {
      this.currentUser.rollbackAttributes();
    }
    this.editMode = !this.editMode;
  }

  @action onChangeMode() {
    this.editMode = !this.editMode;
  }
}
