export const activeGroup = state => id =>
  Object.values(state.groups).find(group => group.id === id)
