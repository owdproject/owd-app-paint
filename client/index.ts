import {ModuleApp, useDesktopApps} from "@owd-client/core/index"
import {OwdModuleAppSetupStoreContext, OwdModuleAppSetupCommandsContext} from "@owd-client/types";
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
            name: "mdi mdi-format-color-fill",
            offset: {
              y: 3
            },
            size: "29px"
          },
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

  setupStoreInstance(context: OwdModuleAppSetupStoreContext) {
    return paintStoreInstance(context)
  }

  setupCommands({store}: OwdModuleAppSetupCommandsContext) {
    return {
      'paint': function () {
        const desktopApps = useDesktopApps()
        const projectsModuleApp = desktopApps.findApp('paint')

        if (projectsModuleApp) {
          projectsModuleApp
            .createWindow('WindowPaint')
            .onMounted(windowInstance => windowInstance.open(true))
        }
      }
    }
  }
}