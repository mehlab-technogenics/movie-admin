import * as React from "react";

import { useState } from 'react'
import {  gql } from "@apollo/client";
import { Admin, Resource, ListGuesser } from 'react-admin';
import { client } from "./ApolloClient/client";
import { clientNode } from "./ApolloClient/clientNode";
import {MovieList,MovieEdit,MovieCreate,MovieShow} from './components/movies'
import {PersonList,PersonEdit,PersonCreate} from './components/persons'
import jsonServerProvider from 'ra-data-json-server';
import { PostList, PostEdit, PostCreate, PostIcon } from './posts';
import {authProvider} from './authProvider';

import { defaultTheme } from "react-admin";
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    ...defaultTheme,
    sidebar: {
        width: 300, // The default value is 240
        closedWidth: 70, // The default value is 55
    },
});



const dataProvider = {
    getList: async (resource, params) => {
        let data=[];
        let temp=[];
        let headers=null;
        //console.log(resource)
      switch (resource) {
        case 'movies':{
          let filter=""
          console.log(params,'getList')
          if(params.filter['title_contains']) {
           filter=params.filter['title_contains']
           console.log('filter')
          }
          else {
            filter=""
            console.log('free')
          }
        const response= await clientNode.query({
          query: gql`query {
            movies(where: { title_CONTAINS: "${filter}" }) {
              title
              tagline
              released
              actors {
                name
                born
              }
              directors {
                name
                born
              }
            }
          }
          `
        })
          .then(result => {console.log(result.data,'Hi')
        data=result.data.movies;
        temp=data.map(record => ({ id: record.title, tagline:record.tagline,title:record.title,released:record.released,actors:record.actors,directors:record.directors,producers:record.producers }))
        console.log(temp,'Temp List')
      });
        
          return {
            data:temp ,
             total: 1,
          };
        };
        case 'persons':{
            let requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"query":"{people{name,born}}"})
            };
            const response =await fetch('http://localhost:5000', requestOptions)
                .then(response =>
                    response.json())
                .then(data1 => {
                    console.log(data1)
                data=data1.data.people
                headers=data1.headers
                console.log(headers,'Bye')
                console.log(data,'Hi')});
            
              return {
                data: data.map(record => ({ id: record.name, name:record.name,born:record.born ,actors:record.actors,directors:record.directors})),
                total: 1,
              };
            };
        default:
          return {
            data: [],
            total: 0,
          };
      }
    },
    update: async (resource, params) => {
      let data=null;
        let headers=null;
        console.log(resource)
      switch (resource) {
        case 'movies':{
          let temp=params.data.actors
          let ac=temp.map(record => (`{name:"${record.name}"}`))
              temp=params.data.directors
          let dr=temp.map(record => (`{name:"${record.name}"}`))
              temp=params.data.writers
          let wr=temp.map(record => (`{name:"${record.name}"}`))
               temp=params.data.producers
          let pr=temp.map(record => (`{name:"${record.name}"}`))
          console.log(typeof(ac))
          const query=`mutation{
            updateMovie(input:{title:"${params.data.title}",
              released:${params.data.released},tagline:"${params.data.tagline}"},actors:[${ac}],writers:[${wr}],producers:[${pr}],directors:[${dr}]) {
              movie {
                title
                tagline
                released
              }
            }
          }`
          console.log(query)
          //////////////
          
          ////////////////////////////////
          const updateMovie = await client.mutate({
              mutation: gql(query)}).then(result => {console.log(result.data.updateMovie.movie)
            data={id:result.data.updateMovie.movie.title, title:result.data.updateMovie.movie.title,tagline:result.data.updateMovie.movie.tagline, released:result.data.updateMovie.movie.released}
            });
            
            const updateConnection = await client.mutate
            console.log(updateMovie,'HHHH')
            return {
              data: data,
              total: 1,
            };
        };
        case 'persons':{
          console.log(params)
          //////////////
          
          ////////////////////////////////
          const updatePerson = await client.mutate({
              mutation: gql`mutation{
                updatePerson(input:{name:"${params.data.name}",
                  born:${params.data.born}}) {
                  person {
                    name
                    born
                  }
                }
              }`
            }).then(result => {console.log(result.data.updatePerson.person)
            data={id:result.data.updatePerson.person.name, name:result.data.updatePerson.person.name,born:result.data.updatePerson.person.born}
            });
            return {
              data: data,
              total: 1,
            };
        };
        default:
          return {
            data: null,
            total: 0,
          };
      }
    },
    create: async (resource, params) => {
      let data=null;
        let headers=null;
        console.log(resource)
      switch (resource) {
        case 'movies':{
          console.log(params)
          //////////////
          
          ////////////////////////////////
          const createMovie = await client.mutate({
              mutation: gql`mutation{
                createMovie(input:{title:"${params.data.title}",
                  released:${params.data.released},tagline:"${params.data.tagline}"}) {
                  movie {
                    title
                    tagline
                    released
                  }
                }
              }`
            }).then(result => {console.log(result.data.createMovie.movie)
            data={id:result.data.createMovie.movie.title, title:result.data.createMovie.movie.title,tagline:result.data.createMovie.movie.tagline, released:result.data.createMovie.movie.released}
            });
            console.log(createMovie,'HHHH')
            return {
              data: data,
              total: 1,
            };
        };
        case 'persons':{
          console.log(params)
          //////////////
          
          ////////////////////////////////
          const createPerson = await client.mutate({
              mutation: gql`mutation{
                createPerson(input:{name:"${params.data.name}",
                  born:${params.data.born}}) {
                  person {
                    name
                    born
                  }
                }
              }`
            }).then(result => {console.log(result.data.createPerson.person)
            data={id:result.data.createPerson.person.name, name:result.data.createPerson.person.name,born:result.data.createPerson.person.born}
            });
            return {
              data: data,
              total: 1,
            };
        };
        default:
          return {
            data: null,
            total: 0,
          };
      }
    },
    getOne: async (resource, params) => {
      let data=null;
      let headers=null;
      let actors=[];
      //console.log(resource)
    switch (resource) {
      case 'movies':{
        let filter=""
        console.log(params,'getOne')
      const response= await clientNode.query({
        query: gql`query {
          movies(where: { title: "${params.id}" }) {
            title
            tagline
            released
            actors {
              name
              born
            }
            actorsConnection {
      edges {
        roles
      }
    }
    directors {
      name
      born
    }
    writers {
      name
      born
    }
    producers {
      name
      born
    }
    reviews {
      name
      born
    }
    reviewsConnection {
      edges {
        rating
        summary
      }
    }
          }
        }
        `
      })
        .then(result => {console.log(result.data.movies[0],'Hi')
      data=result.data.movies[0];
    });
      
        return {
          data: { id: data.title, tagline:data.tagline,title:data.title,released:data.released,actors:data.actors,directors:data.directors,producers:data.producers,writers:data.writers },
          total: 1,
        };
      };
      default:
          return {
            data: null,
            total: 0,
          };
    }
    }
}



const App = () => (
    <Admin  theme={theme} dataProvider={dataProvider} authProvider={authProvider}>
      
        <Resource name="movies" list={MovieList} edit={MovieEdit} create={MovieCreate} show={MovieShow}/>
        <Resource name="persons" list={PersonList} edit={PersonEdit} create={PersonCreate} />
  
    </Admin>
);




export default App;

