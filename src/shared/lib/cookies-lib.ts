'use server'
import { cookies } from 'next/headers'

export default async function cookiesLib(){
    const access_token = cookies().get('access_token')

return {
    isAuth:!!access_token
}
}