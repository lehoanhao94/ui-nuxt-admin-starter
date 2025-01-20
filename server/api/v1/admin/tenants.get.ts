import { fakerJA as faker } from '@faker-js/faker'
import { defineWrappedResponseHandler } from '../../utils/handler'

export default defineWrappedResponseHandler(async () => {
  const data = []
  // for from 1 to 10
  for (let i = 1; i <= 10; i++) {
    data.push({
      tenant_id: faker.location.city(),
      tenant_name: faker.location.city(),
      uuid: faker.string.uuid(),
      id: i,
      index_name: faker.string.octal(),
      avatar: faker.image.avatar()
    })
  }
  // return data
  return {
    tenants: data
  }
})
