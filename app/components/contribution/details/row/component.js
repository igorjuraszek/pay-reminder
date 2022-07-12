import Component from '@glimmer/component';
import { isBefore } from 'date-fns';
import { inject as service } from '@ember/service';

export default class ContributionDetailsRowComponent extends Component {
  @service session;

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
    return !isBefore(new Date(), this.currentContribution.deadline);
  }

  get amIOwner() {
    return (
      this.currentContribution.owner.get('id') ===
      this.session.currentUser.get('id')
    );
  }

  get payment() {
    if (this.isPaidByUser) {
      return { class: 'table-success', label: 'Paid' };
    }
    if (this.isDeadlineOverdue) {
      return { class: 'table-danger', label: 'Debt' };
    }
    return { class: 'table-warning', label: 'Waiting for payment' };
  }
}
