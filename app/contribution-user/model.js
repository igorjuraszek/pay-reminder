import Model, { attr, belongsTo } from '@ember-data/model';

export default class ContributionUserModel extends Model {
  @belongsTo('user', { autoSave: true }) contributor;
  @belongsTo('contribution', { autoSave: true }) contribution;
  @attr('number') amount;
  @attr('boolean') isPaid;
}
