import Component from '@glimmer/component';
import { differenceInDays, isBefore } from 'date-fns';

export default class ContributionsListContributionComponent extends Component {
  get currentContribution() {
    return this.args.contribution;
  }

  get statusOfContribution() {
    if (!this.args.contribution.isClosed) {
      return 'open';
    }
    return 'closed';
  }

  get currentTime() {
    return new Date();
  }

  get daysToGo() {
    if (isBefore(this.currentTime, this.currentContribution.deadline)) {
      const difference = differenceInDays(
        this.currentContribution.deadline,
        this.currentTime
      );
      return `${difference} day(s)`;
    }
    return 'overdue';
  }
}
