import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | dashboard', function (hooks) {
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

  test('visiting /dashboard', async function (assert) {
    await visit(`/dashboard`);
    assert.strictEqual(currentURL(), `/dashboard`);

    assert.dom('[data-test-active-contributions-count]').exists();
    assert.dom('[data-test-active-contributions-amount]').exists();
    assert.dom('[data-test-active-contributions-by-month]').exists();
  });
});
