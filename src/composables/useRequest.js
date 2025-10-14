import useToken from "~/composables/useToken";


const $api = {
  async get(url, __ = {showSuccess: false, showError: false, successMessage: 'Success', errorMessage: ''}) { /// Performs GET request ...
    const config = useRuntimeConfig()
    const {data, pending, error, refresh} = await useFetch(url, {
      baseURL: config.public.apiBaseUrl, // Set the api base url from .env ...
      onRequest({request, options}) {
        // Set the request headers
        options.headers = options.headers || {}
        const token = useToken()
        if (token) options.headers.Authorization = `Bearer ${token}`
        options.headers.Accept = 'application/json' // Proper case per Fetch
      },
      onRequestError({request, options, error}) {
        // Handle the request errors
      },
      onResponse({request, response, options}) {
        // Process the response data
        if (response.status === 200 && __.showSuccess) dispatchSuccess(__.successMessage || 'Success!') // Success Message ...
        return response._data
      },
      onResponseError({request, response, options}) {
        // Handle the response errors
        if (__.showError) dispatchError(response, __.errorMessage) // Show Error Toast ...
      }
    })
    return {data, pending, refresh, error}
  },
  async post(url, payload, __ = {showSuccess: true, showError: true, successMessage: 'Success', errorMessage: ''}) { /// Performs POST and PUT request ...
    const config = useRuntimeConfig()
    const {data, pending, error, refresh} = await useFetch(url, {
      baseURL: config.public.apiBaseUrl, // Set the api base url from .env ...
      onRequest({request, options}) {
        // Set the request headers
        options.body = payload
        options.method = 'POST'
        options.headers = options.headers || {}
        const token = useToken()
        if (token) options.headers.Authorization = `Bearer ${token}`
        // Content-Type should be set only for JSON; for FormData, let browser set boundary
        if (payload && !(payload instanceof FormData)) {
          options.headers['Content-Type'] = 'application/json'
          options.body = typeof payload === 'string' ? payload : JSON.stringify(payload)
        }
        options.headers.Accept = 'application/json'
      },
      onRequestError({request, options, error}) {

        // Handle the request errors
      },
      onResponse({request, response, options}) {
        // Process the response data
        if (response.status === 200 && __.showSuccess) dispatchSuccess(__.successMessage || 'Success!') // Success Message ...
        return response._data
      },
      onResponseError({request, response, options}) {
        // Handle the response errors
        if (__.showError) dispatchError(response, __.errorMessage) // Show Error Toast ...
      }
    })
    return {data, pending, error, refresh}
  },
  async delete(url, __ = {showSuccess: true, showError: true, successMessage: 'Success', errorMessage: ''}) { /// Performs DELETE request ...
    const config = useRuntimeConfig()
    const {data, pending, error, refresh} = await useFetch(url, {
      baseURL: config.public.apiBaseUrl, // Set the api base url from .env ...
      onRequest({request, options}) {
        // Set the request headers
        options.method = 'DELETE'
        options.headers = options.headers || {}
        const token = useToken()
        if (token) options.headers.Authorization = `Bearer ${token}`
        options.headers.Accept = 'application/json'
      },
      onRequestError({request, options, error}) {
        // Handle the request errors
      },
      onResponse({request, response, options}) {
        // Process the response data
        if (response.status === 200 && __.showSuccess) dispatchSuccess(__.successMessage || 'Success!') // Success Message ...
        return response._data
      },
      onResponseError({request, response, options}) {
        // Handle the response errors
        if (__.showError) dispatchError(response, __.errorMessage) // Show Error Toast ...
      }
    })
    return {data, pending, error, refresh}
  },
  

}


const dispatchSuccess = (message) => {
  if (process.server) return //
  const {$awn} = useNuxtApp()
  $awn.success(message) // Toast ...
}

const dispatchError = (err, errorMessage) => {
  if (process.server) return
  let error = err._data ? err._data : err
  let message = ''

  if ([401, 403, 422, 500, 429].includes(err.status)) {
    message = err?.statusText + '! ' + error?.message
  } else if (err.status === 419) {
    message = 'CORES Error! ' + error?.message
  } else {
    message = errorMessage || 'Some Error Occurred!'
  }

  const {$awn} = useNuxtApp()
  $awn.alert(message) /// Toast ...
}


export default $api
