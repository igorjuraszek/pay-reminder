import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ContributionDetailsRowActionsComponent extends Component {
  @service store;

  async updateStatusOfContribution() {
    const { contribution } = this.args;
    const unpaidDebts = contribution.contributors.filter((debt) => {
      return !debt.isPaid;
    }).length;
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
