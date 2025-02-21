

import { Button } from "@/components/ui/button";



// TOOD: insert this, timestamp: 6:59:50
{field.value ? (
<Button
type = "button"
disabled={isPending}
variant="descrutive"
size="xs"
className="w-fit mt-2"
onClick={() => {
    field.onChange(null);
    if (inputRef.current) {
        inputRef.current.value = "";
    }
}}
>
RemoveImage
</Button>

)
: 
(
    <Button
type = "button"
disabled={isPending}
variant="tertiary"
size="xs"
className="w-fit mt-2"
onClick={() => inputRef.current?.click()}
>
UploadImage
</Button>
)
}