import Model, { attr, belongsTo } from '@ember-data/model';

export default class ContributionUserModel extends Model {
  @belongsTo('user') contributor;
  @belongsTo('contribution') contribution;
  @attr('number') amount;
  @attr('boolean') isPaid;
}
