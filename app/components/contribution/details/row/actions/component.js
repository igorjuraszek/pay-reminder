import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ContributionDetailsRowActionsComponent extends Component {
  @service store;

  get mailHref() {
    const {
      contribution: { title },
      receiver,
      deadline,
      debt: { amount },
      owner,
    } = this.args;
    const subject = `Overdue payment in contribution ${title}`;
    const body = `Hello ${receiver.get(
      'username'
    )}. There's an overdue payment (till ${deadline}) for amount ${amount} PLN to user ${owner}. Please pay ASAP!!!`;

    return encodeURI(
      `mailto:${receiver.get('email')}?subject=${subject}&body=${body}`
    );
  }

  async updateStatusOfContribution() {
    const { contribution } = this.args;
    const unpaidDebts = contribution.contributors.filter(
      ({ isPaid }) => !isPaid
    ).length;
    if (!unpaidDebts) {
      contribution.isClosed = true;
      await contribution.save();
    }
  }

  @action
  async setDebtPaid() {
    const { debt } = this.args;
    debt.isPaid = true;
    await debt.save();
    this.updateStatusOfContribution();
  }
}
