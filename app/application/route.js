import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service store;

  async beforeModel() {
    const user1 = {
      id: 1,
      username: 'admin',
      name: 'admin',
      surname: 'admin',
      password: 'admin123',
      email: 'admin@admin.com',
      isAdmin: true,
    };
    const user2 = {
      id: 2,
      username: 'user',
      name: 'user',
      surname: 'user',
      password: 'user123',
      email: 'user@user.com',
    };
    const user3 = {
      id: 3,
      username: 'staszek',
      name: 'Staszek',
      surname: 'Staśkiewicz',
      password: 'staszek123',
      email: 'staszek@staszek.com',
    };
    const user4 = {
      id: 4,
      username: 'pawelzwarszawy',
      name: 'Paweł',
      surname: 'Warszawski',
      password: 'pawel123',
      email: 'pawelzwarszawy@gmail.com',
    };
    const user5 = {
      id: 5,
      username: 'piotrek',
      name: 'Piotr',
      surname: 'Piotrowski',
      password: 'piotrek123',
      email: 'piotrek@piotrek.com',
    };
    const user6 = {
      id: 6,
      username: 'damiandk',
      name: 'Damian',
      surname: 'Kokołaj',
      password: 'damian123',
      email: 'damiandk@gmail.com',
    };
    const user7 = {
      id: 7,
      username: 'jacek',
      name: 'Jacek',
      surname: 'Jackowski',
      password: 'jacek123',
      email: 'jacek@wp.pl',
    };
    const user8 = {
      id: 8,
      username: 'gosia87',
      name: 'Małgorzata',
      surname: 'Kowalska',
      password: 'gosia123',
      email: 'malgorzata@malgosia.com',
    };
    const user9 = {
      id: 9,
      username: 'kasia',
      name: 'Katarzyna',
      surname: 'Nowak',
      password: 'kasia123',
      email: 'kasia@katarzyna.com',
    };

    const user1Model = this.store.createRecord('user', user1);
    const user2Model = this.store.createRecord('user', user2);
    const user3Model = this.store.createRecord('user', user3);
    const user4Model = this.store.createRecord('user', user4);
    const user5Model = this.store.createRecord('user', user5);
    const user6Model = this.store.createRecord('user', user6);
    const user7Model = this.store.createRecord('user', user7);
    const user8Model = this.store.createRecord('user', user8);
    const user9Model = this.store.createRecord('user', user9);
    await user1Model.save();
    await user2Model.save();
    await user3Model.save();
    await user4Model.save();
    await user5Model.save();
    await user6Model.save();
    await user7Model.save();
    await user8Model.save();
    await user9Model.save();

    const contribution1 = {
      id: 1,
      title: 'Pizza',
      createdAd: new Date(),
      deadline: new Date(2022, 12, 21, 10, 0, 0),
      owner: user4Model,
      goal: '120',
    };
    const contribution2 = {
      id: 2,
      title: 'Dzień nauczyciela',
      createdAd: new Date(),
      deadline: new Date(2022, 12, 21, 10, 0, 0),
      owner: user5Model,
      goal: '250',
    };
    const contribution3 = {
      id: 3,
      title: 'Prezent dla Wojtka',
      createdAd: new Date(),
      deadline: new Date(2022, 12, 21, 10, 0, 0),
      owner: user5Model,
      goal: '130',
    };
    const contribution4 = {
      id: 4,
      title: 'Paliwo za czerwiec',
      createdAd: new Date(),
      deadline: new Date(2022, 12, 21, 10, 0, 0),
      owner: user6Model,
      goal: '660',
    };
    const contribution5 = {
      id: 5,
      title: 'Wyjazd do pragi',
      createdAd: new Date(),
      deadline: new Date(2022, 12, 21, 10, 0, 0),
      owner: user7Model,
      goal: '1560',
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
    const contribution4Model = this.store.createRecord(
      'contribution',
      contribution4
    );
    const contribution5Model = this.store.createRecord(
      'contribution',
      contribution5
    );

    await contribution1Model.save();
    await contribution2Model.save();
    await contribution3Model.save();
    await contribution4Model.save();
    await contribution5Model.save();

    this.store
      .createRecord('contribution-user', {
        contribution: contribution1Model,
        contributor: user3Model,
        amount: 25,
        isPaid: false,
      })
      .save();
    this.store
      .createRecord('contribution-user', {
        contribution: contribution1Model,
        contributor: user4Model,
        amount: 40,
        isPaid: true,
      })
      .save();
    this.store
      .createRecord('contribution-user', {
        contribution: contribution1Model,
        contributor: user5Model,
        amount: 55,
        isPaid: false,
      })
      .save();

    this.store
      .createRecord('contribution-user', {
        contribution: contribution2Model,
        contributor: user5Model,
        amount: 25,
        isPaid: false,
      })
      .save();
    this.store
      .createRecord('contribution-user', {
        contribution: contribution2Model,
        contributor: user6Model,
        amount: 40,
        isPaid: true,
      })
      .save();
    this.store
      .createRecord('contribution-user', {
        contribution: contribution2Model,
        contributor: user7Model,
        amount: 55,
        isPaid: false,
      })
      .save();

    this.store
      .createRecord('contribution-user', {
        contribution: contribution2Model,
        contributor: user8Model,
        amount: 25,
        isPaid: false,
      })
      .save();
    this.store
      .createRecord('contribution-user', {
        contribution: contribution2Model,
        contributor: user9Model,
        amount: 40,
        isPaid: true,
      })
      .save();
    this.store
      .createRecord('contribution-user', {
        contribution: contribution3Model,
        contributor: user9Model,
        amount: 1500,
        isPaid: false,
      })
      .save();

    this.store
      .createRecord('contribution-user', {
        contribution: contribution4Model,
        contributor: user4Model,
        amount: 78,
        isPaid: false,
      })
      .save();

    this.store
      .createRecord('contribution-user', {
        contribution: contribution4Model,
        contributor: user5Model,
        amount: 26,
        isPaid: false,
      })
      .save();

    this.store
      .createRecord('contribution-user', {
        contribution: contribution4Model,
        contributor: user6Model,
        amount: 199,
        isPaid: false,
      })
      .save();

    this.store
      .createRecord('contribution-user', {
        contribution: contribution4Model,
        contributor: user7Model,
        amount: 22,
        isPaid: false,
      })
      .save();

    this.store
      .createRecord('contribution-user', {
        contribution: contribution4Model,
        contributor: user8Model,
        amount: 30,
        isPaid: false,
      })
      .save();

    this.store
      .createRecord('contribution-user', {
        contribution: contribution5Model,
        contributor: user4Model,
        amount: 80,
        isPaid: false,
      })
      .save();

    this.store
      .createRecord('contribution-user', {
        contribution: contribution5Model,
        contributor: user5Model,
        amount: 25,
        isPaid: false,
      })
      .save();

    this.store
      .createRecord('contribution-user', {
        contribution: contribution5Model,
        contributor: user6Model,
        amount: 15,
        isPaid: false,
      })
      .save();
  }
}
