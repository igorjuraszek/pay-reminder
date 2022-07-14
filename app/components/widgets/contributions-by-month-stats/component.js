import Component from '@glimmer/component';

export default class WidgetsContributionsByMonthStatsComponent extends Component {
  get options() {
    const widgetWidth =
      this.args.windowWidth / 2 >= 600 ? this.args.windowWidth / 2 : 600;
    const widgetHeight =
      this.args.windowHeight / 2 >= 300 ? this.args.windowHeight / 2 : 300;
    const options = {
      title: 'My Contributions',
      height: widgetHeight,
      width: widgetWidth,

      animation: {
        startup: true,
        easing: 'inAndOut',
      },
    };
    return options;
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
}
