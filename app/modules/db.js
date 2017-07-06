const URL_MONGODB = "mongodb://localhost/test";
const mongoose = require("mongoose");
mongoose.Promise = Promise;
mongoose.connect(URL_MONGODB);

const schemes = {
	article: mongoose.Schema({
		created: Date,
		title: String,
		author: String,
		excerpt: String,
		text: String,
	}),
};

/**
 * @typedef {Mongoose.models} models
 * @property Article
 * @property User
 */
const models = {
	"Article": mongoose.model("Article", schemes.article),
	"User": mongoose.model("User", schemes.article),
};

module.exports = class DbModel {
	constructor(model) {
		this.model = models[model];
	}

	/**
	 * @param id
	 * @return {Promise}
	 */
	getById(id) {
		return this.model.findById(id).exec();
	}

	/**
	 * @return {Promise}
	 */
	getAll() {
		return this.model.find().exec();
	}

	/**
	 * @param properties
	 * @return {Promise}
	 */
	getAllOf(properties) {
		return this.model.find(properties).exec();
	}

	/**
	 * @param properties
	 * @return {Promise}
	 */
	getOneOf(properties) {
		return this.model.findOne(properties).exec();
	}

	/**
	 * @param properties
	 * @return {models.property}
	 */
	getNew(properties = {}) {
		return new this.model(properties);
	}

	/**
	 * @param properties
	 * @return {Promise}
	 */
	saveNew(properties = {}) {
		return new Promise((resolve, reject) => {
			new this.model(properties).save((err) => {
				if (err) {
					reject(new Error(err.message));
				}
				resolve();
			});
		});
	}
};
