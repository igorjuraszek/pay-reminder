import Component from '@glimmer/component';
import { differenceInDays, isBefore } from 'date-fns';

export default class ContributionsListContributionComponent extends Component {
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
