import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { format } from 'date-fns';

export default class ContributionDetailsComponent extends Component {
  @service store;
  @service session;

  get currentContribution() {
    return this.args.contribution;
  }

  get statusOfContribution() {
    return !this.currentContribution.isClosed ? 'open' : 'closed';
  }

  get shouldBeContributionHidden() {
    const amIOwner = Boolean(
      this.currentContribution.owner.get('id') !==
        this.session.currentUser.get('id')
    );
    return amIOwner && this.currentContribution.isPrivate;
  }

  get myDebt() {
    return this.currentContribution.contributors.filter((contributionUser) => {
      return (
        contributionUser.contributor.get('id') ===
        this.session.currentUser.get('id')
      );
    }).firstObject;
  }

  get deadlineFormat() {
    const contribution = this.currentContribution.deadline;
    return format(contribution, 'dd-MM-yyyy');
  }
}
