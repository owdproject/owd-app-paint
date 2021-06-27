import {ModuleApp} from "@owd-client/core/index"
import {OwdModuleAppLoadStoreContext, OwdModuleAppLoadCommandsContext} from "@owd-client/types";
import paintStoreInstance from './storeInstance/index';

// window components
import WindowPaint from "./windows/WindowPaint.vue";

export default class PaintModule extends ModuleApp {
  setup() {
    return {
      name: "paint",
      singleton: false,
      windows: [
        {
          component: WindowPaint,
          name: "WindowPaint",
          category: "accessories",
          title: "Paint",
          icon: {
            name: "mdi-format-color-fill",
            offset: {
              y: 3
            },
            size: "29px"
          },
          minimized: false,
          resizable: true,
          maximizable: true,
          size: {
            width: 480,
            height: 320
          },
          position: {
            x: -1,
            y: 0,
            z: 0
          }
        }
      ]
    }
  }

  setupStoreInstance(context: OwdModuleAppLoadStoreContext) {
    return paintStoreInstance(context)
  }

  setupCommands({store}: OwdModuleAppLoadCommandsContext) {
    return {
      'paint': function () {
        store.dispatch('core/window/windowCreate', 'WindowPaint');
      }
    }
  }
}