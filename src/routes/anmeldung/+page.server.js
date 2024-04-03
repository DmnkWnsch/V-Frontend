// @ts-nocheck
import consts from "../../consts";

/** @type {import('./$types').PageServerLoad} */
// @ts-ignore
export async function load({params}) {   
        const ModulesReq = await fetch(consts.API_URL + "/modules" , {
                method: "GET",
                headers: { "Content-Type": "application/json",},});
        /*const courseOneModulesReq = await fetch(consts.API_URL + "courses/1/modules" , {
                method: "GET",
                headers: { "Content-Type": "application/json",},});                      
        const courseTwoModulesReq = await fetch(consts.API_URL + "courses/2/modules" , {
                method: "GET",
                headers: { "Content-Type": "application/json",},});
        const courseThreeModulesReq = await fetch(consts.API_URL + "courses/3/modules" , {
                method: "GET",
                headers: { "Content-Type": "application/json",},});
        const courseFourModulesReq = await fetch(consts.API_URL + "courses/4/modules" , {
                method: "GET",
                headers: { "Content-Type": "application/json",},});*/
        const ModulesRes = await ModulesReq.json();
        /*const courseOneModulesRes = await courseOneModulesReq.json();
        const courseTwoModulesRes = await courseTwoModulesReq.json();
        const courseThreeModulesRes = await courseThreeModulesReq.json();
        const courseFourModulesRes = await courseFourModulesReq.json();*/
        return {modules: ModulesRes,
                /*courseOneModules: courseOneModulesRes,
                courseTwoModules: courseTwoModulesRes,
                courseThreeModules: courseThreeModulesRes,
                courseFourModules: courseFourModulesRes,*/
                };
       
}