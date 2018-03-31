-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 31, 2018 at 02:27 PM
-- Server version: 5.7.21-0ubuntu0.17.10.1
-- PHP Version: 7.1.15-0ubuntu0.17.10.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cinema_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `Actors`
--
DROP DATABASE cinema_app;
CREATE DATABASE cinema_app;

CREATE TABLE `Actors` (
  `name` varchar(15) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `birth_date` datetime DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `bio` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Actors_Movies`
--

CREATE TABLE `Actors_Movies` (
  `actor` varchar(15) NOT NULL,
  `movie` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Admins`
--

CREATE TABLE `Admins` (
  `username` varchar(15) NOT NULL,
  `password` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `salary` int(11) DEFAULT NULL,
  `type` varchar(15) DEFAULT NULL,
  `first_name` varchar(15) NOT NULL,
  `last_name` varchar(15) NOT NULL,
  `phone_number` int(11) DEFAULT NULL,
  `gender` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Admins_Cinemas`
--

CREATE TABLE `Admins_Cinemas` (
  `admin` varchar(20) DEFAULT NULL,
  `cinema_location` varchar(100) DEFAULT NULL,
  `cinema_name` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Cinemas`
--

CREATE TABLE `Cinemas` (
  `location` varchar(100) NOT NULL,
  `address` varchar(200) NOT NULL,
  `name` varchar(15) NOT NULL,
  `number_of_halls` int(11) DEFAULT NULL,
  `company` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Halls`
--

CREATE TABLE `Halls` (
  `cinema_location` varchar(100) NOT NULL,
  `cinema_name` varchar(200) NOT NULL,
  `hall_number` int(11) NOT NULL,
  `type` varchar(15) DEFAULT NULL,
  `layout` varchar(30) DEFAULT NULL,
  `number_of_seats` int(11) NOT NULL,
  `movie` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Movies`
--

CREATE TABLE `Movies` (
  `movie_id` int(11) NOT NULL,
  `title` varchar(30) DEFAULT NULL,
  `duration` float DEFAULT NULL,
  `genre` varchar(15) DEFAULT NULL,
  `description` text,
  `imagePath` varchar(200) DEFAULT NULL,
  `cast` text,
  `year` int(11) DEFAULT NULL,
  `feature` int(11) DEFAULT NULL,
  `release_date` datetime DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `status` varchar(20) DEFAULT 'PENDING'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Movies_in_Cinemas`
--

CREATE TABLE `Movies_in_Cinemas` (
  `movie` int(11) DEFAULT NULL,
  `cinema_location` varchar(20) DEFAULT NULL,
  `cinema_name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Parties`
--

CREATE TABLE `Parties` (
  `date_time` datetime NOT NULL,
  `hall` int(11) NOT NULL,
  `cinema_location` varchar(20) NOT NULL,
  `cinema_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Tickets`
--

CREATE TABLE `Tickets` (
  `reservation_id` int(11) NOT NULL,
  `payment` bit(1) DEFAULT NULL,
  `seat_number` varchar(30) NOT NULL,
  `date_time` datetime NOT NULL,
  `hall` int(11) NOT NULL,
  `cinema_location` varchar(20) NOT NULL,
  `cinema_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `username` varchar(15) NOT NULL,
  `password` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `phone_number` int(11) DEFAULT NULL,
  `credit_card` int(20) DEFAULT NULL,
  `first_name` varchar(15) NOT NULL,
  `last_name` varchar(15) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Promo_Codes`
--

CREATE TABLE `Promo_Codes` (
  `promo_code` varchar(15) NOT NULL,
  `type` varchar(7) NOT NULL,
  `value` varchar(20) NOT NULL,
  primary key(promo_code)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Promo_Codes_Cinemas`
--

CREATE TABLE `Promo_Codes_Cinemas` (
  `promo_code` varchar(15) NOT NULL,
  `location` varchar(100) NOT NULL,
  `name` varchar(15) NOT NULL,
  PRIMARY KEY (promo_code, location, name)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Actors`
--
ALTER TABLE `Actors`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `Actors_Movies`
--
ALTER TABLE `Actors_Movies`
  ADD PRIMARY KEY (`actor`,`movie`),
  ADD KEY `movie` (`movie`);

--
-- Indexes for table `Admins`
--
ALTER TABLE `Admins`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `Admins_Cinemas`
--
ALTER TABLE `Admins_Cinemas`
  ADD KEY `cinema_location` (`cinema_location`,`cinema_name`),
  ADD KEY `admin` (`admin`);

--
-- Indexes for table `Cinemas`
--
ALTER TABLE `Cinemas`
  ADD PRIMARY KEY (`location`,`name`);

--
-- Indexes for table `Halls`
--
ALTER TABLE `Halls`
  ADD PRIMARY KEY (`hall_number`,`cinema_name`,`cinema_location`),
  ADD KEY `cinema_location` (`cinema_location`,`cinema_name`),
  ADD KEY `movie` (`movie`);

--
-- Indexes for table `Movies`
--
ALTER TABLE `Movies`
  ADD PRIMARY KEY (`movie_id`);

--
-- Indexes for table `Movies_in_Cinemas`
--
ALTER TABLE `Movies_in_Cinemas`
  ADD KEY `cinema_location` (`cinema_location`,`cinema_name`),
  ADD KEY `movie` (`movie`);

--
-- Indexes for table `Parties`
--
ALTER TABLE `Parties`
  ADD PRIMARY KEY (`date_time`,`hall`,`cinema_name`,`cinema_location`),
  ADD KEY `hall` (`hall`,`cinema_name`,`cinema_location`);

--
-- Indexes for table `Tickets`
--
ALTER TABLE `Tickets`
  ADD PRIMARY KEY (`reservation_id`,`seat_number`,`date_time`,`hall`,`cinema_name`,`cinema_location`),
  ADD KEY `date_time` (`date_time`,`hall`,`cinema_name`,`cinema_location`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Movies`
--
ALTER TABLE `Movies`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Tickets`
--
ALTER TABLE `Tickets`
  MODIFY `reservation_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `Actors_Movies`
--
ALTER TABLE `Actors_Movies`
  ADD CONSTRAINT `Actors_Movies_ibfk_1` FOREIGN KEY (`actor`) REFERENCES `Actors` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Actors_Movies_ibfk_2` FOREIGN KEY (`movie`) REFERENCES `Movies` (`movie_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Admins_Cinemas`
--
ALTER TABLE `Admins_Cinemas`
  ADD CONSTRAINT `Admins_Cinemas_ibfk_1` FOREIGN KEY (`cinema_location`,`cinema_name`) REFERENCES `Cinemas` (`location`, `name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Admins_Cinemas_ibfk_2` FOREIGN KEY (`admin`) REFERENCES `Admins` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Halls`
--
ALTER TABLE `Halls`
  ADD CONSTRAINT `Halls_ibfk_1` FOREIGN KEY (`cinema_location`,`cinema_name`) REFERENCES `Cinemas` (`location`, `name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Halls_ibfk_2` FOREIGN KEY (`movie`) REFERENCES `Movies` (`movie_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Movies_in_Cinemas`
--
ALTER TABLE `Movies_in_Cinemas`
  ADD CONSTRAINT `Movies_in_Cinemas_ibfk_1` FOREIGN KEY (`cinema_location`,`cinema_name`) REFERENCES `Cinemas` (`location`, `name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Movies_in_Cinemas_ibfk_2` FOREIGN KEY (`movie`) REFERENCES `Movies` (`movie_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Parties`
--
ALTER TABLE `Parties`
  ADD CONSTRAINT `Parties_ibfk_1` FOREIGN KEY (`hall`,`cinema_name`,`cinema_location`) REFERENCES `Halls` (`hall_number`, `cinema_name`, `cinema_location`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Tickets`
--
ALTER TABLE `Tickets`
  ADD CONSTRAINT `Tickets_ibfk_1` FOREIGN KEY (`date_time`,`hall`,`cinema_name`,`cinema_location`) REFERENCES `Parties` (`date_time`, `hall`, `cinema_name`, `cinema_location`) ON DELETE CASCADE ON UPDATE CASCADE;


--
-- Constaints for table 'Promo_Codes'
--
  ALTER TABLE `Promo_Codes` ADD CONSTRAINT
  my_constraint CHECK (type = 'percentage' OR type = 'amount' OR type = 'package');

  --
  -- Constraints for table `Promo_Codes_Cinemas`
  --
  ALTER TABLE `Promo_Codes_Cinemas`
    ADD CONSTRAINT `Promo_Codes_Cinemas_ibkf_1` FOREIGN KEY (promo_code) REFERENCES `Promo_Codes` (promo_code) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `Promo_Codes_Cinemas_ibkf_2` FOREIGN KEY (location, name) REFERENCES `Cinemas` (location, name) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
