import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { add } from 'date-fns';

module(
  'Integration | Component | contributions/list/contribution',
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
        hbs`<Contributions::List::Contribution @contribution={{this.contribution}} />`
      );

      this.contribution.contributors.map((contributor, index) => {
        assert.dom(`[data-test-username-row="${index}"]`).exists();
        assert.dom(`[data-test-amount-row="${index}"]`).exists();
        assert.dom(`[data-test-status-row="${index}"]`).exists();
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
        hbs`<Contributions::List::Contribution @contribution={{this.contribution}} />`
      );

      this.contribution.contributors.map((contributor, index) => {
        assert
          .dom(`[data-test-username-row="${index}"]`)
          .hasText(contributor.contributor.get('username'));
        assert
          .dom(`[data-test-amount-row="${index}"]`)
          .hasText(`${contributor.amount} PLN`);
        assert
          .dom(`[data-test-status-row="${index}"]`)
          .hasText(`Waiting for payment`);
      });
    });

    test('private contribution', async function (assert) {
      this.sessionService = this.owner.lookup('service:session');
      const store = this.owner.lookup('service:store');

      const firstUser = this.server.create('user');
      const secondUser = this.server.create('user');
      const thirdUser = this.server.create('user');
      const fourthUser = this.server.create('user');

      const firstContribution = this.server.create('contribution', {
        ownerId: fourthUser.id,
        title: 'Dzień nauczyciela',
        deadline: add(new Date(), { days: 3 }),
        goal: 75,
        isPrivate: true,
      });

      this.server.create('contribution-user', {
        contributorId: firstUser.id,
        contributionId: firstContribution.id,
        amount: 25,
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

      this.set(
        'sessionService.currentUser',
        await store.findRecord('user', firstUser.id)
      );

      this.set(
        'contribution',
        await store.findRecord('contribution', firstContribution.id)
      );

      await render(
        hbs`<Contributions::List::Contribution @contribution={{this.contribution}} />`
      );

      assert.dom(`[data-test-username-row="0"]`).exists();
      assert.dom(`[data-test-amount-row="0"]`).exists();
      assert.dom(`[data-test-status-row="0"]`).exists();

      assert.dom(`[data-test-username-row="1"]`).doesNotExist();
      assert.dom(`[data-test-amount-row="1"]`).doesNotExist();
      assert.dom(`[data-test-status-row="1"]`).doesNotExist();
    });

    test('private contribution correct user', async function (assert) {
      this.sessionService = this.owner.lookup('service:session');
      const store = this.owner.lookup('service:store');

      const firstUser = this.server.create('user');
      const secondUser = this.server.create('user');
      const thirdUser = this.server.create('user');
      const fourthUser = this.server.create('user');

      const firstContribution = this.server.create('contribution', {
        ownerId: fourthUser.id,
        title: 'Dzień nauczyciela',
        deadline: add(new Date(), { days: 3 }),
        goal: 75,
        isPrivate: true,
      });

      this.server.create('contribution-user', {
        contributorId: firstUser.id,
        contributionId: firstContribution.id,
        amount: 25,
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

      this.set(
        'sessionService.currentUser',
        await store.findRecord('user', firstUser.id)
      );

      this.set(
        'contribution',
        await store.findRecord('contribution', firstContribution.id)
      );

      await render(
        hbs`<Contributions::List::Contribution @contribution={{this.contribution}} />`
      );

      assert
        .dom(`[data-test-username-row="0"]`)
        .hasText(`${this.sessionService.currentUser.get('username')}`);
    });
  }
);
