import { createSessionClient } from "@/app/api/appwrite";
export const getCurrent = async () =>{
    try{
        const {account } =await createSessionClient();
        
        return await account.get();
    }catch {
        return null;
        
    }
}