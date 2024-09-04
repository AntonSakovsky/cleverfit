export const LocalStorage = {
    get(key: string){
        return JSON.parse(localStorage.getItem(key) as string);
    },
    set(key:string, value: any){
        localStorage.setItem(key, JSON.stringify(value));  
    },
    remove(key: string){
        localStorage.removeItem(key);
    },
    
}