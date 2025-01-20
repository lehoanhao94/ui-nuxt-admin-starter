import type { EventHandler, EventHandlerRequest } from 'h3'

export const defineWrappedResponseHandler = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    try {
      // do something before the route handler
      const runtimeConfig = useRuntimeConfig()
      const { delay } = runtimeConfig.mockApi || {}
      if (delay) {
        await new Promise(resolve => setTimeout(resolve, delay || 0))
      }
      const response = await handler(event)
      // do something after the route handler
      return response
    } catch (err) {
      console.log('🚀 ~ defineEventHandler<T> ~ err:', err)
      // Error handling
      return { err }
    }
  })
