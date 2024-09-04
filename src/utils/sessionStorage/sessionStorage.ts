export const SessionStorage = {
    get(key: string){
        return JSON.parse(sessionStorage.getItem(key) as string);
    },
    set(key:string, value: any){
        sessionStorage.setItem(key, JSON.stringify(value));  
    },
    remove(key: string){
        sessionStorage.removeItem(key);
    },
    
}