import Component from '@glimmer/component';
import { format } from 'date-fns';

export default class ContributionDetailsComponent extends Component {
  get currentContribution() {
    return this.args.contribution;
  }

  get statusOfContribution() {
    if (!this.args.contribution.isClosed) {
      return 'open';
    }
    return 'closed';
  }

  get deadlineFormat() {
    const contribution = this.currentContribution.deadline;
    return format(contribution, 'dd-MM-yyyy');
  }
}
