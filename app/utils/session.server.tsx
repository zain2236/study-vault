

import { createCookieSessionStorage, redirect } from "react-router";


const authSession = createCookieSessionStorage({
    cookie : {
        name : "auth_session" , 
        path : "/" ,
        sameSite : "lax" ,
        httpOnly : true ,
        secure : true,
        secrets : [process.env.SESSION_SECRET as string] ,
        maxAge : 60 * 60 * 24 * 30 , // 30 days
    }
})

export async function createLoginSession(userId : any , redirectTO : any) {

    // Get a empty session 
    const session = await authSession.getSession() 
    session.set('userId' , userId) 

    return redirect (redirectTO , {
        headers : {
            "Set-Cookie" : await authSession.commitSession(session)
        }
    })
}