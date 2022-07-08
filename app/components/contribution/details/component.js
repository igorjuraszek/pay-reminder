import Component from '@glimmer/component';
import { format } from 'date-fns';

export default class ContributionDetailsComponent extends Component {
  get currentContribution() {
    return this.args.contribution;
  }

  get statusOfContribution() {
    return !this.args.contribution.isClosed ? 'open' : 'closed';
  }

  get deadlineFormat() {
    const contribution = this.currentContribution.deadline;
    return format(contribution, 'dd-MM-yyyy');
  }
}
