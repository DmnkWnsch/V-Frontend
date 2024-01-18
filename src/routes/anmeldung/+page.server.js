// @ts-nocheck
import consts from "../../consts";

/** @type {import('./$types').PageServerLoad} */
// @ts-ignore
export async function load({params}) {   
     const modulesReq = await fetch(consts.API_URL + "/modules" , {
        method: "GET",
        headers: { "Content-Type": "application/json",},});
        const modulesRes = await modulesReq.json();
        return {modules: modulesRes,};
       
}