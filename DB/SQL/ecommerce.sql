
CREATE DATABASE ecommerce;

-- CREATE ROLE isAdmin WITH SUPERUSER CREATEDB CREATEROLE LOGIN ENCRYPTED PASSWORD 'my_admin_password';

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar(120) NOT NULL,
  "password" varchar(120) NOT NULL,
  "first_name" varchar(120),
  "last_name" varchar(120),
  "address" varchar(100),
  "postcode" varchar(10),
  "city" varchar(100),
  "country" varchar(100),
  "date_joined" timestamp DEFAULT (now()),
  "active" boolean DEFAULT true,
   "user_role" VARCHAR,
   "modified" DATE,
   "is_Admin" boolean DEFAULT false
);

CREATE TABLE "order_items" (
  "order_id" INTEGER,
  "product_id" INTEGER,
  "quantity" INTEGER DEFAULT 1,
  "price" numeric 
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER,
  "status" varchar(100),
  "created_at" timestamp,
  "total_price" numeric,
  "price" numeric,
  "ref" varchar(100),
  "payment_method" INTEGER
);

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "author" varchar(255),
  "description" varchar(255),
  "category" varchar(255),
  "image_url" varchar(255),
  "status" varchar(255),
  "price" numeric, 
);

CREATE TABLE "carts" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER UNIQUE NOT NULL,
   "created_at" timestamp NOT NULL,
    "modified" timestamp
);

CREATE TABLE "cart_items" (
  "cart_id" INTEGER,
  "product_id" INTEGER,
  "quantity" INTEGER DEFAULT 1
);

CREATE TABLE "payment_details" (
	id SERIAL PRIMARY KEY,
	card_type VARCHAR(50),
	card_number CHAR(16),
	expiry_date VARCHAR(10),
	name_on_card VARCHAR(100),
  security_code VARCHAR(3),
);

ALTER TABLE "order_items" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "carts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "cart_items" ADD FOREIGN KEY ("cart_id") REFERENCES "carts" ("id");

ALTER TABLE "cart_items" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "cart_items" ADD PRIMARY KEY ("cart_id", "product_id");

ALTER TABLE "order_items" ADD PRIMARY KEY ("order_id", "product_id");

ALTER TABLE "users" ALTER COLUMN "user_role" SET DEFAULT "customer"
; 
 




