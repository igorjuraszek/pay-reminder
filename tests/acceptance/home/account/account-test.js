import { module, test } from 'qunit';
import { visit, currentURL, click, waitFor } from '@ember/test-helpers';
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

  test('visiting /account', async function (assert) {
    await visit(`/account`);
    assert.strictEqual(currentURL(), `/account`);

    assert.dom('[data-test-input-name]').exists();
    assert.dom('[data-test-input-surname]').exists();
    assert.dom('[data-test-input-username]').exists();
    assert.dom('[data-test-input-password]').exists();
    assert.dom('[data-test-input-email]').exists();
    assert.dom('[data-test-input-blik-number]').exists();
    assert.dom('[data-test-input-bank-account-number]').exists();
    assert.dom('[data-test-input-revolut]').exists();
    assert.dom('[data-test-input-paypal]').exists();
    assert.dom('[data-test-input-paypal]').exists();
    assert.dom('[data-test-button-edit]').exists();

    const { currentUser } = this.sessionService;

    assert.dom('[data-test-input-name]').hasValue(`${currentUser.name}`);
    assert.dom('[data-test-input-surname]').hasValue(`${currentUser.surname}`);
    assert
      .dom('[data-test-input-username]')
      .hasValue(`${currentUser.username}`);
    assert
      .dom('[data-test-input-password]')
      .hasValue(`${currentUser.password}`);
    assert.dom('[data-test-input-email]').hasValue(`${currentUser.email}`);
    assert
      .dom('[data-test-input-blik-number]')
      .hasValue(`${currentUser.blikNumber}`);
    assert
      .dom('[data-test-input-bank-account-number]')
      .hasValue(`${currentUser.bankAccountNumber}`);
    assert
      .dom('[data-test-input-revolut]')
      .hasValue(`${currentUser.revolutUsername}`);
    assert
      .dom('[data-test-input-paypal]')
      .hasValue(`${currentUser.paypalUsername}`);
  });
});
