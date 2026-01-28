export type LogRecentActivityResponse =  {
    id: string;
    entity_type?: string;
    entity_id?: string;
    action?: string;
    changed_at?: string;
    adminEmail?: string;
    changeDetail?: string;
}[];