//Require Mongoose
import mongoose from 'mongoose';

//Define a schema
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
	text: String,
	rating: {
		type: Number,
		default: 0,
	},
	profile_photo_url: String,
	author_name: String,
	placeId: {
		type: String,
		required: true
	},
}, {
	collection: 'reviews',
	timestamps: true
});

export default mongoose.model('Review', ReviewSchema);