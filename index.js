const PORT = 3000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const ejs = require('ejs');
const mongoose = require('mongoose');
const { xml } = require('cheerio/lib/static')
var bodyParser = require('body-parser')
var sneakers = [];
mongoose.connect('mongodb+srv://admin:admin@cluster0.1qh92.mongodb.net/Shoes?retryWrites=true&w=majority');

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 

// app.post('/results', function(req, res){

    
                
//     Meals.find({Meal_name: req.body.searchhMealsInput}, function(err, search){


//         res.render('home', {meals: meals, search:search} )


//     })



// })

const Brands = mongoose.model('Brands', {
    
    brand: String,
    image: String,
  
});

const Shoes_2019 = mongoose.model('Shoes_2019', {
    
    id: String,
    brand:String,
    colorway:String,
    gender:String,
    name:String,
    releaseDate:String,
    retailPrice:Number,
    shoe:String,
    styleId:String,
    title:String,
    year:String,
    img: String
  
});


const Shoes_2020 = mongoose.model('Shoes_2020', {
    
    id: String,
    brand:String,
    colorway:String,
    gender:String,
    name:String,
    releaseDate:String,
    retailPrice:Number,
    shoe:String,
    styleId:String,
    title:String,
    year:String,
    img: String,
    story: String
  
});


const Shoes = mongoose.model('Shoes', {
    
    id: String,
    brand:String,
    colorway:String,
    gender:String,
    name:String,
    releaseDate:String,
    retailPrice:Number,
    shoe:String,
    styleId:String,
    title:String,
    year:String,
    img: String,
    story: String
  
});

app.get('/results', (req, res) => {

console.log("brands");

Shoes.find({brand:"Jordan"}, function(err, shoes){

    Brands.find(function(err, brands){

        Shoes.find({brand:"adidas"},function(err, adidas){

             Shoes.find({brand:"Nike"},function(err, nike){

                 res.render('home', {brands: brands, shoes:shoes, adidas:adidas, nike:nike} )
            
                
        })

        })
            

    })

    
})

})



app.get('/', function (req, res) {
   




Brands.find(function(err, shoes){


    shoes.forEach(function(el){
        

            var options = {
  method: 'GET',
  url: 'https://brand-image-finder.p.rapidapi.com/api/brand/search',
  params: {name: el.brand},
  headers: {
    'x-rapidapi-host': 'brand-image-finder.p.rapidapi.com',
    'x-rapidapi-key': '19027bcecbmsh29da130e9fd0f75p13ef72jsnb747ff34f344'
  }
};



axios.request(options).then(function (response) {
	
  

  var brand_img = response.data.images[0];

   var sneakers = new Brands ({

         brand: el.brand,
        image: brand_img,
   })

   sneakers.save().then(() => console.log('saved'));

  
}).catch(function (error) {
	console.error(error);
});



})

res.send('we\'re good')



})


})


    // shoes.save().then(() => console.log('saved'))





// var options = {
//   method: 'GET',
//   url: 'https://brand-image-finder.p.rapidapi.com/api/brand/search',
//   params: {name: 'ADIDAS'},
//   headers: {
//     'x-rapidapi-host': 'brand-image-finder.p.rapidapi.com',
//     'x-rapidapi-key': '19027bcecbmsh29da130e9fd0f75p13ef72jsnb747ff34f344'
//   }
// };
  
//   axios.request(options).then(function (response) {
    
//     res.send(response.data)

//     response.data.results.forEach(function(shoe){

//         const shoes = new Shoes_2020({

//             id: shoe.id,
//             brand: shoe.brand,
//             colorway: shoe.colorway,
//             gender: shoe.gender,
//             name: shoe.name,
//             releaseDate: shoe.releaseDate,
//             retailPrice: shoe.retailPrice,
//             shoe: shoe.shoe,
//             styleId: shoe.styleId,
//             title: shoe.title,
//             year: shoe.year,
//             img:  shoe.image.original,
//             story: shoe.story


//         })

//         shoes.save().then(() => console.log('saved'))

//     })

//   }).catch(function (error) {
//       console.error(error);
//   });





app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

