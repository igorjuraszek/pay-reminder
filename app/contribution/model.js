import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class ContributionModel extends Model {
  @attr('string') title;
  @attr('date', {
    defaultValue() {
      return new Date();
    },
  })
  createdAt;
  @attr('date') deadline;
  @attr('number') goal;
  @attr('boolean', { defaultValue: false }) isClosed;
  @attr('boolean', { defaultValue: false }) isPrivate;
  @belongsTo('user', { autoSave: true }) owner;
  @hasMany('contribution-user') contributors;
}
