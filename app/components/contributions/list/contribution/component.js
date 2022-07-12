import Component from '@glimmer/component';
import { differenceInDays, isBefore } from 'date-fns';
import { inject as service } from '@ember/service';

export default class ContributionsListContributionComponent extends Component {
  @service store;
  @service session;

  get shouldBeContributionHidden() {
    const amIOwner = Boolean(
      this.args.contribution.owner.get('id') !==
        this.session.currentUser.get('id')
    );
    return amIOwner && this.args.contribution.isPrivate;
  }

  get myDebt() {
    return this.args.contribution.contributors.filter((contributionUser) => {
      return (
        contributionUser.contributor.get('id') ===
        this.session.currentUser.get('id')
      );
    }).firstObject;
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
