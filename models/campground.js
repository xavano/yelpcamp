var mongoose = require("mongoose");
var Comment = require('./comment');
 
var campgroundSchema = new mongoose.Schema({
	name: String,
	price: String,
	image: String,
	description: String,
	location: String,
	lat: Number,
	lng: Number,
	author: {
	   id: {
		    type: mongoose.Schema.Types.ObjectId,
            ref: "User"
	   },
	   username: String
    },
    comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
    ]
});

//prehook for removing comments attached to campground
campgroundSchema.pre('remove', async function(next) {
	try {
		await Comment.remove({
			"_id": {
				$in: this.comments
			}
		});
		next();
	} catch (err) {
		next(err);
	}
});
 
module.exports = mongoose.model("Campground", campgroundSchema);