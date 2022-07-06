import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class UsersListUserComponent extends Component {
  @tracked shouldBeContributionsShow = false;

  get contributionsToShow() {
    if (!this.args.contributions) {
      return [];
    }
    const filteredContributions = this.args.contributions.filter(
      (contribution) => {
        const isUserOwner =
          contribution.owner.get('id') === this.args.user.get('id');

        const contributors = contribution.contributors.map(({ contributor }) =>
          contributor.get('id')
        );

        const isUserContributor = contributors.includes(
          this.args.user.get('id')
        );

        return isUserOwner || isUserContributor;
      }
    );

    return filteredContributions;
  }

  @action onContributionsShow() {
    this.shouldBeContributionsShow = !this.shouldBeContributionsShow;
  }
}
