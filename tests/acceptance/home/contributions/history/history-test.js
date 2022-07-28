import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { add } from 'date-fns';

module('Acceptance | home/contributions/history', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    this.sessionService = this.owner.lookup('service:session');
    const store = this.owner.lookup('service:store');

    const [firstUser, secondUser, thirdUser, fourthUser, fifthUser] =
      this.server.createList('user', 5);

    const firstContribution = this.server.create('contribution', {
      ownerId: firstUser.id,
      title: 'Dzień nauczyciela',
      deadline: add(new Date(), { days: -3 }),
      goal: 100,
      isClosed: true,
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
      deadline: add(new Date(), { days: -5 }),
      goal: 500,
      isClosed: true,
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

    const contributions = await store.findAll('contribution');

    this.set(
      'sessionService.currentUser',
      await store.findRecord('user', firstUser.id)
    );

    this.set('contributions', contributions);

    const loggedUserModel = await store.findRecord('user', firstUser.id);

    this.set('store', store);
    this.set('sessionService.currentUser', loggedUserModel);

    window.localStorage.setItem(
      'storage:logged-as',
      JSON.stringify({ id: loggedUserModel.id })
    );
  });

  test('visiting home/contributions/history', async function (assert) {
    await visit(`/contributions/history`);
    assert.strictEqual(currentURL(), `/contributions/history`);

    this.contributions.map((contribution, index) => {
      assert.dom(`[data-test-contribution="${index}"]`).exists();
    });
  });
});
