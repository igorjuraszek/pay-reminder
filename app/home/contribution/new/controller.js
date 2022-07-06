import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { sum } from 'lodash';

export default class HomeContributionNewController extends Controller {
  @service session;
  @service router;
  @service store;
  @tracked choosenUser = null;
  @tracked amount = null;

  get currentlyAddedContributors() {
    return this.model.contributors.map(({ contributor }) =>
      contributor.get('id')
    );
  }

  get usersToAdd() {
    return this.store.findAll('user');
  }

  get contributionOwner() {
    return this.session.currentUser;
  }
  get currentContribution() {
    return this.model;
  }

  get goalOfContribution() {
    const contributorsDebts = this.model.contributors.map(({ amount }) =>
      parseFloat(amount)
    );
    const goal = sum(contributorsDebts);
    return goal;
  }

  myMatcher(user, term) {
    return `${user.username.toLowerCase()} ${user.name.toLowerCase()} ${user.surname.toLowerCase()}`.indexOf(
      term.toLowerCase()
    );
  }

  @action chooseUser(user) {
    this.choosenUser = user;
  }

  @action onTitleChange({ target: { value } }) {
    this.model.title = value;
  }

  @action onAmountChange({ target: { value } }) {
    this.amount = value;
  }

  @action async onSubmit(event) {
    event.preventDefault();
    this.model.goal = this.goalOfContribution;
    if (this.model.title && this.model.contributors.length > 0) {
      await this.model.save();
      for (const contributor of this.model.contributors.toArray()) {
        await contributor.save();
      }
      this.router.transitionTo('home.contribution.show', this.model);
    }
  }

  @action onAddContributor() {
    let contributionUser = {
      contributor: this.choosenUser,
      contribution: this.model,
      amount: this.amount,
      isPaid: this.choosenUser.get('id') === this.contributionOwner.get('id'),
    };
    if (
      this.choosenUser &&
      this.amount &&
      !this.currentlyAddedContributors.includes(this.choosenUser.get('id'))
    ) {
      this.store.createRecord('contribution-user', contributionUser);
      this.choosenUser = null;
      this.amount = null;
    }
  }

  @action
  onChangePrivate({ target: { checked } }) {
    this.model.isPrivate = checked;
  }
}
