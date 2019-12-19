export function configure(config) {
  //config.globalResources([]);
  config.globalResources([
    './elements/nav-bar',
    './elements/flat-picker/flat-picker',
    './value-converters/date-format',
    './value-converters/filter-todos'
  ]);
}
