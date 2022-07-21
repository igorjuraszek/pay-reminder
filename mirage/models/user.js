import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  contributions: hasMany('contribution-user'),
  createdContributions: hasMany('contribution'),
});
