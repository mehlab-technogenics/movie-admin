import React from 'react';

import {
    Edit,
    List,
    DateInput,
    Show,
    Create,
    ChipField,
    Datagrid,
    DisabledInput,
    EditButton,
    NumberField,
    ReferenceManyField,
    ReferenceField,
    ShowButton,
    SimpleForm,
    SingleFieldList,
    TextField,
    NumberInput,
    TextInput,
    Filter,
    ReferenceInput,
    ReferenceArrayInput,
    SelectArrayInput,
    SelectInput,
    initialValue,
    ArrayField,
    RichTextField,
    Default,
    TabbedForm, FormTab,
    SimpleShowLayout,
    SimpleFormIterator,
    ArrayInput,
    
  } from 'react-admin';


export const MovieList = props => (
    <List filters={<MovieFilter />}  {...props}>
      <Datagrid>
        <TextField source="title" />
        <TextField source="tagline" />
        <NumberField source="released" />
        <EditButton basePath="/movies" />
        <ShowButton  basePath="/movies"/>
      </Datagrid>
    </List>
  );

  export const MovieShow = (props) => (
    <Show title={<MovieTitle />} {...props}>
        <SimpleShowLayout>
            <TextField source="title" />
            <RichTextField source="tagline" />
            <TextField source="released" />
            <ArrayField source="actors">
              <Datagrid >
                  <TextField source="name" />
                  <TextField source="born" />
              </Datagrid>
            </ArrayField>
            <ArrayField source="directors">
              <Datagrid >
                  <TextField source="name" />
                  <TextField source="born" />
              </Datagrid>
            </ArrayField>
            <ArrayField source="producers">
              <Datagrid >
                  <TextField source="name" />
                  <TextField source="born" />
              </Datagrid>
            </ArrayField>
            <ArrayField source="writers">
              <Datagrid >
                  <TextField source="name" />
                  <TextField source="born" />
              </Datagrid>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
);
  export const MovieFilter = props => (
    <Filter {...props}>
      <TextInput label="Search by title" source="title_contains" alwaysOn />
    </Filter>
  );
  const MovieTitle = ({ record }) => {
    return <span>Movie {record ? `${record.title}` : ''}</span>;
};
  export const MovieEdit = (props) => (
    <Edit title={<MovieTitle />} {...props}>
        <TabbedForm >
          <FormTab label="summary">
            <TextInput source="title" />
            <TextInput source="tagline" options={{ multiline: true }} />
            <NumberInput label="Release date" source="released" />
          </FormTab>
          <FormTab label="cast">
          <ArrayInput source="actors">
            <SimpleFormIterator source="actors" disableRemove>
                <TextInput source="name" label="Name"/>
           
            </SimpleFormIterator>
          </ArrayInput>
          <ArrayInput source="directors">
            <SimpleFormIterator disableRemove>
                <TextInput  source="name" label="Name"/>
              
            </SimpleFormIterator>
          </ArrayInput>
          <ArrayInput source="producers">
            <SimpleFormIterator disableRemove>
                <TextInput  source="name" label="Name"/>
            
            </SimpleFormIterator>
          </ArrayInput>
          <ArrayInput source="writers">
            <SimpleFormIterator disableRemove>
                <TextInput  source="name" label="Name"/>
              
            </SimpleFormIterator>
          </ArrayInput>

          </FormTab>
        </TabbedForm>
    </Edit>
);
  export const MovieCreate = props => (
    <Create title="Create a Post" {...props}>
    <SimpleForm>
    <TextInput source="title" />
    <TextInput source="tagline" options={{ multiline: true }} />
    <NumberInput label="Release date" source="released" initialValue="2000"/>
    </SimpleForm>
</Create>
  );