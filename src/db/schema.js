const { mysqlTable, int, varchar, boolean } = require("drizzle-orm/mysql-core");

const products = mysqlTable("products", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }),
  price: int("price").notNull(),
  inStock: boolean("in_stock").default(false),
});

module.exports = { products };


















