import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | account-settings/details', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    const user = this.server.create('user');
    const store = this.owner.lookup('service:store');
    const userModel = await store.findRecord('user', user.id);
    console.log(user);
    console.log(userModel);

    this.set('currentUser', userModel);

    await render(
      hbs`<AccountSettings::Details @currentUser={{this.currentUser}} />`
    );
  });

  test('it renders', async function (assert) {
    assert.dom('[data-test-input-name]').exists();
    assert.dom('[data-test-input-surname]').exists();
    assert.dom('[data-test-input-username]').exists();
    assert.dom('[data-test-input-password]').exists();
    assert.dom('[data-test-input-email]').exists();
    assert.dom('[data-test-input-blik-number]').exists();
    assert.dom('[data-test-input-bank-account-number]').exists();
    assert.dom('[data-test-input-revolut]').exists();
    assert.dom('[data-test-input-paypal]').exists();
    assert.dom('[data-test-button-edit]').exists();
  });

  test('correct values', async function (assert) {
    await render(
      hbs`<AccountSettings::Details @currentUser={{this.currentUser}} />`
    );
    assert.dom('[data-test-input-name]').hasValue(`${this.currentUser.name}`);
    assert
      .dom('[data-test-input-surname]')
      .hasValue(`${this.currentUser.surname}`);
    assert
      .dom('[data-test-input-username]')
      .hasValue(`${this.currentUser.username}`);
    assert
      .dom('[data-test-input-password]')
      .hasValue(`${this.currentUser.password}`);
    assert.dom('[data-test-input-email]').hasValue(`${this.currentUser.email}`);
    assert
      .dom('[data-test-input-blik-number]')
      .hasValue(`${this.currentUser.blikNumber}`);
    assert
      .dom('[data-test-input-bank-account-number]')
      .hasValue(`${this.currentUser.bankAccountNumber}`);
    assert
      .dom('[data-test-input-revolut]')
      .hasValue(`${this.currentUser.revolutUsername}`);
    assert
      .dom('[data-test-input-paypal]')
      .hasValue(`${this.currentUser.paypalUsername}`);
  });

  test('edit mode disabled', async function (assert) {
    assert.dom('[data-test-input-name]').hasAttribute('disabled');
    assert.dom('[data-test-input-surname]').hasAttribute('disabled');
    assert.dom('[data-test-input-username]').hasAttribute('disabled');
    assert.dom('[data-test-input-password]').hasAttribute('disabled');
    assert.dom('[data-test-input-email]').hasAttribute('disabled');
    assert.dom('[data-test-input-blik-number]').hasAttribute('disabled');
    assert
      .dom('[data-test-input-bank-account-number]')
      .hasAttribute('disabled');
    assert.dom('[data-test-input-revolut]').hasAttribute('disabled');
    assert.dom('[data-test-input-paypal]').hasAttribute('disabled');
    assert.dom('[data-test-button-edit]').exists();
  });

  test('edit mode enabled', async function (assert) {
    await click('[data-test-button-edit]');

    assert.dom('[data-test-input-name]').hasNoAttribute('disabled');
    assert.dom('[data-test-input-surname]').hasNoAttribute('disabled');
    assert.dom('[data-test-input-username]').hasNoAttribute('disabled');
    assert.dom('[data-test-input-password]').hasNoAttribute('disabled');
    assert.dom('[data-test-input-email]').hasNoAttribute('disabled');
    assert.dom('[data-test-input-blik-number]').hasNoAttribute('disabled');
    assert
      .dom('[data-test-input-bank-account-number]')
      .hasNoAttribute('disabled');
    assert.dom('[data-test-input-revolut]').hasNoAttribute('disabled');
    assert.dom('[data-test-input-paypal]').hasNoAttribute('disabled');
    assert.dom('[data-test-button-edit]').doesNotExist();
    assert.dom('[data-test-button-discard]').exists();
    assert.dom('[data-test-button-save]').exists();
  });

  test.skip('edit data', async function (assert) {
    await click('[data-test-button-edit]');

    await fillIn('[data-test-input-name]', 'Wojciech');
    await fillIn('[data-test-input-surname]', 'Suchodolski');
    await fillIn('[data-test-input-email]', 'wojtekzbombasu@gmail.com');
    await click('[data-test-button-save]');

    assert.dom('[data-test-input-name]').hasValue('Wojciech');
    assert.dom('[data-test-input-surname]').hasValue('Suchodolski');
    assert
      .dom('[data-test-input-username]')
      .hasValue(`${this.currentUser.username}`);
    assert
      .dom('[data-test-input-password]')
      .hasValue(`${this.currentUser.password}`);
    assert.dom('[data-test-input-email]').hasValue('wojtekzbombasu@gmail.com');
    assert
      .dom('[data-test-input-blik-number]')
      .hasValue(`${this.currentUser.blikNumber}`);
    assert
      .dom('[data-test-input-revolut]')
      .hasValue(`${this.currentUser.revolutUsername}`);
    assert
      .dom('[data-test-input-paypal]')
      .hasValue(`${this.currentUser.paypalUsername}`);

    assert.dom('[data-test-input-name]').hasAttribute('disabled');
    assert.dom('[data-test-input-surname]').hasAttribute('disabled');
    assert.dom('[data-test-input-username]').hasAttribute('disabled');
    assert.dom('[data-test-input-password]').hasAttribute('disabled');
    assert.dom('[data-test-input-email]').hasAttribute('disabled');
    assert.dom('[data-test-input-blik-number]').hasAttribute('disabled');
    assert
      .dom('[data-test-input-bank-account-number]')
      .hasAttribute('disabled');
    assert.dom('[data-test-input-revolut]').hasAttribute('disabled');
    assert.dom('[data-test-input-paypal]').hasAttribute('disabled');
    assert.dom('[data-test-button-edit]').exists();
    assert.dom('[data-test-button-discard]').doesNotExist();
    assert.dom('[data-test-button-save]').doesNotExist();
  });

  test.skip('fields validation', async function (assert) {
    await click('[data-test-button-edit]');

    assert.dom('[data-test-input-name]').hasNoAttribute('disabled');
    assert.dom('[data-test-input-surname]').hasNoAttribute('disabled');
    assert.dom('[data-test-input-username]').hasNoAttribute('disabled');
    assert.dom('[data-test-input-password]').hasNoAttribute('disabled');
    assert.dom('[data-test-input-email]').hasNoAttribute('disabled');
    assert.dom('[data-test-input-blik-number]').hasNoAttribute('disabled');
    assert
      .dom('[data-test-input-bank-account-number]')
      .hasNoAttribute('disabled');
    assert.dom('[data-test-input-revolut]').hasNoAttribute('disabled');
    assert.dom('[data-test-input-paypal]').hasNoAttribute('disabled');
    assert.dom('[data-test-button-edit]').doesNotExist();
    assert.dom('[data-test-button-discard]').exists();
    assert.dom('[data-test-button-save]').exists();
  });
});
