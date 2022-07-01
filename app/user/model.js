import Model, { attr, hasMany } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') username;
  @attr('string') name;
  @attr('string') surname;
  @attr('string') password;
  @attr('string') email;
  @attr('string') photoURL;
  @attr('string') bankAccountNumber;
  @attr('string') blikNumber;
  @attr('string') revolutUsername;
  @attr('string') paypalUsername;
  @attr('boolean', { defaultValue: false }) isDeleted;
  @attr('boolean', { defaultValue: false }) isAdmin;
  @hasMany('contribution-user') contributions;
  @hasMany('contribution') createdContributions;
}
