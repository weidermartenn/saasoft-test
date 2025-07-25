export interface Label {
    text: string;
}

export interface Account {
    label: Label[];
    recordType: 'Локальная' | 'LDAP';
    login: string;
    password: string | null;
}