-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `role` ENUM('USER', 'ADVANCED_USER', 'ADMIN') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,

    INDEX `Account_userId_idx`(`userId`),
    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hzwm` (
    `id` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `entry` VARCHAR(191) NULL,
    `definition` VARCHAR(2000) NULL,
    `readings` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wamyouruijyusho` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `maki` VARCHAR(191) NULL,
    `bu` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `type2` VARCHAR(191) NULL,
    `page` VARCHAR(191) NULL,
    `entry` VARCHAR(191) NULL,
    `definition` VARCHAR(2000) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gyokuhentaizen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ghtz_id` VARCHAR(191) NOT NULL,
    `entry` VARCHAR(191) NULL,
    `jion_r` VARCHAR(191) NULL,
    `jion_l` VARCHAR(191) NULL,
    `wakun` VARCHAR(191) NULL,
    `ids` VARCHAR(191) NULL,
    `radical` VARCHAR(191) NULL,
    `remain_strokes` VARCHAR(191) NULL,

    UNIQUE INDEX `Gyokuhentaizen_ghtz_id_key`(`ghtz_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jiruisho` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `entry` VARCHAR(191) NULL,
    `entry_expression` VARCHAR(191) NULL,
    `shouten` VARCHAR(191) NULL,
    `hen` VARCHAR(191) NULL,
    `bu` VARCHAR(191) NULL,
    `maeda_loc` VARCHAR(191) NULL,
    `maeda_ndl_url` VARCHAR(191) NULL,
    `kurokawa_loc` VARCHAR(191) NULL,
    `kurokawa_ndl_url` VARCHAR(191) NULL,
    `onkun` VARCHAR(191) NULL,
    `char_count` VARCHAR(191) NULL,
    `gokei_display` VARCHAR(191) NULL,
    `gokei_search_original` VARCHAR(191) NULL,
    `gokei_search_current` VARCHAR(191) NULL,
    `remark` VARCHAR(191) NULL,
    `definition` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JiruishoChushaku` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `maki` VARCHAR(191) NULL,
    `hen` VARCHAR(191) NULL,
    `bu` VARCHAR(191) NULL,
    `annotation` LONGTEXT NOT NULL,
    `word_in_kurokawa` VARCHAR(191) NOT NULL,
    `word_in_maeda` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BunmeiSetsuyoshu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bunmei_id` VARCHAR(191) NOT NULL,
    `gotou` VARCHAR(191) NULL,
    `entry` VARCHAR(1000) NULL,
    `entry_original` VARCHAR(1000) NULL,
    `gokei` VARCHAR(500) NULL,
    `gokei_original` VARCHAR(500) NULL,
    `left_kun` VARCHAR(191) NULL,
    `left_kun_original` VARCHAR(191) NULL,
    `definition` LONGTEXT NULL,
    `item_type` VARCHAR(191) NULL,
    `bu` VARCHAR(191) NULL,
    `mon` VARCHAR(191) NULL,
    `page` VARCHAR(191) NULL,
    `line` VARCHAR(191) NULL,
    `ndl_link` VARCHAR(191) NULL,
    `remark` VARCHAR(191) NULL,
    `ndl_comma` VARCHAR(191) NULL,
    `no_inline` VARCHAR(191) NULL,
    `revision` VARCHAR(191) NULL,
    `shoten` VARCHAR(191) NULL,
    `shoten_original` VARCHAR(191) NULL,

    UNIQUE INDEX `BunmeiSetsuyoshu_bunmei_id_key`(`bunmei_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Racvyoxv` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `record_creator` VARCHAR(191) NULL,
    `check_kubo` VARCHAR(191) NULL,
    `check_fujimoto` VARCHAR(191) NULL,
    `page` VARCHAR(191) NULL,
    `line` VARCHAR(191) NULL,
    `gallica` VARCHAR(191) NULL,
    `initial_on` VARCHAR(191) NULL,
    `entry` VARCHAR(191) NULL,
    `kanji_pair` VARCHAR(191) NULL,
    `ruby_left_first` VARCHAR(191) NULL,
    `ruby_left_remains` VARCHAR(191) NULL,
    `ruby_right_first` VARCHAR(191) NULL,
    `ruby_right_remains` VARCHAR(191) NULL,
    `remark` VARCHAR(191) NULL,
    `nikkoku1_entry` VARCHAR(191) NULL,
    `kanji_pair_length` VARCHAR(191) NULL,
    `nikkoku1_url` VARCHAR(191) NULL,
    `nikkoku2_entry` VARCHAR(191) NULL,
    `nikkoku2_url` VARCHAR(191) NULL,
    `nikkoku3_entry` VARCHAR(191) NULL,
    `nikkoku3_url` VARCHAR(191) NULL,
    `nikkoku4_entry` VARCHAR(191) NULL,
    `nikkoku4_url` VARCHAR(191) NULL,
    `nikkoku5_entry` VARCHAR(191) NULL,
    `nikkoku5_url` VARCHAR(191) NULL,
    `nikkoku6_entry` VARCHAR(191) NULL,
    `nikkoku6_url` VARCHAR(191) NULL,
    `nikkoku7_entry` VARCHAR(191) NULL,
    `nikkoku7_url` VARCHAR(191) NULL,
    `group_entry` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wakunnosiori_Entry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `entry` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `ndl_url` VARCHAR(191) NULL,
    `page` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wakunnosiori_Def` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `index` INTEGER NULL,
    `entry_id` INTEGER NOT NULL,
    `definition` VARCHAR(191) NULL,

    INDEX `Wakunnosiori_Def_entry_id_idx`(`entry_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KrmRecord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `KRID_n` VARCHAR(191) NOT NULL,
    `KRID_sn` VARCHAR(191) NOT NULL,
    `KR2ID` VARCHAR(191) NOT NULL,
    `KRID` VARCHAR(191) NOT NULL,
    `KR_Tenri_p` VARCHAR(191) NULL,
    `KR_vol_name` VARCHAR(191) NULL,
    `KR_radical` VARCHAR(191) NULL,
    `KR_vol_radical` VARCHAR(191) NULL,
    `Entry` VARCHAR(191) NULL,
    `Entry_original` VARCHAR(191) NULL,
    `Def` VARCHAR(2000) NULL,
    `Remarks` VARCHAR(2000) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HiGaiji` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `textId` VARCHAR(255) NULL,
    `manageId` VARCHAR(255) NULL,
    `gaiji` VARCHAR(255) NULL,
    `char1` VARCHAR(255) NULL,
    `unicode` VARCHAR(255) NULL,
    `char2` VARCHAR(255) NULL,
    `matched` VARCHAR(255) NULL,
    `remark` VARCHAR(255) NULL,
    `imageUrl` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OudanKanjionItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `book_id` VARCHAR(191) NOT NULL,
    `book_name` VARCHAR(191) NOT NULL,
    `char_id` INTEGER NOT NULL,
    `word_id` INTEGER NOT NULL,
    `char` VARCHAR(191) NOT NULL,
    `word` VARCHAR(191) NOT NULL,
    `char_index` INTEGER NOT NULL,
    `beat_count` INTEGER NULL,
    `shoten` VARCHAR(191) NULL,
    `shoten_type` VARCHAR(191) NULL,
    `ruby` VARCHAR(191) NULL,
    `ruby_all` VARCHAR(191) NULL,
    `fanqie` VARCHAR(191) NULL,
    `ruion` VARCHAR(191) NULL,
    `etc` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `remarks` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OudankanjionBook` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `bookId` VARCHAR(191) NOT NULL,
    `bookInformation` VARCHAR(191) NOT NULL,
    `bookName` VARCHAR(191) NOT NULL,
    `inputLegend` VARCHAR(191) NOT NULL,
    `inputer` VARCHAR(191) NOT NULL,
    `jionInformation` VARCHAR(191) NOT NULL,
    `possession` VARCHAR(191) NOT NULL,
    `references` VARCHAR(191) NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `timeDesc` VARCHAR(191) NULL,

    UNIQUE INDEX `OudankanjionBook_bookId_key`(`bookId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GlyphData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `name` VARCHAR(191) NOT NULL,
    `related` VARCHAR(191) NULL,
    `data` TEXT NULL,

    UNIQUE INDEX `GlyphData_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DBManual` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `name` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(191) NULL,
    `article` LONGTEXT NULL,

    UNIQUE INDEX `DBManual_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

