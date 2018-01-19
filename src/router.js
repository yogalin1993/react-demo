{
  path: 'detail/:id',
  key: 50003,
  onEnter: checkRole,
  getComponent (nextState, cb) {
    require.ensure([], require => {
      registerModel(app, require('./models/inventory/detail'))
      cb(null, require('./routes/inventory/detail'))
    }, 'inventory')
  },
},