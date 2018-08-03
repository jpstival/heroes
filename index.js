"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
const Hapi = require("hapi");
const Joi = require("joi");
const Sequelize = require("sequelize");
// import * as dotenv from "dotenv/config";
var dotenv = require("dotenv/config");
const Inert = require("inert");
const Vision = require("vision");
const HapiSwagger = require("hapi-swagger");
const server = new Hapi.Server();
const port = process.env.PORT || 3000;
server.connection({
  port,
  routes: {
    cors: true
  }
});

(async () => {
  if (!process.env.POSTGRES_HOST) {
    throw Error("process.env.POSTGRES_HOST must be a: user:pass@ipService:port ");
  }
  const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_HOST}/heroes`);
  await sequelize.authenticate();
  console.log("postgres is running");

  const Hero = sequelize.define("heroes", {
    name: Sequelize.STRING,
    nameheroe: Sequelize.STRING,
    editora: Sequelize.STRING,
  }, {
    freezeTableName: true
  });
  const Power = sequelize.define("powers", {
    name: Sequelize.STRING,
    power: Sequelize.STRING,
  }, {
    freezeTableName: true
  });

  const User = sequelize.define("users", {
    name: Sequelize.STRING,
    password: Sequelize.STRING,
  }, {
    freezeTableName: true
  });


  Hero.belongsTo(User, {
    foreignKey: {
      name: 'fk_user',
      allowNull: false
    }
  });
  Power.belongsTo(Hero, {
    foreignKey: {
      name: 'fk_hero',
      allowNull: false
    }
  });


  await sequelize.sync({
    force: false
  });

  await server.register([
    Inert,
    Vision,
    {
      register: HapiSwagger,
      options: {
        info: {
          title: "Node.js with Postgres Example - Erick Wendel",
          version: "1.0",
        }
      },
    },
  ]);
  server.route([{
      method: "GET",
      path: "/users",
      config: {
        handler: (req, reply) => {
          return reply(User.findAll());
        },
        description: "List All users",
        notes: "users from database",
        tags: ["api"],
      },
    },
    {
      method: "GET",
      path: "/users/{name}",
      config: {
        handler: (req, reply) => {


          User.findOne({
            where: {
              name: req.params.name
            }
          }).then(function (user) {
            reply( user ?  {user, success : true}  : {success : false});           
          });
          
        },
        description: "List apenas 1 usuario",
        notes: "users from database",
        tags: ["api"],
        validate: {
          params: {
            name: Joi.string().required(),
          }
        }
      },
    },
    {
      method: "POST",
      path: "/users",
      config: {
        handler: (req, reply) => {
          const {
            payload
          } = req;
          return reply(User.create(payload));
        },
        description: "Create a user",
        notes: "create a user",
        tags: ["api"],
        validate: {
          payload: {
            name: Joi.string().required(),
            password: Joi.string().required(),
          },
        },
      },
    },
    {
      method: "PUT",
      path: "/users/{id}",
      config: {
        handler: (req, reply) => {
          const {
            payload
          } = req;
          return reply(User.update(payload, {
            where: {
              id: req.params.id
            }
          }));
        },
        description: "Update a user",
        notes: "Update a user",
        tags: ["api"],
        validate: {
          params: {
            id: Joi.string().required(),
          },
          payload: {
            name: Joi.string().required(),
            password: Joi.string().required(),
          }
        },
      },
    },
    {
      method: "DELETE",
      path: "/users/{id}",
      config: {
        handler: (req, reply) => {
          return reply(User.destroy({
            where: {
              id: req.params.id
            }
          }));
        },
        description: "Delete a user",
        notes: "Delete a user",
        tags: ["api"],
        validate: {
          params: {
            id: Joi.string().required(),
          },
        },
      },
    },

    {
      method: "GET",
      path: "/powers",
      config: {
        handler: (req, reply) => {
          return reply(Power.findAll());
        },
        description: "List All powers",
        notes: "powers from database",
        tags: ["api"],
      },
    },
    {
      method: "POST",
      path: "/powers",
      config: {
        handler: (req, reply) => {
          const {
            payload
          } = req;
          return reply(Power.create(payload));
        },
        description: "Create a power",
        notes: "teste a power",
        tags: ["api"],
        validate: {
          payload: {
            name: Joi.string().required(),
            power: Joi.string().required(),
            fk_hero: Joi.number().required()
          },
        },
      },
    },
    {
      method: "PUT",
      path: "/powers/{id}",
      config: {
        handler: (req, reply) => {
          const {
            payload
          } = req;
          console.log(payload);
          return reply(Power.update(payload, {
            where: {
              id: req.params.id
            }
          }));
        },
        description: "Update a power",
        notes: "Update a power",
        tags: ["api"],
        validate: {
          params: {
            id: Joi.string().required(),
          },
          payload: {
            name: Joi.string().required(),
            power: Joi.string().required(),
          }
        },
      },
    },
    {
      method: "DELETE",
      path: "/powers/{id}",
      config: {
        handler: (req, reply) => {
          return reply(Power.destroy({
            where: {
              id: req.params.id
            }
          }));
        },
        description: "Delete a power",
        notes: "Delete a power",
        tags: ["api"],
        validate: {
          params: {
            id: Joi.string().required(),
          },
        },
      },
    },

    {
      method: "GET",
      path: "/heroes",
      config: {
        handler: (req, reply) => {
          return reply(Hero.findAll());
        },
        description: "List All heroes",
        notes: "heroes from database",
        tags: ["api"],
      },
    },
    {
      method: "GET",
      path: "/heroes/{id}",
      config: {
        handler: (req, reply) => {
          return reply(Hero.findAll({
            where: {
              fk_user: req.params.id
            }
          }) || {
            success: false
          });
        },
        description: "List apenas 1 usuario",
        notes: "users from database",
        tags: ["api"],
        validate: {
          params: {
            id: Joi.number().required(),
          }
        }
      },
    },
    {
      method: "POST",
      path: "/heroes",
      config: {
        handler: (req, reply) => {
          const {
            payload
          } = req;
          return reply(Hero.create(payload));
        },
        description: "Create a hero",
        notes: "teste a hero",
        tags: ["api"],
        validate: {
          payload: {
            name: Joi.string().required(),
            nameheroe: Joi.string().required(),
            editora: Joi.string().required(),
            fk_user: Joi.number().required()
          },
        },
      },
    },
    {
      method: "PUT",
      path: "/heroes/{id}",
      config: {
        handler: (req, reply) => {
          const {
            payload
          } = req;
          console.log(payload);
          return reply(Hero.update(payload, {
            where: {
              id: req.params.id
            }
          }));
        },
        description: "Update a hero",
        notes: "Update a hero",
        tags: ["api"],
        validate: {
          params: {
            id: Joi.string().required(),
          },
          payload: {
            name: Joi.string().required(),
            nameheroe: Joi.string().required(),
            editora: Joi.string().required(),
          }
        },
      },
    },
    {
      method: "DELETE",
      path: "/heroes/{id}",
      config: {
        handler: (req, reply) => {
          return reply(Hero.destroy({
            where: {
              id: req.params.id
            }
          }));
        },
        description: "Delete a hero",
        notes: "Delete a hero",
        tags: ["api"],
        validate: {
          params: {
            id: Joi.string().required(),
          },
        },
      },
    },
  ]);
  await server.start();
  console.log("server running at", server.info.port);
})();
