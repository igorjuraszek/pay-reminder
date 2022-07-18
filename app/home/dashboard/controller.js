import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { sum } from 'lodash';
import { getYear, getMonth } from 'date-fns';

export default class HomeDashboardController extends Controller {
  @service session;
  @service router;
  @service store;

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
