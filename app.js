

//connection to Data Base
const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/mongoose', {useNewUrlParser: true, useUnifiedTopology: true});


//Create a person
const PersonSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
        },

    age : Number,
    
    favoriteFoods : [String]
  });

//Creating a model and Save
  const Person = mongoose.model('Person', PersonSchema);

const p = new Person;
p.name = "Mohamed";
p.age = 27;
p.favoriteFoods = ["spaghetti", "pizza"];

const createAndSavePerson = (done)=>{
  p.save((err, data)=>{
    if (err){
      return done(err);
    }
    return done(null, data);
  });
};


//Create Many Records

const createManyPerson = (done) => {
    const arrayOfPerson = [
        { name: 'Haithem', age: 18, favoriteFoods: ['Fettuccine Alfredo', 'Sushi', 'Quiche'] },
        { name: 'Arafet', age: 24, favoriteFoods: ['Pasta', 'Cheeseburgers', 'French Fries'] },
      ];
    Person.create(arrayOfPerson, (err, data) => {
      if (err) {
        done(err);
      }
        done(null, data);
    });
    
};

//Use model.find() to Search Your Database

Person.find({} , (error , resualt)=>{
    if(error){
      console.log(error)
    }
    console.log(resualt)
    
  })


//Use model.findOne()
Person.findOne({favoriteFoods : { "$in": ['Pasta']}}, function(err,obj) { console.log(obj); });

//Use model.findById()

const findPersonById = (personId, done) => {
    Person.findById(Person.personId, (err, data) => err ? done(err) : done(null, data)); 
  };


//Perform Classic Updates by Running Find, Edit, then Save

const findEditThenSave = function(personId, done) {
    const foodToAdd = 'hamburger';
    Person.findById(personId, function(err, data) {
      this.favoriteFoods.push(foodToAdd).save();
      if (err) {
        return done(err);
      }
      else {
        done(null, data);
      }
    });
  };

//Using model.findOneAndUpdate()

Person.findOneAndUpdate({name : personName}, {$set : {age : 20}}, { new : true }, ( err , doc ) => {
    if (err) {
        console.log(err);
    }

    console.log(doc);
});


//Using model.findByIdAndRemove

Person.findByIdAndRemove(Person_id, function (err, doc) { 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log(doc); 
    } 
});


//Delete Many Documents with model.remove()

const removeManyPeople = done => {
Person.remove({name: "Mary"}, (err, data) => {
    if (err) {
      done(err);
    } else {
      done(null, data);
    }
  });
}

//Chain Search Query Helpers to Narrow Search Results

var queryChain = function(done) {
    var foodToSearch = "burrito";
    Person.find({favoriteFoods:foodToSearch}).sort({ name: 1 }).limit(2).select('-age').exec((err,data) =>{   
     
      err ? done(err): done(null, data);
      
    })
    
  };



