interface Label {
    text: string;
}

export interface Account {
    label: Label[];
    recordType: string;
    login: 'Локальная' | 'LDAP';
    password: string | null;
}