
export type crudConnection = {
    model: string,
    resource: any,
    action: "create" | "read" | "update" | "delete",
    fields: any,
}

export type crudConnectionApi = {
    results: any,
    loading: boolean,
    failed: any,
    load: (props: crudConnection) => Promise<any>
}