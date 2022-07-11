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
    const { currentUser } = this;
    const isRequiredInputsFilled = Boolean(
      currentUser.name &&
        currentUser.surname &&
        currentUser.username &&
        currentUser.password &&
        currentUser.email
    );
    return isRequiredInputsFilled;
  }

  @action
  onChangeName({ target: { value } }) {
    this.currentUser.name = value;
  }

  @action
  onChangeSurname({ target: { value } }) {
    this.currentUser.surname = value;
  }

  @action
  onChangeUsername({ target: { value } }) {
    this.currentUser.username = value;
  }

  @action
  onChangePassword({ target: { value } }) {
    this.currentUser.password = value;
  }

  @action
  onChangeEmail({ target: { value } }) {
    if (value === '') {
      this.currentUser.email = null;
    } else {
      this.currentUser.email = value;
    }
  }

  @action
  onChangeBankAccount({ target: { value } }) {
    if (value === '') {
      this.currentUser.bankAccountNumber = null;
    } else {
      this.currentUser.bankAccountNumber = value;
    }
  }

  @action
  onChangePhoneNumber({ target: { value } }) {
    if (value === '') {
      this.currentUser.blikNumber = null;
    } else {
      this.currentUser.blikNumber = value;
    }
  }

  @action
  onChangeRevolut({ target: { value } }) {
    if (value === '') {
      this.currentUser.revolutUsername = null;
    } else {
      this.currentUser.revolutUsername = value;
    }
  }

  @action
  onChangePayPal({ target: { value } }) {
    if (value === '') {
      this.currentUser.paypalUsername = null;
    } else {
      this.currentUser.paypalUsername = value;
    }
  }

  @action
  async onSubmit() {
    if (this.isFormFilledCorrectly) {
      await this.currentUser.save();
      this.editMode = !this.editMode;
    }
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
