import {ModuleApp} from '@owd-client/core'
import paintStoreInstance from './storeInstance/index';

export default class PaintModule extends ModuleApp {
  constructor(context) {
    super(context)
  }

  loadStoreInstance(context) {
    return paintStoreInstance(context)
  }

  loadCommands({store}) {
    return {
      'paint': function () {
        store.dispatch('core/window/windowCreate', 'WindowPaint');
      }
    }
  }
}