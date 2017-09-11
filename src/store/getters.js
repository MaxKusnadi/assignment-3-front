export const activeGroup = state =>
  Object.values(state.groups).find(group => group.id === state.activeGroupId)
