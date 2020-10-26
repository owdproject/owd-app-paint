import {Module} from '@owd-client/core'
import paintStoreInstance from './storeInstance/index';

export default class PaintModule extends Module {
  constructor(context) {
    super(context)
  }

  loadStoreInstance(context) {
    return paintStoreInstance(context)
  }

  loadCommands({store}) {
    return {
      'paint': function () {
        store.dispatch('core/windows/windowCreate', {
          name: 'WindowPaint'
        });
      },
    }
  }
}