
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      // Add current userId
      context => {
        context.data.from = context.params.user._id
        return context
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
