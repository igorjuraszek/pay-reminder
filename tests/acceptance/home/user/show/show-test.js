import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | user', function (hooks) {
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

  test('visiting /user', async function (assert) {
    const userToCheck = await this.server.create('user');
    const userToCheckModel = await this.store.findRecord(
      'user',
      userToCheck.id
    );

    await visit(`/user/${userToCheckModel.id}`);
    assert.strictEqual(currentURL(), `/user/${userToCheckModel.id}`);

    assert.dom('[data-test-input-name]').hasValue(`${userToCheckModel.name}`);
    assert
      .dom('[data-test-input-surname]')
      .hasValue(`${userToCheckModel.surname}`);
    assert
      .dom('[data-test-input-username]')
      .hasValue(`${userToCheckModel.username}`);
    assert.dom('[data-test-input-email]').hasValue(`${userToCheckModel.email}`);
    assert
      .dom('[data-test-input-blik-number]')
      .hasValue(`${userToCheckModel.blikNumber}`);
    assert
      .dom('[data-test-input-bank-account-number]')
      .hasValue(`${userToCheckModel.bankAccountNumber}`);
    assert
      .dom('[data-test-input-revolut]')
      .hasValue(`${userToCheckModel.revolutUsername}`);
    assert
      .dom('[data-test-input-paypal]')
      .hasValue(`${userToCheckModel.paypalUsername}`);
  });
});
