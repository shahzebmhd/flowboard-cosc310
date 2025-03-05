import { AppType } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";

type ClientType = ReturnType<typeof hc<AppType>>;

export const client: ClientType = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);