import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { add, format } from 'date-fns';

module('Integration | Component | contribution/details', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    this.sessionService = this.owner.lookup('service:session');
    const store = this.owner.lookup('service:store');

    const contributionOwner = this.server.create('user');
    const firstContributor = this.server.create('user');
    const secondContributor = this.server.create('user');
    const thirdContributor = this.server.create('user');
    const fourthContributor = this.server.create('user');

    this.set(
      'sessionService.currentUser',
      await store.findRecord('user', contributionOwner.id)
    );

    const contribution = this.server.create('contribution', {
      ownerId: contributionOwner.id,
      title: 'Dzień nauczyciela',
      deadline: add(new Date(), { days: 3 }),
      goal: 100,
    });

    this.server.create('contribution-user', {
      contributorId: firstContributor.id,
      contributionId: contribution.id,
      amount: 25,
    });
    this.server.create('contribution-user', {
      contributorId: secondContributor.id,
      contributionId: contribution.id,
      amount: 25,
    });
    this.server.create('contribution-user', {
      contributorId: thirdContributor.id,
      contributionId: contribution.id,
      amount: 25,
    });
    this.server.create('contribution-user', {
      contributorId: fourthContributor.id,
      contributionId: contribution.id,
      amount: 25,
    });

    const contributionModel = await store.findRecord(
      'contribution',
      contribution.id
    );

    this.set('contribution', contributionModel);
    await render(
      hbs`<Contribution::Details @contribution={{this.contribution}} />`
    );
  });

  test('it renders', async function (assert) {
    const { contribution } = this;

    assert.dom(`[data-test-title]`).exists();
    assert.dom(`[data-test-owner]`).exists();
    assert.dom(`[data-test-deadline]`).exists();
    assert.dom(`[data-test-status]`).exists();
    assert.dom(`[data-test-goal]`).exists();

    contribution.contributors.map((contributionUser, index) => {
      assert.dom(`[data-test-row="${index}"]`).exists();
    });
  });

  test('correct values', async function (assert) {
    const { contribution } = this;

    assert.dom(`[data-test-title]`).includesText(contribution.title);
    assert
      .dom(`[data-test-owner]`)
      .includesText(contribution.owner.get('username'));
    assert
      .dom(`[data-test-deadline]`)
      .includesText(format(contribution.deadline, 'dd-MM-yyyy'));
    assert.dom(`[data-test-status]`).includesText('open');
    assert.dom(`[data-test-goal]`).includesText(`${contribution.goal} PLN`);

    contribution.contributors.map((contributionUser, index) => {
      assert
        .dom(`[data-test-row-username="${index}"]`)
        .hasText(contributionUser.contributor.get('username'));
      assert
        .dom(`[data-test-row-amount="${index}"]`)
        .hasText(`${contributionUser.amount} PLN`);
    });
  });
});
