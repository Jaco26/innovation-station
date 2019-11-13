DROP TABLE IF EXISTS recipe;
DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS recipe_tag;

CREATE TABLE recipe (
  id TEXT PRIMARY KEY,
  date_created TIMESTAMP,
  date_updated TIMESTAMP,
  title TEXT,
  description TEXT,
  markdown TEXT,
  html TEXT
);

CREATE TABLE tag (
  id TEXT PRIMARY KEY,
  name TEXT
);

CREATE TABLE recipe_tag (
  recipe_id TEXT,
  tag_id TEXT,
  FOREIGN KEY(recipe_id) REFERENCES recipe(id),
  FOREIGN KEY(tag_id) REFERENCES tag(id)
);

