import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class NewContributionContributorRowComponent extends Component {
  get currentContributor() {
    return this.args.contributionUser;
  }

  @action
  async onDeleteContributor() {
    await this.currentContributor.destroyRecord();
  }
}
