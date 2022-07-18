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
    const myDebts = this.contributionsIBelongTo.map(({ contributors }) => {
      return contributors.filter(
        (debt) =>
          debt.contributor.get('id') === this.session.currentUser.get('id')
      ).firstObject;
    });
    return myDebts;
  }

  get activeDebts() {
    return this.myDebts.filter(({ isPaid }) => !isPaid);
  }

  get paidDebts() {
    return this.myDebts.filter(({ isPaid }) => isPaid);
  }

  get activeDebtsAmount() {
    return sum(this.activeDebts.map(({ amount }) => amount));
  }

  get paidDebtsAmount() {
    return sum(this.paidDebts.map(({ amount }) => amount));
  }

  get paymentsIAmWaitingFor() {
    return this.contributionsIOwn
      .map(({ contributors }) => {
        return contributors.filter(({ isPaid }) => !isPaid);
      })
      .flat();
  }

  get paymentsIAmWaitingForAmount() {
    return sum(this.paymentsIAmWaitingFor.map(({ amount }) => amount));
  }

  get confirmedPayments() {
    return this.contributionsIOwn
      .map(({ contributors }) => {
        return contributors.filter(({ isPaid }) => isPaid);
      })
      .flat();
  }

  get confirmedPaymentsAmount() {
    return sum(this.confirmedPayments.map(({ amount }) => amount));
  }

  get currentYearOwnedContributions() {
    const currentYear = getYear(new Date());
    const contributionsInCurrentYear = this.contributionsIOwn.filter(
      ({ createdAd }) => getYear(createdAd) === currentYear
    );
    const contributionsByMonth = Array.from(Array(12).keys()).map((index) => {
      return contributionsInCurrentYear.filter(
        ({ createdAd }) => getMonth(createdAd) === index + 1
      );
    });
    return contributionsByMonth;
  }

  get currentYearBelongsContributions() {
    const currentYear = getYear(new Date());
    const contributionsInCurrentYear = this.contributionsIBelongTo.filter(
      ({ createdAd }) => getYear(createdAd) === currentYear
    );
    const contributionsByMonth = Array.from(Array(12).keys()).map((index) => {
      return contributionsInCurrentYear.filter(
        ({ createdAd }) => getMonth(createdAd) === index + 1
      );
    });
    return contributionsByMonth;
  }
}
