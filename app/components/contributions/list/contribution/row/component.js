import Component from '@glimmer/component';

export default class ContributionsListContributionRowComponent extends Component {
  get currentContributor() {
    return this.args.contributionUser;
  }

  get isPaidByUser() {
    return this.currentContributor.isPaid;
  }
}
