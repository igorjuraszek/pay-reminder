import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | navbar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<Navbar />`);

    assert.dom('[data-test-home]').hasText('Home');
    assert.dom('[data-test-create]').hasText('Create contribution');
    assert.dom('[data-test-contributions]').hasText('Contributions');
    assert.dom('[data-test-history]').hasText('History');
    assert.dom('[data-test-users]').hasText('Users');
    assert.dom('[data-test-settings]').hasText('Account settings');
    assert.dom('[data-test-logout]').hasText('Logout');
  });
});
