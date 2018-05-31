var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");


// mongoose.connect("mongodb://localhost/posterwala");
mongoose.connect("mongodb://jaykhedekar:Iitbombay2016#@ds143070.mlab.com:43070/jumble");
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// Schema of the data
var posterSchema = new mongoose.Schema({
    name: String,
    image: String,
    creator: String,
    price: Number,
    description: String
});

var poster = mongoose.model("poster", posterSchema);

app.get("/", function(req, res){
    res.redirect("index");
});

app.get("/index", function(req, res){
    // Getting all grounds from db
    poster.find({}, function(err, allposters){
        if(err){
            console.log(err);
        } else{
            res.render("index", {posters: allposters});
        }
    });
});

app.post("/index", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var creator = req.body.creator;
    var price = req.body.price;
    var description = req.body.description;
    var newPoster = {name: name, image: image,creator: creator, price: price, description: description};
    // Create new ground and save it to db
    poster.create(newPoster, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            // Redirect back to campgrounds page
            res.redirect("/index");
        }
    });
});

app.get("/index/addposter", function(req,res){
    res.render("addposter");
});

app.get("/index/:id", function(req, res){
    // Find show template with that campground.
    // Mongoose find by id
    poster.findById(req.params.id, function(err, foundPoster){
        if(err){
            console.log(err);
        } else {
            res.render("poster", {poster: foundPoster});
        }
    });
     
    
});










app.listen(3000, 'localhost', function(){
    console.log("Server is running");
});