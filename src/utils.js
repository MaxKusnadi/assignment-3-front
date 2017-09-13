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
        events: [
          {
            name: 'Training',
            dateTime: 1505591445276,
          },
          {
            name: 'Training',
            dateTime: 1505291445276,
          },
          {
            name: 'Training',
            dateTime: 1505391445276,
          },
          {
            name: 'Another Training',
            dateTime: 1505091445276,
          },
        ],
        members: [],
        owner: '0',
      },
    ],
  })
}
