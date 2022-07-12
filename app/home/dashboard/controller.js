import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class HomeDashboardController extends Controller {
  @service session;
  @service router;

  get options() {
    const options = {
      title: 'My ',
      height: 300,
      width: 400,

      animation: {
        startup: false,
        easing: 'inAndOut',
      },
    };
    return options;
  }
}
