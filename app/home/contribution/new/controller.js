import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HomeContributionNewController extends Controller {
  @service session;
  @service store;
  @tracked choosenUser = null;
  @tracked amount = null;

  get allUsers() {
    return this.store.findAll('user');
  }

  get contributionOwner() {
    return this.session.currentUser;
  }
  get currentContribution() {
    return this.model;
  }

  get goalOfContribution() {
    const contributorsDebts = this.model.contributors.map((contributor) => {
      return contributor.amount;
    });
    return contributorsDebts;
  }

  myMatcher(user, term) {
    return `${user.username.toLowerCase()} ${user.name.toLowerCase()} ${user.surname.toLowerCase()}`.indexOf(
      term.toLowerCase()
    );
  }

  @action chooseUser(user) {
    this.choosenUser = user;
    console.log(this.choosenUser.username);
    console.log(this.contributionOwner.username);
  }

  @action onTitleChange({ target: { value } }) {
    this.model.title = value;
  }

  @action onAmountChange({ target: { value } }) {
    this.amount = value;
  }

  @action onDelete() {}

  @action onSubmit() {}

  @action onAddContributor() {
    let contributionUser = {
      contributor: this.choosenUser,
      contribution: this.model,
      amount: this.amount,
      isPaid: false,
    };
    this.store.createRecord('contribution-user', contributionUser);
    console.log(this.goalOfContribution);
  }
}
