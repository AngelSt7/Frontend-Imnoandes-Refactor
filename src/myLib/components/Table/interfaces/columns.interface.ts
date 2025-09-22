export type ColumnsType = ({
    name: string;
    uid: string;
    sortable: boolean;
} | {
    name: string;
    uid: string;
    sortable?: undefined;
})[]