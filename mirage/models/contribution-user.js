import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  contributor: belongsTo('user'),
  contribution: belongsTo(),
});
