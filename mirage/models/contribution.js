import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  owner: belongsTo('user'),
  contributors: hasMany('contribution-user'),
});
