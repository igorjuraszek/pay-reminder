import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { add } from 'date-fns';

module('Integration | Component | contributions/list', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    this.sessionService = this.owner.lookup('service:session');
    const store = this.owner.lookup('service:store');

    const firstUser = this.server.create('user');
    const secondUser = this.server.create('user');
    const thirdUser = this.server.create('user');
    const fourthUser = this.server.create('user');
    const fifthUser = this.server.create('user');

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

    this.server.create('contribution-user', {
      contributorId: fifthUser.id,
      contributionId: firstContribution.id,
      amount: 25,
    });

    const secondContribution = this.server.create('contribution', {
      ownerId: firstUser.id,
      title: 'Prezent dla Wojtka',
      deadline: add(new Date(), { days: 5 }),
      goal: 500,
    });

    this.server.create('contribution-user', {
      contributorId: firstUser.id,
      contributionId: secondContribution.id,
      isPaid: true,
      amount: 100,
    });
    this.server.create('contribution-user', {
      contributorId: secondUser.id,
      contributionId: secondContribution.id,
      amount: 100,
    });
    this.server.create('contribution-user', {
      contributorId: thirdUser.id,
      contributionId: secondContribution.id,
      amount: 100,
    });
    this.server.create('contribution-user', {
      contributorId: fourthUser.id,
      contributionId: secondContribution.id,
      amount: 100,
    });
    this.server.create('contribution-user', {
      contributorId: fifthUser.id,
      contributionId: secondContribution.id,
      amount: 100,
    });

    const thirdContribution = this.server.create('contribution', {
      ownerId: thirdUser.id,
      title: 'Jedzenie w Picollo',
      deadline: add(new Date(), { days: 5 }),
      goal: 65.5,
    });

    this.server.create('contribution-user', {
      contributorId: thirdUser.id,
      contributionId: thirdContribution.id,
      isPaid: true,
      amount: 15.5,
    });
    this.server.create('contribution-user', {
      contributorId: secondUser.id,
      contributionId: thirdContribution.id,
      amount: 20,
    });
    this.server.create('contribution-user', {
      contributorId: thirdUser.id,
      contributionId: thirdContribution.id,
      amount: 10,
    });
    this.server.create('contribution-user', {
      contributorId: firstUser.id,
      contributionId: thirdContribution.id,
      amount: 20,
    });

    const foutrhContribution = this.server.create('contribution', {
      ownerId: fourthUser.id,
      title: 'Kwiaty',
      deadline: add(new Date(), { days: 5 }),
      goal: 60,
      isPrivate: true,
    });

    this.server.create('contribution-user', {
      contributorId: firstUser.id,
      contributionId: foutrhContribution.id,
      amount: 20,
    });

    this.server.create('contribution-user', {
      contributorId: thirdUser.id,
      contributionId: foutrhContribution.id,
      amount: 20,
    });

    this.server.create('contribution-user', {
      contributorId: fifthUser.id,
      contributionId: foutrhContribution.id,
      amount: 20,
    });

    const contributions = await store.findAll('contribution');

    this.set(
      'sessionService.currentUser',
      await store.findRecord('user', firstUser.id)
    );

    this.set('contributions', contributions);

    await render(
      hbs`<Contributions::List @contributions={{this.contributions}} />`
    );
  });

  test('it renders', async function (assert) {
    this.contributions.map((contribution, contributionIndex) => {
      assert.dom(`[data-test-contribution="${contributionIndex}"]`).exists();
      assert
        .dom(`[data-test-contribution-title="${contributionIndex}"]`)
        .exists();
      assert
        .dom(`[data-test-contribution-owner="${contributionIndex}"]`)
        .exists();
      assert
        .dom(`[data-test-contribution-goal="${contributionIndex}"]`)
        .exists();
    });
  });

  test('correct values', async function (assert) {
    this.contributions.map((contribution, contributionIndex) => {
      assert
        .dom(`[data-test-contribution-title="${contributionIndex}"]`)
        .hasText(contribution.title);
      assert
        .dom(`[data-test-contribution-owner="${contributionIndex}"]`)
        .hasText(contribution.owner.get('username'));
      assert
        .dom(`[data-test-contribution-goal="${contributionIndex}"]`)
        .hasText(`${contribution.goal} PLN`);
    });
  });
});
