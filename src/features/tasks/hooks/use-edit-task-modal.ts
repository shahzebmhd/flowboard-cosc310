import { useQueryState, parseAsString } from "nuqs";

export const useEditTaskModal = () => {
  const [taskId, setTaskId] = useQueryState("edit-task", parseAsString);

  const open = (id: string) => setTaskId(id); // ✅ Pass the actual task ID, not `true`
  const close = () => setTaskId(null);        // ✅ Correct syntax

  return {
    taskId,
    open,
    close,
    setTaskId,
  };
};
