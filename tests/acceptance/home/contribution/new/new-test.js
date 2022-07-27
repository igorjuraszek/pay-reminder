import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { click, fillIn } from '@ember/test-helpers';
import { selectChoose } from 'ember-power-select/test-support';

import { add, format } from 'date-fns';

module('Acceptance | contribution/new', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    this.sessionService = this.owner.lookup('service:session');
    const store = await this.owner.lookup('service:store');

    const loggedUser = await this.server.create('user');
    const loggedUserModel = await store.findRecord('user', loggedUser.id);

    this.set('store', store);
    this.set('sessionService.currentUser', loggedUserModel);

    window.localStorage.setItem(
      'storage:logged-as',
      JSON.stringify({ id: loggedUserModel.id })
    );
  });

  test('visiting /contribution/new', async function (assert) {
    await visit(`/contribution/new`);
    assert.strictEqual(currentURL(), `/contribution/new`);

    assert.dom('[data-test-contribution-title]').exists();
    assert.dom('[data-test-contribution-deadline]').exists();
    assert.dom('[data-test-contribution-privacy]').exists();
    assert.dom('.user-select').exists();
    assert.dom('[data-test-add-contributor]').exists();
    assert.dom('[data-test-amount]').exists();
    assert.dom('[data-test-create]').exists();
  });

  test('adding new contribution', async function (assert) {
    const firstContributor = await this.server.create('user');
    const secondContributor = await this.server.create('user');
    const thirdContributor = await this.server.create('user');
    const firstContributorModel = await this.store.findRecord(
      'user',
      firstContributor.id
    );
    const secondContributorModel = await this.store.findRecord(
      'user',
      secondContributor.id
    );
    const thirdContributorModel = await this.store.findRecord(
      'user',
      thirdContributor.id
    );

    await visit(`/contribution/new`);
    assert.strictEqual(currentURL(), `/contribution/new`);

    await fillIn('[data-test-contribution-title]', `Zrzutka`);
    const deadline = add(new Date(), { days: 3 });
    await fillIn(
      '[data-test-contribution-deadline]',
      `${format(deadline, 'yyyy-MM-dd')}`
    );

    await selectChoose('.user-select', '.ember-power-select-option', 1);
    await fillIn('[data-test-amount]', `10`);
    await click('[data-test-add-contributor]');

    await selectChoose('.user-select', '.ember-power-select-option', 2);
    await fillIn('[data-test-amount]', `15`);
    await click('[data-test-add-contributor]');

    await selectChoose('.user-select', '.ember-power-select-option', 3);
    await fillIn('[data-test-amount]', `20`);
    await click('[data-test-add-contributor]');

    await click('[data-test-create-contribution-submit]');

    const contributions = await this.store.findAll('contribution');
    const contribution = contributions.firstObject;
    assert.strictEqual(currentURL(), `/contribution/${contribution.id}`);

    assert.dom('[data-test-title]').hasText(contribution.title);
    assert
      .dom('[data-test-owner]')
      .includesText(contribution.owner.get('username'));
    assert
      .dom('[data-test-deadline]')
      .includesText(`${format(deadline, 'dd-MM-yyyy')}`);

    assert.dom('[data-test-row="2"]').exists();
    assert.dom('[data-test-row="3"]').doesNotExist();
  });
});
