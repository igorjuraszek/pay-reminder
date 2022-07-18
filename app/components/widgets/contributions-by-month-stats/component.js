import Component from '@glimmer/component';

export default class WidgetsContributionsByMonthStatsComponent extends Component {
  get data() {
    const { currentYearOwnedContributions } = this.args;
    return {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      datasets: [
        {
          label: '# of owned contributions',
          data: currentYearOwnedContributions.map((monthlyContributions) => {
            return monthlyContributions.length;
          }),
          backgroundColor: [
            'rgba(255, 0, 0, 0.2)',
            'rgba(251, 176, 52, 0.2)',
            'rgba(255, 221, 0, 0.2)',
            'rgba(193, 216, 47, 0.2)',
            'rgba(0, 164, 228, 0.2)',
            'rgba(106, 115, 123, 0.2)',
            'rgba(255, 0, 0, 0.2)',
            'rgba(251, 176, 52, 0.2)',
            'rgba(255, 221, 0, 0.2)',
            'rgba(193, 216, 47, 0.2)',
            'rgba(0, 164, 228, 0.2)',
            'rgba(106, 115, 123, 0.2)',
          ],
          borderColor: [
            'rgba(255, 0, 0, 1)',
            'rgba(251, 176, 52, 1)',
            'rgba(255, 221, 0, 1)',
            'rgba(193, 216, 47, 1)',
            'rgba(0, 164, 228, 1)',
            'rgba(106, 115, 123, 1)',
            'rgba(255, 0, 0, 1)',
            'rgba(251, 176, 52, 1)',
            'rgba(255, 221, 0, 1)',
            'rgba(193, 216, 47, 1)',
            'rgba(0, 164, 228, 1)',
            'rgba(106, 115, 123, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }

  get options() {
    return {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
  }
}
