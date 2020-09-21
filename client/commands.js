export default ({ store }) => {
  return {
    'paint': function () {
      store.dispatch('core/windows/windowOpen', 'WindowPaint');
    },
  }
}
