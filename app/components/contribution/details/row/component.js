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

  get payment() {
    if (this.isPaidByUser) {
      return { class: 'table-success', label: 'Paid' };
    }
    if (!this.isDeadlineOverdue) {
      return { class: 'table-danger', label: 'Debt' };
    }
    return { class: 'table-warning', label: 'Waiting for payment' };
  }
}
