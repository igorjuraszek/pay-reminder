import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default class HomeDashboardRoute extends Route {
  @service store;
  @service session;

  model() {
    return RSVP.hash({
      contributionsIOwn: this.contributionsIOwn(),
      contributionsIBelongTo: this.contributionsIBelongTo(),
    });
  }

  async contributionsIOwn() {
    const contributions = await this.store.findAll('contribution');
    const currentUserId = this.session.currentUser.get('id');
    const filteredContributions = contributions.filter((contribution) => {
      const amIOwner = contribution.owner.get('id') === currentUserId;

      return amIOwner;
    });
    return filteredContributions;
  }

  async contributionsIBelongTo() {
    const contributions = await this.store.findAll('contribution');
    const currentUserId = this.session.currentUser.get('id');
    const filteredContributions = contributions.filter((contribution) => {
      const amIOwner = contribution.owner.get('id') === currentUserId;

      const contributors = contribution.contributors.map(({ contributor }) =>
        contributor.get('id')
      );

      const amIContributor = contributors.includes(currentUserId);

      return amIContributor && !amIOwner;
    });
    return filteredContributions;
  }
}
