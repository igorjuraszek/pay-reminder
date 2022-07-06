import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default class HomeUsersRoute extends Route {
  @service store;
  @service session;

  model() {
    return RSVP.hash({
      users: this.store.findAll('user'),
      contributions: this.myContributions(),
    });
  }

  async myContributions() {
    const contributions = await this.store.findAll('contribution');
    const currentUserId = this.session.currentUser.get('id');
    const filteredContributions = contributions.filter((contribution) => {
      const amIOwner = contribution.owner.get('id') === currentUserId;

      const contributors = contribution.contributors.map(({ contributor }) =>
        contributor.get('id')
      );

      const amIContributor = contributors.includes(currentUserId);

      return amIOwner || amIContributor;
    });
    return filteredContributions;
  }
}
