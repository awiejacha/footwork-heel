"use strict";

module.exports = (variables, template) => {
	template = template instanceof Buffer ? template.toString("utf8") : template.toString();

	return template.replace(/\${([^}]*)}/g, (r,k)=>variables[k]);
};
