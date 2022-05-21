import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class HomeRoute extends Route {
  @service store;

  async beforeModel() {
    const user1 = {
      id: 1,
      username: 'admin',
      password: 'admin123',
      email: 'admin@admin.com',
      isAdmin: true,
    };
    const user2 = {
      id: 2,
      username: 'user',
      password: 'user123',
      email: 'user@user.com',
    };
    const user3 = {
      id: 3,
      username: 'staszek',
      password: 'staszek123',
      email: 'staszek@staszek.com',
    };

    const user1Model = this.store.createRecord('user', user1);
    const user2Model = this.store.createRecord('user', user2);
    const user3Model = this.store.createRecord('user', user3);
    await user1Model.save();
    await user2Model.save();
    await user3Model.save();

    const contribution1 = {
      id: 1,
      title: 'Testowy 1',
      createdAd: '21-05-2022 20:00',
      owner: user1Model,
      goal: '100',
    };
    const contribution2 = {
      id: 2,
      title: 'Testowy 2',
      createdAd: '20-05-2022 20:00',
      owner: user2Model,
      goal: '200',
    };
    const contribution3 = {
      id: 3,
      title: 'Testowy 2',
      createdAd: '15-05-2022 20:00',
      owner: user3Model,
      goal: '150',
    };

    const contribution1Model = this.store.createRecord(
      'contribution',
      contribution1
    );
    const contribution2Model = this.store.createRecord(
      'contribution',
      contribution2
    );
    const contribution3Model = this.store.createRecord(
      'contribution',
      contribution3
    );

    await contribution1Model.save();
    await contribution2Model.save();
    await contribution3Model.save();

    this.store
      .createRecord('contribution-user', {
        contribution: contribution1Model,
        user: user2Model,
        amount: 25,
        isPaid: false,
      })
      .save();
    this.store
      .createRecord('contribution-user', {
        contribution: contribution1Model,
        user: user1Model,
        amount: 40,
        isPaid: true,
      })
      .save();
    this.store
      .createRecord('contribution-user', {
        contribution: contribution1Model,
        user: user3Model,
        amount: 55,
        isPaid: false,
      })
      .save();
  }
}
