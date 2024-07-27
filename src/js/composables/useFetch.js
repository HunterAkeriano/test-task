export async function useFetch(api, method = 'GET', params = null, body = null) {
   const url = 'https://veryfast.io/t/' + api
   const fullUrl = method === 'GET' && params ? `${url}?${new URLSearchParams(params)}` : url
   const options = {
      method,
      body: body ? JSON.stringify(body) : null
   }
   const response = await fetch(fullUrl, options)

   return await response.json()
}
