import Component from '@glimmer/component';

export default class WidgetsActiveContributionsAmountComponent extends Component {
  get data() {
    const { paymentsIAmWaitingForAmount, activeDebtsAmount } = this.args;
    const data = {
      labels: ['I Belong to (PLN)', 'I Own (PLN)'],
      datasets: [
        {
          label: 'Open contributions (amount PLN)',
          data: [activeDebtsAmount, paymentsIAmWaitingForAmount],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
          hoverOffset: 4,
        },
      ],
    };
    return data;
  }
}
