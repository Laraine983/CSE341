const graphql = require('graphql')
const {
GraphQLObjectType,
GraphQLSchema,
} = graphql
const TodoType = new GraphQLObjectType({
    
name: 'Todo',
fields: () => ({
id: { type: GraphQLID},
taskName: { type: GraphQLString },
completed: { type: GraphQLBoolean },
})
})
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
     /* this will be the type of Root Query*/
    }
    })
module.exports = new GraphQLSchema({
query: RootQuery
})


   