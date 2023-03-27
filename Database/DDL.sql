-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `id` VARCHAR(36) NOT NULL,
  `email` VARCHAR(128) NOT NULL,
  `display_name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(128) NOT NULL,
  `profile_picture` VARCHAR(40) NULL,
  `createdOn` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Chat` (
  `id` VARCHAR(36) NOT NULL,
  `createdOn` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Chat_User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Chat_User` (
  `Chat_id` VARCHAR(36) NOT NULL,
  `User_id` VARCHAR(36) NOT NULL,
  `chat_name` VARCHAR(45) NULL,
  PRIMARY KEY (`Chat_id`, `User_id`),
  INDEX `fk_Chat_has_User_User1_idx` (`User_id` ASC),
  INDEX `fk_Chat_has_User_Chat_idx` (`Chat_id` ASC),
  CONSTRAINT `fk_Chat_has_User_Chat`
    FOREIGN KEY (`Chat_id`)
    REFERENCES `mydb`.`Chat` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Chat_has_User_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `mydb`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
