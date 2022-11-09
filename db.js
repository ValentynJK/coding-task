import Database from "better-sqlite3";
export const db = new Database("data.sqlite3");

db.prepare(
	`CREATE TABLE IF NOT EXISTS people (name TEXT PRIMARY KEY, height INTEGER, weight INTEGER, gender INTEGER, isSynced INTEGER)`
).run();

// module.exports = {
// 	db,
// };
