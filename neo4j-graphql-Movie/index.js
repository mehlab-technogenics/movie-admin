const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer, gql } = require("apollo-server");
const neo4j = require("neo4j-driver");

const typeDefs = gql`
    type Movie {
        title: String
        tagline:String
        released:Int
        actors: [Person!]! @relationship(type: "ACTED_IN", direction: IN, properties: "ActedIn")
        directors: [Person!]! @relationship(type: "DIRECTED", direction: IN)
        writers: [Person!]! @relationship(type: "WROTE", direction: IN)
        producers: [Person!]! @relationship(type: "PRODUCED", direction: IN)
        reviews: [Person!]! @relationship(type: "REVIEWED", direction: IN,properties: "Reviewed")
    }

    type Person {
        name: String
        born: Int
        actors: [Movie!]! @relationship(type: "ACTED_IN", direction: OUT, properties: "ActedIn")
        directors: [Movie!]! @relationship(type: "DIRECTED", direction: OUT)
        writers: [Movie!]! @relationship(type: "WROTE", direction: OUT)
        producers: [Movie!]! @relationship(type: "PRODUCED", direction: OUT)
        reviews: [Movie!]! @relationship(type: "REVIEWED", direction: OUT,properties: "Reviewed")
    }
    interface Reviewed @relationshipProperties {
    rating: Int
    summary:String
	}
	interface ActedIn @relationshipProperties {
    roles: [String]
}
`;
const {schema} = new Neo4jGraphQL({typeDefs});
const driver = neo4j.driver(
    "bolt://localhost:7687",
    neo4j.auth.basic("neo4j", "neo4j")
);

const server = new ApolloServer({
  schema: schema,
  context: {driver}
});

server.listen(process.env.PORT || 5000).then(({url}) => {
  console.log(`🚀 Knowledgebase API ready at ${url}`);
});
