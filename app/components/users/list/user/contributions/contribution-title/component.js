import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class UsersListUserContributionsContributionTitleComponent extends Component {
  @service router;

  @action redirect() {
    this.router.transitionTo('home.contribution.show', this.args.contribution);
  }
}
