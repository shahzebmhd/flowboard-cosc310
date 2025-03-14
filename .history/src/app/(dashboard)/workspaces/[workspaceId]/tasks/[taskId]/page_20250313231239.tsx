import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/queries";

const TaskIdPage = async () => {
    const user = await getCurrent();
    if(!user) redirect("/sign-in");

    return (
        <div>
            Task ID
        </div>
    );
};

export default TaskIdPage;