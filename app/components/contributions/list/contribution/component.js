import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { differenceInDays, isBefore } from 'date-fns';
import { inject as service } from '@ember/service';

export default class ContributionsListContributionComponent extends Component {
  @service store;
  @service session;

  @tracked myDebt;

  constructor() {
    super(...arguments);

    this.myDebtSetter();
  }

  get shouldBeContributionHidden() {
    const amIOwner = Boolean(
      this.args.contribution.owner.get('id') !==
        this.session.currentUser.get('id')
    );
    return amIOwner && this.args.contribution.isPrivate && this.myDebt;
  }

  async myDebtSetter() {
    const contributors = await this.currentContribution.get('contributors');
    this.myDebt = contributors.find(
      ({ contributor }) =>
        contributor.get('id') === this.session.currentUser.get('id')
    );
  }

  get currentContribution() {
    return this.args.contribution;
  }

  get statusOfContribution() {
    return !this.args.contribution.isClosed ? 'open' : 'closed';
  }

  get daysToGo() {
    const currentTime = new Date();
    if (isBefore(currentTime, this.currentContribution.deadline)) {
      const difference = differenceInDays(
        this.currentContribution.deadline,
        currentTime
      );
      return `${difference} day(s)`;
    }
    return 'overdue';
  }
}
