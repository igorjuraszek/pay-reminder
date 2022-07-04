import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | home/contributions/new', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:home/contributions/new');
    assert.ok(route);
  });
});
