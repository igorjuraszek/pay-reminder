import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class HomeHistoryRoute extends Route {
  @service store;
  @service session;

  model() {
    return this.myContributions();
  }

  async myContributions() {
    const contributions = await this.store.findAll('contribution');
    const currentUserId = this.session.currentUser.get('id');
    const filteredContributions = contributions.filter((contribution) => {
      const isContributionActive = !contribution.isClosed;
      const amIOwner = contribution.owner.get('id') === currentUserId;

      const contributors = contribution.contributors.map(({ contributor }) =>
        contributor.get('id')
      );

      const amIContributor = contributors.includes(currentUserId);

      return (amIOwner || amIContributor) && !isContributionActive;
    });
    return filteredContributions;
  }
}
