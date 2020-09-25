export default ({ store }) => {
  return {
    'paint': function () {
      store.dispatch('core/windows/windowCreate', {
        name: 'WindowPaint'
      });
    },
  }
}
