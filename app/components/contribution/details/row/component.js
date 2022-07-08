import Component from '@glimmer/component';
import { isBefore } from 'date-fns';

export default class ContributionDetailsRowComponent extends Component {
  get currentContributor() {
    return this.args.contributionUser;
  }

  get currentContribution() {
    return this.args.contribution;
  }

  get isPaidByUser() {
    return this.currentContributor.isPaid;
  }

  get isDeadlineOverdue() {
    return !isBefore(this.currentTime, this.currentContribution.deadline);
  }

  get rowLabelClass() {
    if (this.isPaidByUser) {
      return 'table-success';
    }
    if (!this.isDeadlineOverdue) {
      return 'table-danger';
    }
    return 'table-warning';
  }

  get statusOfPayment() {
    if (this.isPaidByUser) {
      return 'Paid';
    }
    if (!this.isDeadlineOverdue) {
      return 'Debt';
    }
    return 'Waiting for payment';
  }
}
