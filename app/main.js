"use strict";

const fs = require("fs");

const templater = require("./modules/templater");

const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const app = new Koa();
const router = new Router();
const DbModel = require("./modules/db");
const articleModel = new DbModel("Article");

app.use(bodyParser());

router.get("/", async (ctx, next) => {
	await next();
	ctx.body = "Overriden by router.";
});

router.get("/manage/articles/new", async (ctx, next) => {
	await next();
	ctx.body = templater({
		fuck: "yeah!",
	}, fs.readFileSync(__dirname + "/templates/new-article.html"));
});

router.post("/manage/articles", async (ctx, next) => {
	await next();
	await articleModel.saveNew({
		date:   new Date(),
		author: ctx.request.body.author,
		title:  ctx.request.body.title,
	});
	ctx.body = JSON.stringify(ctx.request.body);
});

router.get("/manage/articles", async (ctx, next) => {
	await next();
	let result = await articleModel.getAll();
	ctx.body = JSON.stringify(result);
});

router.get("/articles", async (ctx, next) => {
	console.log("articles requested");
	await next();
	let result = await articleModel.getAll();
	ctx.body = JSON.stringify(result);
});

router.get("/articles/author/:author", async (ctx, next) => {
	await next();
	console.log(await articleModel.getAllOf({
		author: ctx.params.author,
	}));
	ctx.body = JSON.stringify(ctx.request.body);
});

router.get("/articles/category/:category", async (ctx, next) => {
	await next();
	console.log(await articleModel.getAllOf({
		author: ctx.params.author,
	}));
	ctx.body = JSON.stringify(ctx.request.body);
});

router.post("/articles/title/:title", async (ctx, next) => {
	await next();
	await articleModel.getOneOf({
		author: "Anusia",
		title:  ctx.request.body.title,
	});
	ctx.body = JSON.stringify(ctx.request.body);
});

app.use(router.routes());

app.use(router.allowedMethods());

app.listen(7331);
