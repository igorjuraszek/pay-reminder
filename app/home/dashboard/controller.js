import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { sum } from 'lodash';
import { getYear, getMonth } from 'date-fns';

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

  get myDebts() {
    const myDebts = this.contributionsIBelongTo.map((contribution) => {
      return contribution.contributors.filter(
        (debt) =>
          debt.contributor.get('id') === this.session.currentUser.get('id')
      ).firstObject;
    });
    return myDebts;
  }

  get activeDebts() {
    return this.myDebts.filter((debt) => {
      return !debt.isPaid;
    });
  }

  get paidDebts() {
    return this.myDebts.filter((debt) => {
      return debt.isPaid;
    });
  }

  get activeDebtsAmount() {
    return sum(
      this.activeDebts.map((debt) => {
        return debt.amount;
      })
    );
  }

  get paidDebtsAmount() {
    return sum(
      this.paidDebts.map((debt) => {
        return debt.amount;
      })
    );
  }

  get paymentsIAmWaitingFor() {
    return this.contributionsIOwn
      .map((contribution) => {
        return contribution.contributors.filter((contributor) => {
          return !contributor.isPaid;
        });
      })
      .flat();
  }

  get paymentsIAmWaitingForAmount() {
    return sum(
      this.paymentsIAmWaitingFor.map((payment) => {
        return payment.amount;
      })
    );
  }

  get confirmedPayments() {
    return this.contributionsIOwn
      .map((contribution) => {
        return contribution.contributors.filter((contributor) => {
          return contributor.isPaid;
        });
      })
      .flat();
  }

  get confirmedPaymentsAmount() {
    return sum(
      this.confirmedPayments.map((payment) => {
        return payment.amount;
      })
    );
  }

  get currentYearOwnedContributions() {
    const currentYear = getYear(new Date());
    const contributionsInCurrentYear = this.contributionsIOwn.filter(
      (contribution) => {
        return getYear(contribution.createdAd) === currentYear;
      }
    );
    const contributionsByMonth = Array.from(Array(12).keys()).map((index) => {
      return contributionsInCurrentYear.filter((contribution) => {
        return getMonth(contribution.createdAd) === index + 1;
      });
    });
    return contributionsByMonth;
  }

  get currentYearBelongsContributions() {
    const currentYear = getYear(new Date());
    const contributionsInCurrentYear = this.contributionsIBelongTo.filter(
      (contribution) => {
        return getYear(contribution.createdAd) === currentYear;
      }
    );
    const contributionsByMonth = Array.from(Array(12).keys()).map((index) => {
      return contributionsInCurrentYear.filter((contribution) => {
        return getMonth(contribution.createdAd) === index + 1;
      });
    });
    return contributionsByMonth;
  }
}
