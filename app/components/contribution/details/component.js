import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { format } from 'date-fns';

export default class ContributionDetailsComponent extends Component {
  @service store;
  @service session;

  @tracked myDebt;

  constructor() {
    super(...arguments);

    this.myDebtSetter();
  }

  get currentContribution() {
    return this.args.contribution;
  }

  get statusOfContribution() {
    return !this.currentContribution.isClosed ? 'open' : 'closed';
  }

  get shouldBeContributionHidden() {
    const amIOwner = Boolean(
      this.currentContribution.owner.get('id') !==
        this.session.currentUser.get('id')
    );
    return amIOwner && this.currentContribution.isPrivate;
  }

  async myDebtSetter() {
    const contributors = await this.currentContribution.get('contributors');
    this.myDebt = contributors.find(
      ({ contributor }) =>
        contributor.get('id') === this.session.currentUser.get('id')
    );
  }

  get deadlineFormat() {
    const contribution = this.currentContribution.deadline;
    return format(contribution, 'dd-MM-yyyy');
  }
}
