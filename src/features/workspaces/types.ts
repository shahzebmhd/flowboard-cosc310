import {Models} from "node-appwrite";

export type Workspace = Models.Document & {
    name : stringl 
    imageUrl: string;
    inviteCode: string;
    userId: string;
};