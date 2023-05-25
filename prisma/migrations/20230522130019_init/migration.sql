-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user'
);

-- CreateTable
CREATE TABLE "News" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pub_date" DATETIME,
    "title" TEXT,
    "content" TEXT
);

-- CreateTable
CREATE TABLE "Gyokuhentaizen" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ghtz_id" TEXT NOT NULL,
    "entry" TEXT,
    "jion_r" TEXT,
    "jion_l" TEXT,
    "wakun" TEXT,
    "ids" TEXT,
    "radical" TEXT,
    "remain_strokes" TEXT
);

-- CreateTable
CREATE TABLE "Jiruisho" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "entry" TEXT,
    "entry_expression" TEXT,
    "shouten" TEXT,
    "hen" TEXT,
    "bu" TEXT,
    "maeda_loc" TEXT,
    "maeda_ndl_url" TEXT,
    "kurokawa_loc" TEXT,
    "kurokawa_ndl_url" TEXT,
    "onkun" TEXT,
    "char_count" TEXT,
    "gokei_display" TEXT,
    "gokei_search_original" TEXT,
    "gokei_search_current" TEXT,
    "defination" TEXT,
    "remark" TEXT
);

-- CreateTable
CREATE TABLE "BunmeiSetsuyoshu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bunmei_id" TEXT NOT NULL,
    "gotou" TEXT,
    "entry" TEXT,
    "entry_original" TEXT,
    "gokei" TEXT,
    "gokei_original" TEXT,
    "shouten_original" TEXT,
    "left_kun_original" TEXT,
    "defination" TEXT,
    "item_type" TEXT,
    "bu" TEXT,
    "mon" TEXT,
    "page" TEXT,
    "line" TEXT,
    "ndl_link" TEXT,
    "remark" TEXT,
    "shouten" TEXT,
    "left_kun" TEXT
);

-- CreateTable
CREATE TABLE "Racvyoxv" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "record_creator" TEXT,
    "check_kubo" TEXT,
    "check_fujimoto" TEXT,
    "page" TEXT,
    "line" TEXT,
    "gallica" TEXT,
    "initial_on" TEXT,
    "entry" TEXT,
    "kanji_pair" TEXT,
    "ruby_left_first" TEXT,
    "ruby_left_remains" TEXT,
    "ruby_right_first" TEXT,
    "ruby_right_remains" TEXT,
    "remark" TEXT,
    "nikkoku1_entry" TEXT,
    "kanji_pair_length" TEXT,
    "nikkoku1_url" TEXT,
    "nikkoku2_entry" TEXT,
    "nikkoku2_url" TEXT,
    "nikkoku3_entry" TEXT,
    "nikkoku3_url" TEXT,
    "nikkoku4_entry" TEXT,
    "nikkoku4_url" TEXT,
    "nikkoku5_entry" TEXT,
    "nikkoku5_url" TEXT,
    "nikkoku6_entry" TEXT,
    "nikkoku6_url" TEXT,
    "nikkoku7_entry" TEXT,
    "nikkoku7_url" TEXT,
    "group_entry" TEXT
);

-- CreateTable
CREATE TABLE "Wakunnosiori_Entry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "entry" TEXT,
    "location" TEXT,
    "ndl_url" TEXT,
    "page" TEXT
);

-- CreateTable
CREATE TABLE "Wakunnosiori_Def" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "defination" TEXT,
    "index" INTEGER,
    "entry_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Gyokuhentaizen_ghtz_id_key" ON "Gyokuhentaizen"("ghtz_id");

-- CreateIndex
CREATE UNIQUE INDEX "BunmeiSetsuyoshu_bunmei_id_key" ON "BunmeiSetsuyoshu"("bunmei_id");

-- CreateIndex
CREATE INDEX "Wakunnosiori_Def_entry_id_idx" ON "Wakunnosiori_Def"("entry_id");
