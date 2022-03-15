import React from 'react';
import {
    Edit,
    List,
    Show,
    Create,
    ChipField,
    Datagrid,
    DisabledInput,
    EditButton,
    ReferenceManyField,
    ReferenceField,
    ShowButton,
    SimpleForm,
    SingleFieldList,
    TextField,
    TextInput,
    Filter,
    ReferenceInput,
    ReferenceArrayInput,
    SelectArrayInput,
    SelectInput,
    ArrayField,
    NumberInput,
  } from 'react-admin';


export const PersonList = props => (
    <List  {...props}>
      <Datagrid>
        <TextField source="name" />
        <TextField source="born" />
        <EditButton basePath="/persons" />
      </Datagrid>
    </List>
  );

  const PersonName = ({ record }) => {
    return <span>Movie {record ? `"${record.title}Haha"` : ''}</span>;
};
  export const PersonEdit = (props) => (
    <Edit title={<PersonName />} {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <NumberInput label="Born" source="born" />
        </SimpleForm>
    </Edit>
    
);
export const PersonCreate = (props) => (
  <Create title={<PersonName />} {...props}>
      <SimpleForm>
          <TextInput source="name" />
          <NumberInput label="Born" source="born" />
      </SimpleForm>
  </Create>
  
);