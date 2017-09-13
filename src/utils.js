export function mockLogin(store) {
  store.dispatch('initialiseUser', {
    id: '0',
    name: 'John Smith',
    photoUrl: '',
  })
  store.dispatch('initialiseGroupList', {
    groups: [
      {
        id: 'a',
        name: 'My First Group',
        photoUrl: '',
        events: [],
        members: [],
        owner: '0',
      },
    ],
  })
}
