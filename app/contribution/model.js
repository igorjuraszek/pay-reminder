import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class ContributionModel extends Model {
  @attr('string') title;
  @attr('string') createdAd;
  @attr('string') deadline;
  @attr('string') goal;
  @attr('boolean', { defaultValue: false }) isClosed;
  @attr('boolean', { defaultValue: false }) isPrivate;
  @belongsTo('user') owner;
  @hasMany('contribution-user') contributors;
}