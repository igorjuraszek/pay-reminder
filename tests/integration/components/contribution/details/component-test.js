import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
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

    const contributionOwnerModel = await store.findRecord(
      'user',
      contributionOwner.id
    );
    const firstContributorModel = await store.findRecord(
      'user',
      firstContributor.id
    );
    const secondContributorModel = await store.findRecord(
      'user',
      secondContributor.id
    );
    const thirdContributorModel = await store.findRecord(
      'user',
      thirdContributor.id
    );
    const fourthContributorModel = await store.findRecord(
      'user',
      fourthContributor.id
    );

    this.set('sessionService.currentUser', contributionOwnerModel);

    const contribution = this.server.create('contribution', {
      owner: contributionOwnerModel.id,
      title: 'Dzień nauczyciela',
      deadline: add(new Date(), { days: 3 }),
      goal: 100,
    });
    const contributionModel = await store.findRecord(
      'contribution',
      contribution.id
    );

    const firstContributorsDebt = this.server.create('contribution-user', {
      contributor: firstContributorModel.id,
      contribution: contributionModel.id,
      amount: 25,
    });
    const secondContributorsDebt = this.server.create('contribution-user', {
      contributor: secondContributorModel.id,
      contribution: contributionModel.id,
      amount: 25,
    });
    const thirdContributorsDebt = this.server.create('contribution-user', {
      contributor: thirdContributorModel.id,
      contribution: contributionModel.id,
      amount: 25,
    });
    const fourthContributorsDebt = this.server.create('contribution-user', {
      contributor: fourthContributorModel.id,
      contribution: contributionModel.id,
      amount: 25,
    });

    const firstContributorsDebtModel = await store.findRecord(
      'contribution-user',
      firstContributorsDebt.id
    );
    const secondContributorsDebtModel = await store.findRecord(
      'contribution-user',
      secondContributorsDebt.id
    );
    const thirdContributorsDebtModel = await store.findRecord(
      'contribution-user',
      thirdContributorsDebt.id
    );
    const fourthContributorsDebtModel = await store.findRecord(
      'contribution-user',
      fourthContributorsDebt.id
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
