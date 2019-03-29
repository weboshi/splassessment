const db = require("../models");


const controller = {
  findId: (req, res) => {
    console.log(req)
    db.Jobs.findOne({
      where: {
        inactive: false,
        id: req.params.id,
      }
    })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err))
  },
  findAll: (req, res) => {
    db.Jobs.findAll({
        where: {
          inactive: false
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getBookmarks: (req, res) => {
    let bookmarks = req.query.bookmarks
    console.log(req.query.bookmarks)
    db.Jobs.findAll({
        where: {
          username: {
            [db.Sequelize.Op.or]: req.query.bookmarks
          },
        }
      })
      .then(bookmarks => res.send(bookmarks)
      )
      .catch(err => res.status(422).json(err));
  },
  getFollowPosts: (req, res) => {
    console.log(req.params)
    let bookmarks = req.query.bookmarks.split(",")

    console.log(bookmarks)
    db.Jobs.findAll({
        where: {
          username: {
            [db.Sequelize.Op.or]: bookmarks
          },
        }
      })
      .then(bookmarks => res.send(bookmarks)
      )
      .catch(err => res.status(422).json(err));
  },
    createJob: (req, res) => {
      console.log(req.body)
        db.Jobs.create({
            username: req.body.username,
            title: req.body.title,
            posting: req.body.posting,
          })
          .then(job => res.json(job))
          .catch(err => res.status(422).json(err));
    },
    getUserJobs: (req, res) => {
      console.log('hmm')
      console.log(req.params.username)
      db.Jobs.findAll({
        where: {
          username: req.params.username
        }
      })
      .then(job => {
        if(!job) {
          res.send("no user jobs found")
        }
        else {
          console.log(job)
          console.log("hm")
          const userJobs = job
          res.send(userJobs)
        }
      }).catch(res => console.log(res))
    },
    editUserjob: (req, res) => {
        db.Jobs.update({
            description: req.body.description,
            category: req.body.category,
            title: req.body.title,
          }, {
            where: {
              username: req.body.username,
              id: req.body.id
            }
          })    
          .then(user => res.status(200).send({
            "code": 200
            
           }))
           .catch(err => res.status(422).json(err));
         },
         remove: function(req, res) {
          db.Jobs.update({
              inactive: true
            }, {
              where: {
                username: req.params.username
              }
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
        }
    }


export { controller as default };