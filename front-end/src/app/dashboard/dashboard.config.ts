export class DashabordConfig {
  public config =
    [
      {
        route: 'home',
        name: 'Home',
        childs: []
      },
      {
        route: 'charts',
        name: 'Charts',
        childs: []
      },
    ];
  public getNavs(parent: string) {
    // console.log(parent);
    const conf = this.config.filter(route => {
      return route.childs ? route.route === parent : false;
    });
    return conf[0].childs;
  }
  public getAllConfig() {
    return this.config;
  }
}
