import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | users/list', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it renders', async function (assert) {
    this.server.createList('user', 20);
    const store = this.owner.lookup('service:store');
    const userModels = await store.findAll('user');
    this.set('users', userModels);

    await render(hbs`<Users::List @users={{this.users}}/>`);
    userModels.map((user, index) => {
      assert.dom(`[data-test-row="${index}"]`).exists();
    });
  });

  test('correct values', async function (assert) {
    this.server.createList('user', 20);
    const store = this.owner.lookup('service:store');
    const userModels = await store.findAll('user');
    this.set('users', userModels);

    await render(hbs`<Users::List @users={{this.users}}/>`);
    userModels.map((user, index) => {
      assert.dom(`[data-test-row="${index}"]`).includesText(user.username);
      assert.dom(`[data-test-row="${index}"]`).includesText(user.name);
      assert.dom(`[data-test-row="${index}"]`).includesText(user.surname);
    });
  });
});
