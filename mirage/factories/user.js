import { Factory } from 'ember-cli-mirage';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  name() {
    return faker.name.firstName();
  },
  surname() {
    return faker.name.lastName();
  },
  username() {
    return faker.name.middleName();
  },
  email() {
    return faker.internet.email();
  },
  password() {
    return faker.internet.password();
  },
  photoURL() {
    return faker.image.avatar();
  },

  bankAccountNumber() {
    return faker.finance.account(26);
  },

  blikNumber() {
    return faker.phone.number('###-###-###');
  },

  revolutUsername() {
    return faker.name.middleName();
  },

  paypalUsername() {
    return faker.name.middleName();
  },
});
