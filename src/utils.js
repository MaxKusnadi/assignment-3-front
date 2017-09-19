export function mockLogin(store) {
  store.commit('setUser', {
    first_name: 'John',
    last_name: 'Smith',
    email: 'johnsmith@email.com',
    fb_id: 0,
  })
  store.commit('populateGroupList', {
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
