
export const inputComponent = { type: "input", label: "Input" };
export const textareaComponent = { type: "textarea", label: "Textarea" };
export const selectComponent = { type: "select", label: "Select" };
export const checkboxComponent = { type: "checkbox", label: "Checkbox" };
export const radioComponent = { type: "radio", label: "Radio" };
export const dateComponent = { type: "date", label: "Date" };
export const timeComponent = { type: "time", label: "Time" };
export const datetimeComponent = { type: "datetime", label: "Datetime" };
export const fileComponent = { type: "file", label: "File" };
export const passwordComponent = { type: "password", label: "Password" };
export const mediaComponent = { type: "media", label: "Media" };
export const richtextComponent = { type: "richtext", label: "RichText" };

// SPECIALtYPES


export const refSelect = { type: "refListSelect", label: "materialListSelect" }; // select component with multiple
export const mapComponent = { type: "map", label: "Map Input" }; // key-value map input
export const refListSelectWithCreate = { type: "refListSelectWithCreate", label: "List Select with Create" }; // enhanced list selector with create capability



export const baseComponents = [
    inputComponent,
    textareaComponent,
    selectComponent,
    checkboxComponent,
    radioComponent,
    dateComponent,
    timeComponent,
    datetimeComponent,
    fileComponent,
    passwordComponent,
    mediaComponent,
    richtextComponent,
    mapComponent
];

export const RefComponents = [
    refSelect,
    refListSelectWithCreate,
];

export const SpecialComponents = [
    mapComponent,
];
