import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class HomeDashboardController extends Controller {
  @service session;
  @service router;
  @service store;

  get options() {
    const options = {
      title: 'My ',
      height: 400,
      width: 600,

      animation: {
        startup: true,
        easing: 'inAndOut',
      },
    };
    return options;
  }

  get data1() {
    return [
      ['Task', 'Hours per Day'],
      ['Work', 21],
      ['213', 37],
      ['qweq', 8],
      ['Eaca', 1],
      ['casd', 2],
      ['vwe', 88],
    ];
  }

  get data2() {
    return [
      ['Element', 'Density', { role: 'style' }],
      ['Copper', 8.94, '#b87333'],
      ['Silver', 10.49, 'silver'],
      ['Gold', 19.3, 'gold'],
      ['Platinum', 21.45, 'color: #e5e4e2'],
      ['Gold', 19.3, 'gold'],
      ['Gold', 19.3, 'gold'],
      ['Gold', 19.3, 'gold'],
      ['Gold', 19.3, 'gold'],
      ['Gold', 19.3, 'gold'],
      ['Gold', 19.3, 'gold'],
      ['Gold', 19.3, 'gold'],
    ];
  }

  get data3() {
    return [
      ['Year', 'Sales', 'Expenses'],
      ['2004', 1000, 400],
      ['2005', 1170, 460],
      ['2006', 660, 1120],
      ['2007', 1030, 540],
    ];
  }

  get contributionsIOwn() {
    return this.model.contributionsIOwn;
  }

  get contributionsIBelongTo() {
    return this.model.contributionsIBelongTo;
  }

  //   activeDebts;
  //   activeDebtsAmount;
  //   paidDebts;
  //   paidDebtsAmount;
  //   paymentsIAmWaitingFor;
  //   paymentsIAmWaitingForAmount;
  //   confirmedPayments;
  //   confirmedPaymentsAmount;
}
