import { db } from '../db.js'

// updates DB
export default async function updateLocalDB(normalizedArray) {
  for (let character of normalizedArray) {
    const { name, height, weight, gender, isSynced } = character
    if (!db.prepare('SELECT name FROM people WHERE name = ?').get(name)) {
      // inserts NEW values
      db.prepare('INSERT INTO people (name, height, weight, gender, isSynced) VALUES (?, ?, ?, ?, ?)').run(name, height, weight, gender, isSynced)
    } else {
      // updates EXISTING values 
      db.prepare('UPDATE people SET height = ?, weight = ?, gender = ?, isSynced = ? WHERE name = ?').run(height, weight, gender, isSynced, name)
    }
  }
}