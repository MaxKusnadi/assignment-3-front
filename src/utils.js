import { API_PATH } from '@/constants'

export async function api(method = 'get', path, body, json = true) {
  const options = { method, credentials: 'include' }

  if (process.env.NODE_ENV !== 'production') {
    console.log(`${method.toUpperCase()} ${path} ${JSON.stringify(body)}`)
  }

  if (body != null) {
    if (method === 'get') {
      const params = Object.entries(body)
        .map(([key, val]) => [encodeURIComponent(key), encodeURIComponent(val)])
        .map(([key, val]) => `${key}=${val}`)
        .join('&')
      path += `?${params}`
    } else {
      options.headers = { 'Content-Type': 'application/json' }
      options.body = JSON.stringify(body)
    }
  }

  const res = await fetch(`${API_PATH}${path}`, options)

  if (!res.ok) {
    switch (res.status) {
      case 400:
        throw new Error(res.text)
      case 401:
        console.log('401: Unauthorized')
        break
      case 500:
        console.log('500: Internal Server Error')
        break
      default:
        throw new Error(res.statusText)
    }
  }

  if (json) {
    return res.json()
  }
}

export function mockLogin(store) {
  store.commit('setUser', {
    first_name: 'John',
    last_name: 'Smith',
    email: 'johnsmith@email.com',
    fb_id: 0,
  })
  store.commit('setGroupList', {
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
