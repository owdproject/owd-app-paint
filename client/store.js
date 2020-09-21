export default {
  state: {
    colors: {
      color1: {
        value: [0,0,0],
        picker: false
      },
      color2: {
        value: [255,255,255],
        picker: false
      },
    },

    tools: {
      active: 'square',
      fill: {},
      square: {
        size: 16,
        menuActive: false
      },
      ellipse: {
        size: 16,
        menuActive: false
      }
    }
  },

  getters: {
    colors(state) {
      return state.colors
    },
    tools(state) {
      return state.tools
    }
  },

  mutations: {
    NEW_FILE() {

    },
    SAVE_FILE() {

    },
    SET_TOOL(state, {active, fill, square, ellipse}) {
      if (typeof active !== 'undefined') {
        state.tools.active = active;
      }

      if (typeof fill !== 'undefined') {
        state.tools.fill = fill;
      }

      if (typeof square === 'object') {
        // set square size
        if (square.size) {
          state.tools.square.size = square.size
        }

        // set square menu active
        if (typeof square.menuActive === 'boolean') {
          state.tools.square.menuActive = square.menuActive
        }
      }

      if (typeof ellipse === 'object') {
        // set square size
        if (ellipse.size) {
          state.tools.ellipse.size = ellipse.size
        }

        // set square menu active
        if (typeof ellipse.menuActive === 'boolean') {
          state.tools.ellipse.menuActive = ellipse.menuActive
        }
      }
    },
    SET_COLOR_1(state, {value, picker}) {
      if (value) state.colors.color1.value = value;
      if (typeof picker === 'boolean') state.colors.color1.picker = picker;
    },
    SET_COLOR_2(state, {value, picker}) {
      if (value) state.colors.color2.value = value;
      if (typeof picker === 'boolean') state.colors.color2.picker = picker;
    }
  },

  actions: {
    setCurrentTool({state, commit, dispatch}, tool) {
      dispatch('closeColorPickers');

      if (state.tools.active !== tool) {
        dispatch('closeToolPanel');

        commit('SET_TOOL', { active: tool });
        dispatch('openToolPanel', tool);
      } else {
        // toggle tool panel active
        commit('SET_TOOL', {
          [tool]: { menuActive: !state.tools[tool].menuActive }
        });
      }

    },
    openToolPanel({state, commit}, tool) {
      if (typeof state.tools[state.tools.active].menuActive !== 'undefined') {
        commit('SET_TOOL', {
          [tool]: { menuActive: true }
        });
      }
    },
    closeToolPanel({state, commit}) {
      if (typeof state.tools[state.tools.active].menuActive !== 'undefined') {
        commit('SET_TOOL', {
          [state.tools.active]: { menuActive: false }
        });
      }
    },
    closeColorPickers({commit}) {
      commit('SET_COLOR_1', {  picker: false });
      commit('SET_COLOR_2', {  picker: false });
    }
  }
};
