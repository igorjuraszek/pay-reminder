import Component from '@glimmer/component';

export default class WidgetsActiveContributionsStatsComponent extends Component {
  get options() {
    console.log(this.args.windowWidth, this.args.windowWidth);
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
    console.log(widgetWidth, widgetHeight);
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
}
