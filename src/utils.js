export function mockLogin(store) {
  store.dispatch('initialiseUser', {
    id: '0',
    name: 'John Smith',
    photoUrl: '',
  })
  store.dispatch('initialiseGroupList', {
    groups: [
      {
        id: '0',
        name: 'My First Group',
        photoUrl: '',
        events: [],
        members: [],
        owner: '0',
      },
    ],
  })
}
