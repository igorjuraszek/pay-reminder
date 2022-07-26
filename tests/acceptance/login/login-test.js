// import { module, test } from 'qunit';
// import { visit, currentURL, click, fillIn } from '@ember/test-helpers';
// import { setupApplicationTest } from 'ember-qunit';
// import { setupMirage } from 'ember-cli-mirage/test-support';

// module('Acceptance | dashboard', function (hooks) {
//   setupApplicationTest(hooks);
//   setupMirage(hooks);

//   hooks.beforeEach(async function () {
//     this.sessionService = this.owner.lookup('service:session');
//     const store = await this.owner.lookup('service:store');

//     const loggedUser = await this.server.create('user');
//     const loggedUserModel = await store.findRecord('user', loggedUser.id);

//     this.set('user', loggedUserModel);
//     this.set('store', store);

//     window.localStorage.setItem(
//       'storage:logged-as',
//       JSON.stringify({ id: null })
//     );
//   });

//   test('visiting /login', async function (assert) {
//     await visit(`/login`);
//     assert.strictEqual(currentURL(), `/login`);

//     assert.dom('[data-test-username]').exists();
//     assert.dom('[data-test-password]').exists();
//     assert.dom('[data-test-submit]').exists();
//   });

//   test('try to login', async function (assert) {
//     await visit(`/login`);
//     assert.strictEqual(currentURL(), `/login`);

//     assert.dom('[data-test-username]').exists();
//     assert.dom('[data-test-password]').exists();
//     assert.dom('[data-test-submit]').exists();

//     await fillIn('[data-test-username]', `${this.user.username}`);
//     await fillIn('[data-test-password]', `${this.user.password}`);
//     await click('[data-test-submit]');

//     assert.strictEqual(currentURL(), `/`);
//   });
// });
