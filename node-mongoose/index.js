const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';

const connect = mongoose.connect(url, {
  useMongoClient: true
});

connect.then((db) => {
  console.log('Connected correctly to server');

  Dishes.create({
    name: 'Uthappizza',
    description: 'test'
  })
    .then((dish) => {
      console.log(dish);

      return Dishes.findByIdAndUpdate(dish._id, {
        $set: { description: 'Updated test' }
      }, {
          new: true
        })
        .exec();
    })
    .then((dish) => {
      console.log('******' + dish);

      dish.comments.push({
        rating: 5,
        comment: 'I\'m getting a sinking feeling!',
        author: 'Leonardo di Carpaccio'
      });
      console.log('****** push done' );

      return dish.save();
    })
    .then((dishes) => {
      console.log('***drop  success');
      console.log(dishes);

      return db.collection('dishes').drop();
    })
    .then(() => {
      return db.close();
    })
    .catch((err) => {
      console.log(err);
    });

});

