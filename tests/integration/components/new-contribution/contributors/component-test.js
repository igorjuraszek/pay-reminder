import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { add } from 'date-fns';

module(
  'Integration | Component | new-contribution/contributors',
  function (hooks) {
    setupRenderingTest(hooks);
    setupMirage(hooks);

    test('it renders', async function (assert) {
      this.sessionService = this.owner.lookup('service:session');
      const store = this.owner.lookup('service:store');

      const firstUser = this.server.create('user');
      const secondUser = this.server.create('user');
      const thirdUser = this.server.create('user');
      const fourthUser = this.server.create('user');

      const firstContribution = this.server.create('contribution', {
        ownerId: firstUser.id,
        title: 'Dzień nauczyciela',
        deadline: add(new Date(), { days: 3 }),
        goal: 100,
      });

      this.server.create('contribution-user', {
        contributorId: secondUser.id,
        contributionId: firstContribution.id,
        amount: 25,
      });

      this.server.create('contribution-user', {
        contributorId: thirdUser.id,
        contributionId: firstContribution.id,
        amount: 25,
      });

      this.server.create('contribution-user', {
        contributorId: fourthUser.id,
        contributionId: firstContribution.id,
        amount: 25,
      });

      this.set(
        'sessionService.currentUser',
        await store.findRecord('user', firstUser.id)
      );

      this.set(
        'contribution',
        await store.findRecord('contribution', firstContribution.id)
      );

      await render(
        hbs`<NewContribution::Contributors @contribution={{this.contribution}} />`
      );

      this.contribution.contributors.map((contributor, index) => {
        assert.dom(`[data-test-row="${index}"]`).exists();
        assert.dom(`[data-test-username="${index}"]`).exists();
        assert.dom(`[data-test-amount="${index}"]`).exists();
        assert.dom(`[data-test-delete="${index}"]`).exists();
      });
    });

    test('correct values', async function (assert) {
      this.sessionService = this.owner.lookup('service:session');
      const store = this.owner.lookup('service:store');

      const firstUser = this.server.create('user');
      const secondUser = this.server.create('user');
      const thirdUser = this.server.create('user');
      const fourthUser = this.server.create('user');

      const firstContribution = this.server.create('contribution', {
        ownerId: firstUser.id,
        title: 'Dzień nauczyciela',
        deadline: add(new Date(), { days: 3 }),
        goal: 100,
      });

      this.server.create('contribution-user', {
        contributorId: secondUser.id,
        contributionId: firstContribution.id,
        amount: 25,
      });

      this.server.create('contribution-user', {
        contributorId: thirdUser.id,
        contributionId: firstContribution.id,
        amount: 25,
      });

      this.server.create('contribution-user', {
        contributorId: fourthUser.id,
        contributionId: firstContribution.id,
        amount: 25,
      });

      this.set(
        'sessionService.currentUser',
        await store.findRecord('user', firstUser.id)
      );

      this.set(
        'contribution',
        await store.findRecord('contribution', firstContribution.id)
      );

      await render(
        hbs`<NewContribution::Contributors @contribution={{this.contribution}} />`
      );

      this.contribution.contributors.map((contributor, index) => {
        assert
          .dom(`[data-test-username="${index}"]`)
          .hasText(contributor.contributor.get('username'));
        assert
          .dom(`[data-test-amount="${index}"]`)
          .hasText(`${contributor.amount} PLN`);
        assert.dom(`[data-test-delete="${index}"]`).hasText('Delete');
      });
    });
  }
);
