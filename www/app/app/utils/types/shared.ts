export interface EntityEntry {
    name: string;
    path: string;
    description: string;
    properties: any[];
}

export interface EntityAttribute {
    name: string;
    default: any;
    type: any;
    required: boolean;
    description: string;
    allowedValues?: any[];

    parent: any;
    children?: any[];
    path: string;
    min: number;
    max: number;
}
export interface propertyDialog {
    open: boolean;
    property?: EntityAttribute | null;
    index: number | null;
    entity: EntityEntry | null;
}

export interface EntityDialog {
    open: boolean;
    entity?: EntityEntry | null;
    index: number | null;
}



export interface user {
    name: string;
    description: string;
    actions: action[];
}
export interface section {
    name: string;
    description: string;
}
export interface action {
    section: string;
    description: string;
}

export interface Project {
    name: string;
    description: string;
    _id?: string;
    Id: string;
    type: string;
    field: string;
    entities?: EntityEntry[];
    layouts?: any[];
    pages?: any[];
    menus?:any[];
    users?: user[];
    sections?: section[];
    agents?: Agent[];
}

export interface Agent {
    name: string;
    role: string;
    coreCompetencies: string;
    jobDescription: string;
    jobSamples: string;
    targetResource: string;
}

export interface Layout {
    name: string;
    description: string;
    sections: Component[];
    id?: string;
    icon?: string;
    class?: string;
}

export interface Component {
    id: string;
    class: string;
    type?: string;
    children?: Component[];
    component?: any;
}

export interface Page extends Component {
    name: string;
    path: string;
    reqiresAuth: Boolean,
    authorisedUsers: string[];
    layout: Layout;
}

export interface ListItem {
    label: string;
    path: string;
    icon: string;
    authorisedUsers: string[]
}

export interface Menu {
    name: string;
    description: string;
    listIems: ListItem[];
}