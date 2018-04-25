const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});


const urlTitle = (title) => {
  return title.split(' ').join('_');
}

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
          return `/wiki/${this.getDataValue('urlTitle')}`;
        }
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'),
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
});

Page.hook('beforeValidate', (page) => {
  page.urlTitle = urlTitle(page.title);
})

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
    }
});


Page.belongsTo(User);

module.exports = {
    Page: Page,
    User: User,
    db: db
};
