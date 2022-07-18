import Component from '@glimmer/component';

export default class WidgetsActiveContributionsCountComponent extends Component {
  get data() {
    const { activeDebts, paymentsIAmWaitingFor } = this.args;
    const data = {
      labels: ['I Belong to', 'I Own'],
      datasets: [
        {
          label: 'Open contributions count',
          data: [activeDebts.length, paymentsIAmWaitingFor.length],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
          hoverOffset: 4,
        },
      ],
    };
    return data;
  }
}
