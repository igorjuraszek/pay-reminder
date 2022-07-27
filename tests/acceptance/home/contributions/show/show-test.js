import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { click, fillIn } from '@ember/test-helpers';
import { selectChoose } from 'ember-power-select/test-support';

import { add, format } from 'date-fns';

module('Acceptance | home/contributions/show', function (hooks) {
  setupApplicationTest(hooks);
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

    // const thirdContribution = this.server.create('contribution', {
    //   ownerId: thirdUser.id,
    //   title: 'Jedzenie w Picollo',
    //   deadline: add(new Date(), { days: 5 }),
    //   goal: 65.5,
    // });

    // this.server.create('contribution-user', {
    //   contributorId: thirdUser.id,
    //   contributionId: thirdContribution.id,
    //   isPaid: true,
    //   amount: 15.5,
    // });
    // this.server.create('contribution-user', {
    //   contributorId: secondUser.id,
    //   contributionId: thirdContribution.id,
    //   amount: 20,
    // });
    // this.server.create('contribution-user', {
    //   contributorId: thirdUser.id,
    //   contributionId: thirdContribution.id,
    //   amount: 10,
    // });
    // this.server.create('contribution-user', {
    //   contributorId: firstUser.id,
    //   contributionId: thirdContribution.id,
    //   amount: 20,
    // });

    // const foutrhContribution = this.server.create('contribution', {
    //   ownerId: fourthUser.id,
    //   title: 'Kwiaty',
    //   deadline: add(new Date(), { days: 5 }),
    //   goal: 60,
    //   isPrivate: true,
    // });

    // this.server.create('contribution-user', {
    //   contributorId: firstUser.id,
    //   contributionId: foutrhContribution.id,
    //   amount: 20,
    // });

    // this.server.create('contribution-user', {
    //   contributorId: thirdUser.id,
    //   contributionId: foutrhContribution.id,
    //   amount: 20,
    // });

    // this.server.create('contribution-user', {
    //   contributorId: fifthUser.id,
    //   contributionId: foutrhContribution.id,
    //   amount: 20,
    // });

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

  test('visiting home/contributions/show', async function (assert) {
    await visit(`/contributions`);
    assert.strictEqual(currentURL(), `/contributions`);

    this.contributions.map((contribution, index) => {
      assert.dom(`[data-test-contribution="${index}"]`).exists();
    });
  });

  //   test('adding new contribution', async function (assert) {
  //     const firstContributor = await this.server.create('user');
  //     const secondContributor = await this.server.create('user');
  //     const thirdContributor = await this.server.create('user');
  //     const firstContributorModel = await this.store.findRecord(
  //       'user',
  //       firstContributor.id
  //     );
  //     const secondContributorModel = await this.store.findRecord(
  //       'user',
  //       secondContributor.id
  //     );
  //     const thirdContributorModel = await this.store.findRecord(
  //       'user',
  //       thirdContributor.id
  //     );

  //     await visit(`/contribution/new`);
  //     assert.strictEqual(currentURL(), `/contribution/new`);

  //     await fillIn('[data-test-contribution-title]', `Zrzutka`);
  //     const deadline = add(new Date(), { days: 3 });
  //     await fillIn(
  //       '[data-test-contribution-deadline]',
  //       `${format(deadline, 'yyyy-MM-dd')}`
  //     );

  //     await selectChoose('.user-select', '.ember-power-select-option', 1);
  //     await fillIn('[data-test-amount]', `10`);
  //     await click('[data-test-add-contributor]');

  //     await selectChoose('.user-select', '.ember-power-select-option', 2);
  //     await fillIn('[data-test-amount]', `15`);
  //     await click('[data-test-add-contributor]');

  //     await selectChoose('.user-select', '.ember-power-select-option', 3);
  //     await fillIn('[data-test-amount]', `20`);
  //     await click('[data-test-add-contributor]');

  //     await click('[data-test-create-contribution-submit]');

  //     const contributions = await this.store.findAll('contribution');
  //     const contribution = contributions.firstObject;
  //     assert.strictEqual(currentURL(), `/contribution/${contribution.id}`);

  //     assert.dom('[data-test-title]').hasText(contribution.title);
  //     assert
  //       .dom('[data-test-owner]')
  //       .includesText(contribution.owner.get('username'));
  //     assert
  //       .dom('[data-test-deadline]')
  //       .includesText(`${format(deadline, 'dd-MM-yyyy')}`);

  //     assert.dom('[data-test-row="2"]').exists();
  //     assert.dom('[data-test-row="3"]').doesNotExist();
  //   });
});
