-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 19, 2018 at 07:36 PM
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
-- Table structure for table `actors`
--

CREATE TABLE `actors` (
  `name` varchar(115) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `birth_date` datetime DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `bio` text,
  `imagePath` varchar(200) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `actors`
--

INSERT INTO `actors` (`name`, `age`, `birth_date`, `gender`, `bio`, `imagePath`) VALUES
('Alicia Vikander', 29, '1988-10-03 00:00:00', 'Female', 'Alicia Vikander is a Swedish actress, dancer and producer. She was born and raised in Gothenburg, Västra Götalands län, Sweden, to Maria Fahl-Vikander, an actress of stage and screen, and Svante Vikander, a psychiatrist. She is of Swedish and one quarter Finnish descent.', ''),
('Bella Thorne', 20, '1997-10-08 00:00:00', 'Female', 'Bella Thorne was born in Pembroke Pines, Florida, to Tamara (Beckett) and Delancey Reinaldo \"Rey\" Thorne. She has three siblings, Remy Thorne, Dani Thorne and Kaili Thorne, all of whom have also acted. She is of Cuban (father) and Irish, Italian, English, German, and Welsh (mother) ancestry.', ''),
('Chadwick Boseman', 40, '1996-11-29 00:00:00', 'Male', 'Chadwick Boseman is an American actor. He is known for his portrayal of TChalla / Black Panther in the Marvel Cinematic Universe (since 2016), particular in Black Panther (2018), and for his starring roles in as Jackie Robinson in 42 (2013), James Brown in Get on Up (2014), and Thurgood Marshall in Marshall (2017).', ''),
('Dennis Quaid', 63, '1954-04-09 00:00:00', 'Male', 'Dennis Quaid was born in Houston, Texas, to Juanita Bonniedale (Jordan), a real estate agent, and William Rudy Quaid, an electrician. He grew up in the Houston suburban city of Bellaire. He was raised a Baptist, and studied drama, Mandarin Chinese, and dance while a student at Bellaire High School.', ''),
('Hugh Jackman', 49, '1968-10-12 00:00:00', 'Male', 'Hugh Michael Jackman is an Australian actor, singer, multi-instrumentalist, dancer and producer. Jackman has won international recognition for his roles in major films, notably as superhero, period, and romance characters. He is best known for his long-running role as Wolverine in the X-Men film series.', ''),
('Karen Gillan', 30, '1996-11-28 00:00:00', 'Female', 'Karen Sheila Gillan was born and raised in Inverness, Scotland, the daughter of Marie (Paterson) and John Gillan, who is a singer and recording artist. She developed a love for acting very early on, attending several youth theatre groups and taking part in a wide range of productions at her school, Charleston Academy.', ''),
('Matthew Goode', 39, '1996-04-03 00:00:00', 'Male', 'Matthew William Goode (born 3 April 1978) is an English actor. His films include Chasing Liberty (2004), Match Point (2005), Imagine Me and You (2006), Brideshead Revisited (2008), Watchmen (2009), A Single Man (2009), Leap Year (2010), Stoker (2013) and The Imitation Game (2014). ', ''),
('Scarlett Johansson', 33, '1996-11-22 00:00:00', 'Female', 'Scarlett Johansson was born in New York City. Her mother, Melanie Sloan, is from a Jewish family from the Bronx, and her father, Karsten Johansson, is a Danish-born architect, from Copenhagen.', ''),
('Scott Eastwood', 32, '1986-03-21 00:00:00', 'Male', 'Scott Eastwood was born Scott Clinton Reeves in Carmel, Monterey County, California, to Jacelyn Ann Reeves, a flight attendant, and Clint Eastwood, an actor and director. He grew up in Hawaii. Scott has a younger sister, Kathryn Eastwood, and several half-siblings.', '');

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `username` varchar(15) NOT NULL,
  `password` varchar(110) NOT NULL,
  `email` varchar(30) NOT NULL,
  `salary` int(11) DEFAULT NULL,
  `type` varchar(15) DEFAULT NULL,
  `firstName` varchar(15) NOT NULL,
  `lastName` varchar(15) NOT NULL,
  `phoneNumber` int(11) DEFAULT NULL,
  `gender` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`username`, `password`, `email`, `salary`, `type`, `firstName`, `lastName`, `phoneNumber`, `gender`) VALUES
('app', '$2a$10$rmNDLY4P9QLcCav7pPFDGOb7t5XDmP7MRz6WAvIE556uYlILKQhPe', 'app@cinema-app.com', 200, 'App Owner', 'Amir', 'Zhagloul', 1818191918, 'female'),
('booking', '$2a$10$rmNDLY4P9QLcCav7pPFDGOb7t5XDmP7MRz6WAvIE556uYlILKQhPe', 'booking@cinema-app.com', 300, 'Booking Usher', 'Mostafa', 'Nasr', 1828282908, 'male'),
('branch', '$2a$10$rmNDLY4P9QLcCav7pPFDGOb7t5XDmP7MRz6WAvIE556uYlILKQhPe', 'branch@cinema-app.com', 200, 'Branch Manager', 'George', 'Maged', 1063961597, 'male'),
('cinema', '$2a$10$rmNDLY4P9QLcCav7pPFDGOb7t5XDmP7MRz6WAvIE556uYlILKQhPe', 'cinema@cinema-app.com', 200, 'Cinema Owner', 'Omar', 'El Sayed', 1228383990, 'male');

-- --------------------------------------------------------

--
-- Table structure for table `admins_cinemas`
--

CREATE TABLE `admins_cinemas` (
  `admin` varchar(20) DEFAULT NULL,
  `cinema_location` varchar(100) DEFAULT NULL,
  `cinemaName` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admins_cinemas`
--

INSERT INTO `admins_cinemas` (`admin`, `cinema_location`, `cinemaName`) VALUES
('cinema', '9th of Mayo', 'Mayo Movies'),
('cinema', 'Old Cairo', 'El Zaaeem El Cinema'),
('cinema', 'Mokattam', 'Cinema Mawlana'),
('booking', 'Mokattam', 'Cinema Mawlana'),
('branch', 'Mokattam', 'Cinema Mawlana');

-- --------------------------------------------------------

--
-- Table structure for table `cinemas`
--

CREATE TABLE `cinemas` (
  `location` varchar(100) NOT NULL,
  `address` varchar(200) NOT NULL,
  `name` varchar(115) NOT NULL,
  `number_of_halls` int(11) DEFAULT NULL,
  `is3D` bit(1) NOT NULL,
  `is4D` bit(1) NOT NULL,
  `company` varchar(30) NOT NULL,
  `imagePath` varchar(200) NOT NULL,
  `imagePath2` varchar(200) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cinemas`
--

INSERT INTO `cinemas` (`location`, `address`, `name`, `number_of_halls`, `is3D`, `is4D`, `company`, `imagePath`, `imagePath2`) VALUES
('9th of Mayo', '90 Taha Hussien St', 'Mayo Movies', 5, b'1', b'1', 'Rainassance', 'https://image.ibb.co/dYho2H/mayo.jpg', 'https://image.ibb.co/nr5ahH/cinema3.jpg'),
('Al Haram', '3rd Pyramids Square', 'Pharoahs Cinema', 4, b'1', b'1', 'Egyptian Producers', 'https://image.ibb.co/mjrF47/cinema5.jpg', 'https://image.ibb.co/nr5ahH/cinema3.jpg'),
('Mokattam', '7071, Street 9', 'Cinema Mawlana', 5, b'1', b'1', 'Rainassance', 'https://image.ibb.co/mjrF47/cinema5.jpg', 'https://image.ibb.co/mRgRpx/cinema4.jpg'),
('New Cairo', '70th Cairo Festival Square', 'Galaxy Cinema', 8, b'1', b'1', 'Galaxco', 'https://image.ibb.co/joHz9x/galaxy_cinema.png', 'https://image.ibb.co/eUxo2H/cinema1.jpg'),
('New Cairo', '100 Street 90, 5th Settlement', 'Point 90', 3, b'1', b'1', 'Galaxco', 'https://image.ibb.co/kjqK9x/point90.png', 'https://image.ibb.co/iLePbc/cinema2.jpg'),
('Old Cairo', '3 Metropolis, Street 30', 'El Zaaeem El Cinema', 5, b'1', b'1', 'Rainassance', 'https://image.ibb.co/mjrF47/cinema5.jpg', 'https://image.ibb.co/mRgRpx/cinema4.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `halls`
--

CREATE TABLE `halls` (
  `cinema_location` varchar(100) NOT NULL,
  `cinema_name` varchar(200) NOT NULL,
  `hall_number` int(11) NOT NULL,
  `type` varchar(15) DEFAULT NULL,
  `layout` int(11) DEFAULT NULL,
  `number_of_seats` int(11) NOT NULL,
  `movie` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `halls`
--

INSERT INTO `halls` (`cinema_location`, `cinema_name`, `hall_number`, `type`, `layout`, `number_of_seats`, `movie`) VALUES
('Mokattam', 'Cinema Mawlana', 1, 'VIP', 1, 80, 5),
('Old Cairo', 'El Zaaeem El Cinema', 1, 'NORMAL', 1, 50, 28),
('New Cairo', 'Galaxy Cinema', 1, 'VIP', 1, 80, 5),
('9th of Mayo', 'Mayo Movies', 1, 'VIP', 1, 80, 5),
('Al Haram', 'Pharoahs Cinema', 1, 'VIP', 1, 100, 28),
('New Cairo', 'Point 90', 1, 'VIP', 1, 100, 3),
('Mokattam', 'Cinema Mawlana', 2, 'NORMAL', 1, 50, 4),
('Old Cairo', 'El Zaaeem El Cinema', 2, 'NORMAL', 1, 50, 5),
('New Cairo', 'Galaxy Cinema', 2, 'VIP', 1, 100, 26),
('9th of Mayo', 'Mayo Movies', 2, 'VIP', 1, 100, 26),
('Al Haram', 'Pharoahs Cinema', 2, 'VIP', 1, 80, 5),
('New Cairo', 'Point 90', 2, 'VIP', 1, 100, 26),
('Mokattam', 'Cinema Mawlana', 3, 'NORMAL', 1, 70, 14),
('Old Cairo', 'El Zaaeem El Cinema', 3, 'NORMAL', 1, 50, 4),
('New Cairo', 'Galaxy Cinema', 3, 'NORMAL', 1, 80, 2),
('9th of Mayo', 'Mayo Movies', 3, 'NORMAL', 1, 50, 13),
('Al Haram', 'Pharoahs Cinema', 3, 'NORMAL', 1, 50, 13),
('New Cairo', 'Point 90', 3, 'VIP', 1, 80, 5),
('Mokattam', 'Cinema Mawlana', 4, 'NORMAL', 1, 80, 28),
('Old Cairo', 'El Zaaeem El Cinema', 4, 'NORMAL', 1, 100, 3),
('New Cairo', 'Galaxy Cinema', 4, 'DELUXE', 1, 100, 3),
('9th of Mayo', 'Mayo Movies', 4, 'NORMAL', 1, 100, 3),
('Al Haram', 'Pharoahs Cinema', 4, 'NORMAL', 1, 50, 2),
('Mokattam', 'Cinema Mawlana', 5, 'VIP', 1, 100, 26),
('Old Cairo', 'El Zaaeem El Cinema', 5, 'VIP', 1, 100, 26),
('New Cairo', 'Galaxy Cinema', 5, 'VIP', 1, 80, 14),
('9th of Mayo', 'Mayo Movies', 5, 'VIP', 1, 80, 4),
('New Cairo', 'Galaxy Cinema', 6, 'VIP', 1, 70, 28),
('New Cairo', 'Galaxy Cinema', 7, 'NORMAL', 1, 50, 13),
('New Cairo', 'Galaxy Cinema', 8, 'VIP', 1, 80, 4);

-- --------------------------------------------------------

--
-- Table structure for table `layout`
--

CREATE TABLE `layout` (
  `id` int(11) NOT NULL,
  `encoded` text,
  `name` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `layout`
--

INSERT INTO `layout` (`id`, `encoded`, `name`) VALUES
(1, '[{\"margin\":false,\"row\":[\"offset\",\"offset\",\"offset\",{\"seat\":{\"number\":\"A4\"}},{\"seat\":{\"number\":\"A5\"}},{\"seat\":{\"number\":\"A6\"}},{\"seat\":{\"number\":\"A7\"}},{\"seat\":{\"number\":\"A8\"}},{\"seat\":{\"number\":\"A9\"}},\"offset\",\"offset\",\"offset\"]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"B1\"}},{\"seat\":{\"number\":\"B2\"}},{\"seat\":{\"number\":\"B3\"}},{\"seat\":{\"number\":\"B4\"}},{\"seat\":{\"number\":\"B5\"}},{\"seat\":{\"number\":\"B6\"}},{\"seat\":{\"number\":\"B7\"}},{\"seat\":{\"number\":\"B8\"}},{\"seat\":{\"number\":\"B9\"}},{\"seat\":{\"number\":\"B10\"}},{\"seat\":{\"number\":\"B11\"}},{\"seat\":{\"number\":\"B12\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"C1\"}},{\"seat\":{\"number\":\"C2\"}},{\"seat\":{\"number\":\"C3\"}},{\"seat\":{\"number\":\"C4\"}},{\"seat\":{\"number\":\"C5\"}},{\"seat\":{\"number\":\"C6\"}},{\"seat\":{\"number\":\"C7\"}},{\"seat\":{\"number\":\"C8\"}},{\"seat\":{\"number\":\"C9\"}},{\"seat\":{\"number\":\"C10\"}},{\"seat\":{\"number\":\"C11\"}},{\"seat\":{\"number\":\"C12\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"D1\"}},{\"seat\":{\"number\":\"D2\"}},{\"seat\":{\"number\":\"D3\"}},{\"seat\":{\"number\":\"D4\"}},{\"seat\":{\"number\":\"D5\"}},{\"seat\":{\"number\":\"D6\"}},{\"seat\":{\"number\":\"D7\"}},{\"seat\":{\"number\":\"D8\"}},{\"seat\":{\"number\":\"D9\"}},{\"seat\":{\"number\":\"D10\"}},{\"seat\":{\"number\":\"D11\"}},{\"seat\":{\"number\":\"D12\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"E1\"}},{\"seat\":{\"number\":\"E2\"}},{\"seat\":{\"number\":\"E3\"}},{\"seat\":{\"number\":\"E4\"}},{\"seat\":{\"number\":\"E5\"}},{\"seat\":{\"number\":\"E6\"}},{\"seat\":{\"number\":\"E7\"}},{\"seat\":{\"number\":\"E8\"}},{\"seat\":{\"number\":\"E9\"}},{\"seat\":{\"number\":\"E10\"}},{\"seat\":{\"number\":\"E11\"}},{\"seat\":{\"number\":\"E12\"}}]},{\"margin\":false,\"row\":[\"offset\",{\"seat\":{\"number\":\"F2\"}},{\"seat\":{\"number\":\"F3\"}},{\"seat\":{\"number\":\"F4\"}},{\"seat\":{\"number\":\"F5\"}},{\"seat\":{\"number\":\"F6\"}},{\"seat\":{\"number\":\"F7\"}},{\"seat\":{\"number\":\"F8\"}},{\"seat\":{\"number\":\"F9\"}},{\"seat\":{\"number\":\"F10\"}},{\"seat\":{\"number\":\"F11\"}},\"offset\"]},{\"margin\":false,\"row\":[\"offset\",\"offset\",{\"seat\":{\"number\":\"G3\"}},{\"seat\":{\"number\":\"G4\"}},{\"seat\":{\"number\":\"G5\"}},{\"seat\":{\"number\":\"G6\"}},{\"seat\":{\"number\":\"G7\"}},{\"seat\":{\"number\":\"G8\"}},{\"seat\":{\"number\":\"G9\"}},{\"seat\":{\"number\":\"G10\"}},\"offset\",\"offset\"]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"H1\"}},{\"seat\":{\"number\":\"H2\"}},{\"seat\":{\"number\":\"H3\"}},\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",{\"seat\":{\"number\":\"H10\"}},{\"seat\":{\"number\":\"H11\"}},{\"seat\":{\"number\":\"H12\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"I1\"}},{\"seat\":{\"number\":\"I2\"}},{\"seat\":{\"number\":\"I3\"}},\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",{\"seat\":{\"number\":\"I10\"}},{\"seat\":{\"number\":\"I11\"}},{\"seat\":{\"number\":\"I12\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"J1\"}},{\"seat\":{\"number\":\"J2\"}},{\"seat\":{\"number\":\"J3\"}},\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",{\"seat\":{\"number\":\"J10\"}},{\"seat\":{\"number\":\"J11\"}},{\"seat\":{\"number\":\"J12\"}}]}]', 'A'),
(2, '[{\"margin\":false,\"row\":[\"offset\",\"offset\",\"offset\",{\"seat\":{\"number\":\"A4\"}},{\"seat\":{\"number\":\"A5\"}},{\"seat\":{\"number\":\"A6\"}},{\"seat\":{\"number\":\"A7\"}},{\"seat\":{\"number\":\"A8\"}},{\"seat\":{\"number\":\"A9\"}},\"offset\",\"offset\",\"offset\"]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"B1\"}},{\"seat\":{\"number\":\"B2\"}},{\"seat\":{\"number\":\"B3\"}},{\"seat\":{\"number\":\"B4\"}},{\"seat\":{\"number\":\"B5\"}},{\"seat\":{\"number\":\"B6\"}},{\"seat\":{\"number\":\"B7\"}},{\"seat\":{\"number\":\"B8\"}},{\"seat\":{\"number\":\"B9\"}},{\"seat\":{\"number\":\"B10\"}},{\"seat\":{\"number\":\"B11\"}},{\"seat\":{\"number\":\"B12\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"C1\"}},{\"seat\":{\"number\":\"C2\"}},{\"seat\":{\"number\":\"C3\"}},{\"seat\":{\"number\":\"C4\"}},{\"seat\":{\"number\":\"C5\"}},{\"seat\":{\"number\":\"C6\"}},{\"seat\":{\"number\":\"C7\"}},{\"seat\":{\"number\":\"C8\"}},{\"seat\":{\"number\":\"C9\"}},{\"seat\":{\"number\":\"C10\"}},{\"seat\":{\"number\":\"C11\"}},{\"seat\":{\"number\":\"C12\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"D1\"}},{\"seat\":{\"number\":\"D2\"}},{\"seat\":{\"number\":\"D3\"}},{\"seat\":{\"number\":\"D4\"}},{\"seat\":{\"number\":\"D5\"}},{\"seat\":{\"number\":\"D6\"}},{\"seat\":{\"number\":\"D7\"}},{\"seat\":{\"number\":\"D8\"}},{\"seat\":{\"number\":\"D9\"}},{\"seat\":{\"number\":\"D10\"}},{\"seat\":{\"number\":\"D11\"}},{\"seat\":{\"number\":\"D12\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"E1\"}},{\"seat\":{\"number\":\"E2\"}},{\"seat\":{\"number\":\"E3\"}},{\"seat\":{\"number\":\"E4\"}},{\"seat\":{\"number\":\"E5\"}},{\"seat\":{\"number\":\"E6\"}},{\"seat\":{\"number\":\"E7\"}},{\"seat\":{\"number\":\"E8\"}},{\"seat\":{\"number\":\"E9\"}},{\"seat\":{\"number\":\"E10\"}},{\"seat\":{\"number\":\"E11\"}},{\"seat\":{\"number\":\"E12\"}}]},{\"margin\":true,\"row\":[\"offset\",\"offset\",{\"seat\":{\"number\":\"F3\"}},{\"seat\":{\"number\":\"F4\"}},{\"seat\":{\"number\":\"F5\"}},{\"seat\":{\"number\":\"F6\"}},{\"seat\":{\"number\":\"F7\"}},{\"seat\":{\"number\":\"F8\"}},{\"seat\":{\"number\":\"F9\"}},{\"seat\":{\"number\":\"F10\"}},\"offset\",\"offset\"]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"G1\"}},{\"seat\":{\"number\":\"G2\"}},{\"seat\":{\"number\":\"G3\"}},\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",{\"seat\":{\"number\":\"G10\"}},{\"seat\":{\"number\":\"G11\"}},{\"seat\":{\"number\":\"G12\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"H1\"}},{\"seat\":{\"number\":\"H2\"}},{\"seat\":{\"number\":\"H3\"}},\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",{\"seat\":{\"number\":\"H10\"}},{\"seat\":{\"number\":\"H11\"}},{\"seat\":{\"number\":\"H12\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"I1\"}},{\"seat\":{\"number\":\"I2\"}},{\"seat\":{\"number\":\"I3\"}},\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",{\"seat\":{\"number\":\"I10\"}},{\"seat\":{\"number\":\"I11\"}},{\"seat\":{\"number\":\"I12\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"J1\"}},{\"seat\":{\"number\":\"J2\"}},{\"seat\":{\"number\":\"J3\"}},{\"seat\":{\"number\":\"J4\"}},{\"seat\":{\"number\":\"J5\"}},{\"seat\":{\"number\":\"J6\"}},{\"seat\":{\"number\":\"J7\"}},{\"seat\":{\"number\":\"J8\"}},{\"seat\":{\"number\":\"J9\"}},{\"seat\":{\"number\":\"J10\"}},{\"seat\":{\"number\":\"J11\"}},{\"seat\":{\"number\":\"J12\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"K1\"}},{\"seat\":{\"number\":\"K2\"}},{\"seat\":{\"number\":\"K3\"}},{\"seat\":{\"number\":\"K4\"}},{\"seat\":{\"number\":\"K5\"}},{\"seat\":{\"number\":\"K6\"}},{\"seat\":{\"number\":\"K7\"}},{\"seat\":{\"number\":\"K8\"}},{\"seat\":{\"number\":\"K9\"}},{\"seat\":{\"number\":\"K10\"}},{\"seat\":{\"number\":\"K11\"}},{\"seat\":{\"number\":\"K12\"}}]}]', 'B'),
(3, '[{\"margin\":false,\"row\":[\"offset\",\"offset\",\"offset\",\"offset\",{\"seat\":{\"number\":\"A5\"}},{\"seat\":{\"number\":\"A6\"}},{\"seat\":{\"number\":\"A7\"}},{\"seat\":{\"number\":\"A8\"}},{\"seat\":{\"number\":\"A9\"}},{\"seat\":{\"number\":\"A10\"}},\"offset\",\"offset\",\"offset\",\"offset\"]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"B1\"}},{\"seat\":{\"number\":\"B2\"}},{\"seat\":{\"number\":\"B3\"}},\"offset\",{\"seat\":{\"number\":\"B5\"}},{\"seat\":{\"number\":\"B6\"}},{\"seat\":{\"number\":\"B7\"}},{\"seat\":{\"number\":\"B8\"}},{\"seat\":{\"number\":\"B9\"}},{\"seat\":{\"number\":\"B10\"}},\"offset\",{\"seat\":{\"number\":\"B12\"}},{\"seat\":{\"number\":\"B13\"}},{\"seat\":{\"number\":\"B14\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"C1\"}},{\"seat\":{\"number\":\"C2\"}},{\"seat\":{\"number\":\"C3\"}},\"offset\",{\"seat\":{\"number\":\"C5\"}},{\"seat\":{\"number\":\"C6\"}},{\"seat\":{\"number\":\"C7\"}},{\"seat\":{\"number\":\"C8\"}},{\"seat\":{\"number\":\"C9\"}},{\"seat\":{\"number\":\"C10\"}},\"offset\",{\"seat\":{\"number\":\"C12\"}},{\"seat\":{\"number\":\"C13\"}},{\"seat\":{\"number\":\"C14\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"D1\"}},{\"seat\":{\"number\":\"D2\"}},{\"seat\":{\"number\":\"D3\"}},\"offset\",{\"seat\":{\"number\":\"D5\"}},{\"seat\":{\"number\":\"D6\"}},{\"seat\":{\"number\":\"D7\"}},{\"seat\":{\"number\":\"D8\"}},{\"seat\":{\"number\":\"D9\"}},{\"seat\":{\"number\":\"D10\"}},\"offset\",{\"seat\":{\"number\":\"D12\"}},{\"seat\":{\"number\":\"D13\"}},{\"seat\":{\"number\":\"D14\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"E1\"}},{\"seat\":{\"number\":\"E2\"}},{\"seat\":{\"number\":\"E3\"}},\"offset\",{\"seat\":{\"number\":\"E5\"}},{\"seat\":{\"number\":\"E6\"}},{\"seat\":{\"number\":\"E7\"}},{\"seat\":{\"number\":\"E8\"}},{\"seat\":{\"number\":\"E9\"}},{\"seat\":{\"number\":\"E10\"}},\"offset\",{\"seat\":{\"number\":\"E12\"}},{\"seat\":{\"number\":\"E13\"}},{\"seat\":{\"number\":\"E14\"}}]},{\"margin\":true,\"row\":[\"offset\",\"offset\",{\"seat\":{\"number\":\"F3\"}},\"offset\",{\"seat\":{\"number\":\"F5\"}},{\"seat\":{\"number\":\"F6\"}},{\"seat\":{\"number\":\"F7\"}},{\"seat\":{\"number\":\"F8\"}},{\"seat\":{\"number\":\"F9\"}},{\"seat\":{\"number\":\"F10\"}},\"offset\",{\"seat\":{\"number\":\"F12\"}},\"offset\",\"offset\"]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"G1\"}},{\"seat\":{\"number\":\"G2\"}},{\"seat\":{\"number\":\"G3\"}},\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",{\"seat\":{\"number\":\"G12\"}},{\"seat\":{\"number\":\"G13\"}},{\"seat\":{\"number\":\"G14\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"H1\"}},{\"seat\":{\"number\":\"H2\"}},{\"seat\":{\"number\":\"H3\"}},\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",{\"seat\":{\"number\":\"H12\"}},{\"seat\":{\"number\":\"H13\"}},{\"seat\":{\"number\":\"H14\"}}]},{\"margin\":true,\"row\":[{\"seat\":{\"number\":\"I1\"}},{\"seat\":{\"number\":\"I2\"}},{\"seat\":{\"number\":\"I3\"}},\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",{\"seat\":{\"number\":\"I12\"}},{\"seat\":{\"number\":\"I13\"}},{\"seat\":{\"number\":\"I14\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"J1\"}},{\"seat\":{\"number\":\"J2\"}},{\"seat\":{\"number\":\"J3\"}},\"offset\",{\"seat\":{\"number\":\"J5\"}},{\"seat\":{\"number\":\"J6\"}},{\"seat\":{\"number\":\"J7\"}},{\"seat\":{\"number\":\"J8\"}},{\"seat\":{\"number\":\"J9\"}},{\"seat\":{\"number\":\"J10\"}},\"offset\",{\"seat\":{\"number\":\"J12\"}},{\"seat\":{\"number\":\"J13\"}},{\"seat\":{\"number\":\"J14\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"K1\"}},{\"seat\":{\"number\":\"K2\"}},{\"seat\":{\"number\":\"K3\"}},\"offset\",{\"seat\":{\"number\":\"K5\"}},{\"seat\":{\"number\":\"K6\"}},{\"seat\":{\"number\":\"K7\"}},{\"seat\":{\"number\":\"K8\"}},{\"seat\":{\"number\":\"K9\"}},{\"seat\":{\"number\":\"K10\"}},\"offset\",{\"seat\":{\"number\":\"K12\"}},{\"seat\":{\"number\":\"K13\"}},{\"seat\":{\"number\":\"K14\"}}]}]', 'C'),
(4, '[{\"margin\":false,\"row\":[\"offset\",\"offset\",{\"seat\":{\"number\":\"A3\"}},{\"seat\":{\"number\":\"A4\"}},{\"seat\":{\"number\":\"A5\"}},{\"seat\":{\"number\":\"A6\"}},{\"seat\":{\"number\":\"A7\"}},{\"seat\":{\"number\":\"A8\"}},\"offset\",\"offset\"]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"B1\"}},{\"seat\":{\"number\":\"B2\"}},{\"seat\":{\"number\":\"B3\"}},{\"seat\":{\"number\":\"B4\"}},{\"seat\":{\"number\":\"B5\"}},{\"seat\":{\"number\":\"B6\"}},{\"seat\":{\"number\":\"B7\"}},{\"seat\":{\"number\":\"B8\"}},{\"seat\":{\"number\":\"B9\"}},{\"seat\":{\"number\":\"B10\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"C1\"}},{\"seat\":{\"number\":\"C2\"}},{\"seat\":{\"number\":\"C3\"}},{\"seat\":{\"number\":\"C4\"}},{\"seat\":{\"number\":\"C5\"}},{\"seat\":{\"number\":\"C6\"}},{\"seat\":{\"number\":\"C7\"}},{\"seat\":{\"number\":\"C8\"}},{\"seat\":{\"number\":\"C9\"}},{\"seat\":{\"number\":\"C10\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"D1\"}},{\"seat\":{\"number\":\"D2\"}},{\"seat\":{\"number\":\"D3\"}},{\"seat\":{\"number\":\"D4\"}},{\"seat\":{\"number\":\"D5\"}},{\"seat\":{\"number\":\"D6\"}},{\"seat\":{\"number\":\"D7\"}},{\"seat\":{\"number\":\"D8\"}},{\"seat\":{\"number\":\"D9\"}},{\"seat\":{\"number\":\"D10\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"E1\"}},{\"seat\":{\"number\":\"E2\"}},{\"seat\":{\"number\":\"E3\"}},{\"seat\":{\"number\":\"E4\"}},{\"seat\":{\"number\":\"E5\"}},{\"seat\":{\"number\":\"E6\"}},{\"seat\":{\"number\":\"E7\"}},{\"seat\":{\"number\":\"E8\"}},{\"seat\":{\"number\":\"E9\"}},{\"seat\":{\"number\":\"E10\"}}]},{\"margin\":true,\"row\":[\"offset\",\"offset\",{\"seat\":{\"number\":\"F3\"}},{\"seat\":{\"number\":\"F4\"}},{\"seat\":{\"number\":\"F5\"}},{\"seat\":{\"number\":\"F6\"}},{\"seat\":{\"number\":\"F7\"}},{\"seat\":{\"number\":\"F8\"}},{\"seat\":{\"number\":\"F9\"}},{\"seat\":{\"number\":\"F10\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"G1\"}},{\"seat\":{\"number\":\"G2\"}},{\"seat\":{\"number\":\"G3\"}},\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",{\"seat\":{\"number\":\"G10\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"H1\"}},{\"seat\":{\"number\":\"H2\"}},{\"seat\":{\"number\":\"H3\"}},\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",{\"seat\":{\"number\":\"H10\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"I1\"}},{\"seat\":{\"number\":\"I2\"}},{\"seat\":{\"number\":\"I3\"}},\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",{\"seat\":{\"number\":\"I10\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"J1\"}},{\"seat\":{\"number\":\"J2\"}},{\"seat\":{\"number\":\"J3\"}},{\"seat\":{\"number\":\"J4\"}},{\"seat\":{\"number\":\"J5\"}},{\"seat\":{\"number\":\"J6\"}},{\"seat\":{\"number\":\"J7\"}},{\"seat\":{\"number\":\"J8\"}},{\"seat\":{\"number\":\"J9\"}},{\"seat\":{\"number\":\"J10\"}}]},{\"margin\":true,\"row\":[{\"seat\":{\"number\":\"K1\"}},{\"seat\":{\"number\":\"K2\"}},{\"seat\":{\"number\":\"K3\"}},{\"seat\":{\"number\":\"K4\"}},{\"seat\":{\"number\":\"K5\"}},{\"seat\":{\"number\":\"K6\"}},{\"seat\":{\"number\":\"K7\"}},{\"seat\":{\"number\":\"K8\"}},{\"seat\":{\"number\":\"K9\"}},{\"seat\":{\"number\":\"K10\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"L1\"}},{\"seat\":{\"number\":\"L2\"}},{\"seat\":{\"number\":\"L3\"}},{\"seat\":{\"number\":\"L4\"}},{\"seat\":{\"number\":\"L5\"}},{\"seat\":{\"number\":\"L6\"}},{\"seat\":{\"number\":\"L7\"}},{\"seat\":{\"number\":\"L8\"}},{\"seat\":{\"number\":\"L9\"}},{\"seat\":{\"number\":\"L10\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"M1\"}},{\"seat\":{\"number\":\"M2\"}},{\"seat\":{\"number\":\"M3\"}},{\"seat\":{\"number\":\"M4\"}},{\"seat\":{\"number\":\"M5\"}},{\"seat\":{\"number\":\"M6\"}},{\"seat\":{\"number\":\"M7\"}},{\"seat\":{\"number\":\"M8\"}},{\"seat\":{\"number\":\"M9\"}},{\"seat\":{\"number\":\"M10\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"N1\"}},{\"seat\":{\"number\":\"N2\"}},{\"seat\":{\"number\":\"N3\"}},{\"seat\":{\"number\":\"N4\"}},{\"seat\":{\"number\":\"N5\"}},{\"seat\":{\"number\":\"N6\"}},{\"seat\":{\"number\":\"N7\"}},{\"seat\":{\"number\":\"N8\"}},{\"seat\":{\"number\":\"N9\"}},{\"seat\":{\"number\":\"N10\"}}]}]', 'D');

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `movie_id` int(11) NOT NULL,
  `title` varchar(130) DEFAULT NULL,
  `duration` time DEFAULT NULL,
  `genre` varchar(105) DEFAULT NULL,
  `description` text,
  `imagePath` varchar(200) DEFAULT NULL,
  `cast` text,
  `year` int(11) DEFAULT NULL,
  `feature` int(11) DEFAULT NULL,
  `release_date` datetime DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `status` varchar(20) DEFAULT 'PENDING',
  `admin_requested` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`movie_id`, `title`, `duration`, `genre`, `description`, `imagePath`, `cast`, `year`, `feature`, `release_date`, `rating`, `status`, `admin_requested`) VALUES
(1, 'Ready Player One', '02:20:00', 'Action', 'When the creator of a virtual reality world called the OASIS dies, he releases a video in which he challenges all OASIS users to find his Easter Egg, which will give the finder his fortune.', 'https://image.ibb.co/gVP1un/ready_Player_One.jpg', 'Tye Sheridan, Olivia Cooke, Ben Mendelsohn', 2018, 3, '2018-03-18 00:00:00', 8, 'ACCEPTED', NULL),
(2, 'I Can Only Imagine', '01:50:00', 'Drama', 'The inspiring and unknown true story behind MercyMes beloved, chart topping song that brings ultimate hope to so many is a gripping reminder of the power of true forgiveness.', 'https://image.ibb.co/g20Njn/ICan_Only_Imagine.jpg', 'Dennis Quaid, J. Michael Finley, Brody Rose', 2018, 3, '2018-03-15 00:00:00', 7.6, 'ACCEPTED', NULL),
(3, 'Tomb Raider', '01:58:00', 'Action', 'Lara Croft, the fiercely independent daughter of a missing adventurer, must push herself beyond her limits when she finds herself on the island where her father disappeared.', 'https://image.ibb.co/gq0SH7/Tomb_Raider.jpg', 'Alicia Vikander, Dominic West, Walton Goggins', 2018, 3, '2018-03-07 00:00:00', 6.8, 'ACCEPTED', NULL),
(4, 'Love, Simon', '01:50:00', 'Comedy', 'Simon Spier keeps a huge secret from his family, his friends, and all of his classmates: he is gay. When that secret is threatened, Simon must face everyone and come to terms with his identity.', 'https://image.ibb.co/fVygc7/Love_Simon.jpg', 'Nick Robinson, Jennifer Garner, Josh Duhamel', 2018, 3, '2018-03-16 00:00:00', 8.1, 'ACCEPTED', NULL),
(5, 'Pacific Rim Uprising', '01:51:00', 'Action', 'Jake Pentecost, son of Stacker Pentecost, reunites with Mako Mori to lead a new generation of Jaeger pilots, including rival Lambert and 15-year-old hacker Amara, against a new Kaiju threat.', 'https://image.ibb.co/fYSzx7/Pacific_Rim.jpg', 'John Boyega, Scott Eastwood, Cailee Spaeny', 2018, 3, '2018-03-21 00:00:00', 6, 'ACCEPTED', NULL),
(6, 'Tyler Perrys Acrimony', '02:00:00', 'Thriller', 'A faithful wife, tired of standing by her devious husband, is enraged when it becomes clear she has been betrayed.', 'https://image.ibb.co/cHDvpn/Tyler_Perrys_Acrimony.jpg', 'Taraji P. Henson, Lyriq Bent, Crystle Stewar', 2018, 3, '2018-03-30 00:00:00', 4.6, 'ACCEPTED', NULL),
(7, 'Midnight Sun', '01:31:00', 'Drama', 'A 17-year-old girl suffers from a condition that prevents her from being out in the sunlight.', 'https://image.ibb.co/eB19FS/Midnight_Sun.jpg', 'Bella Thorne, Patrick Schwarzenegger, Rob Riggle', 2018, 3, '2018-03-22 00:00:00', 6.1, 'ACCEPTED', NULL),
(8, 'Unsane', '01:38:00', 'Horror', 'A young woman is involuntarily committed to a mental institution, where she is confronted by her greatest fear--but is it real or a product of her delusion?', 'https://image.ibb.co/c1xVpn/Unsane.jpg', 'Claire Foy, Joshua Leonard, Jay Pharoah', 2018, 3, '2018-03-21 00:00:00', 6.8, 'ACCEPTED', NULL),
(9, 'God is not Dead: A Light in Darkness', '02:00:00', 'Drama', 'Pastor Dave responds to the unimaginable tragedy of having his church, located on the grounds of the local university, burned down.', 'https://image.ibb.co/nR94FS/God_Is_Not_Dead_A_Light_In_Darkness.jpg', 'David A.R. White, John Corbett, Shane Harper', 2018, 3, '2018-03-30 00:00:00', 2.5, 'ACCEPTED', NULL),
(10, 'Paul, Apostle of Christ', '01:48:00', 'Drama', 'The story covers Paul going from the most infamous persecutor of Christians to Jesus Christs most influential apostle.', 'https://image.ibb.co/dgU1Un/poly.jpg', 'Jim Caviezel, James Faulkner, Olivier Martinez', 2018, 3, '2018-03-23 00:00:00', 7, 'ACCEPTED', NULL),
(11, 'The Hurricane Heist', '01:43:00', 'Thriller', 'Thieves attempt a massive heist against the U.S. Treasury as a Category 5 hurricane approaches one of its Mint facilities.', 'https://image.ibb.co/ezJLN7/HURRICANEHEIST_QUAD_preview_600x450.jpg', 'Toby Kebbell, Maggie Grace, Ryan Kwanten', 2018, 3, '2018-03-09 00:00:00', 4.9, 'ACCEPTED', NULL),
(12, 'The Strangers: Prey at Night', '01:25:00', 'Horror', 'A family of four staying at a secluded mobile home park for the night are stalked and then hunted by three masked psychopaths.', 'https://image.ibb.co/kkBA5S/strangerset1.jpg', 'Christina Hendricks, Bailee Madison, Martin Henderson', 2018, 3, '2018-03-09 00:00:00', 5.8, 'ACCEPTED', NULL),
(13, 'Sherlock Gnomes', '01:26:00', 'Animation', 'Garden gnomes, Gnomeo & Juliet, recruit renowned detective Sherlock Gnomes to investigate the mysterious disappearance of other garden ornaments.', 'https://image.ibb.co/fMgos7/index.jpg', 'Kelly Asbury, Mary J. Blige, Emily Blunt', 2018, 3, '2018-03-23 00:00:00', 4.8, 'ACCEPTED', NULL),
(14, 'A Wrinkle in Time', '01:49:00', 'Adventure', 'After the disappearance of her scientist father, three peculiar beings send Meg, her brother, and her friend to space in order to find him. ', 'https://image.ibb.co/gjGA5S/index.jpg', 'Storm Reid, Oprah Winfrey, Reese Witherspoon', 2018, 3, '2018-03-09 00:00:00', 4.2, 'ACCEPTED', NULL),
(15, 'Birthmarked', '01:30:00', 'Comedy', 'Two scientists raise 3 children contrarily to their genetic tendencies to prove the ultimate power of nurture over nature. ', 'https://image.ibb.co/eyrren/birth_Marked.jpg', 'Matthew Goode, Toni Collette, Fionnula Flanagan', 2018, 3, '2018-03-30 00:00:00', 5.5, 'ACCEPTED', NULL),
(16, 'Detroit', '02:33:00', 'Crime', 'Fact-based drama set during the 1967 Detroit riots in which a group of rogue police officers respond to a complaint with retribution rather than justice on their minds.', 'https://image.ibb.co/kDagC7/indexx.jpg', 'John Boyega, Anthony Mackie, Algee Smith', 2017, 0, '2017-08-04 00:00:00', 7.4, 'ACCEPTED', NULL),
(17, 'Logan', '02:33:00', 'Action', 'In the near future, a weary Logan cares for an ailing Professor X,somewhere on the Mexican border.However, Logans attempts to hide from the world, and his legacy,are upended when a young mutant arrives, pursued by dark forces', 'https://image.ibb.co/icxBC7/170244.jpg', 'Hugh Jackman, Patrick Stewart, Dafne Keen', 2017, 0, '2017-03-03 00:00:00', 8.1, 'ACCEPTED', NULL),
(18, 'Dunkirk', '01:46:00', 'Action', 'Allied soldiers from Belgium, the British Empire and France are surrounded by the German Army, and evacuated during a fierce battle in World War II.', 'https://image.ibb.co/ggHNKn/Christopher_Segunda_Guerra_Mundial_Dunkerque_MEDIMA20170718_0058_31.jpg', 'Fionn Whitehead, Barry Keoghan, Mark Rylance', 2017, 0, '2017-07-21 00:00:00', 8, 'ACCEPTED', NULL),
(19, 'Getout', '01:44:00', 'Horror', 'A young African-American visits his white girlfriends parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.', 'https://image.ibb.co/gJUrC7/indeex.jpg', 'Daniel Kaluuya, Allison Williams, Bradley Whitford', 2017, 0, '2017-02-24 00:00:00', 7.7, 'ACCEPTED', NULL),
(20, 'The post', '01:56:00', 'Biography', 'A cover-up that spanned four U.S. Presidents pushed the countrys first female newspaperpublisher and a hard-driving editor to join an unprecedented battle between the press and the government.', 'https://image.ibb.co/dE9f5S/indyex.jpg', 'Meryl Streep, Tom Hanks, Sarah Paulson ', 2017, 0, '2017-01-12 00:00:00', 7.3, 'ACCEPTED', NULL),
(21, 'Acts of Violence', '01:25:00', 'Action', 'When his fiancee is kidnapped by human traffickers, Roman (Ashton Holmes) and his ex-military brothers set out to track her down and save her before it is too late.', 'https://image.ibb.co/cbSYQS/indeyyx.jpg', 'Bruce Willis, Cole Hauser, Shawn Ashmore ', 2018, 1, '2018-01-12 00:00:00', 5, 'ACCEPTED', NULL),
(22, 'Forever My Girl', '01:48:00', 'Drama', 'After being gone for a decade a country star returns home to the love he left behind.', 'https://image.ibb.co/jPDq5S/FOREVER_MY_GIRL_1024x576.jpg', 'Alex Roe, Jessica Rothe, John Benjamin Hickey ', 2018, 1, '2018-01-19 00:00:00', 6.1, 'ACCEPTED', NULL),
(23, '12 Strong', '02:10:00', 'Action', '12 Strong tells the story of the first Special Forces team deployed to Afghanistan after 9/11; under the leadership of a new captain, the team must work with an Afghan warlord to take down for the Taliban.', 'https://image.ibb.co/hm7iQS/12_Strong_2018_movie_poster.jpg', 'Chris Hemsworth, Michael Shannon, Michael Peña  ', 2018, 1, '2018-01-19 00:00:00', 7, 'ACCEPTED', NULL),
(24, 'Maze Runner: The Death Cure', '02:21:00', 'Action', 'Young hero Thomas embarks on a mission to find a cure for a deadly disease known as the \"Flare\".', 'https://image.ibb.co/dpgMC7/indyeuyx.jpg', 'Dylan O Brien, Ki Hong Lee, Kaya Scodelario   ', 2018, 1, '2018-01-19 00:00:00', 7, 'ACCEPTED', NULL),
(25, 'Den of Thieves', '02:20:00', 'Action', 'A gritty crime saga which follows the lives of an elite unit of the LA County Sheriff s Dept. and the state s most successful bank robbery crew as the outlaws plan a seemingly impossible heist on the Federal Reserve Bank.', 'https://image.ibb.co/d53q5S/denofthievesheader.jpg', 'Gerard Butler, Pablo Schreiber, O Shea Jackson Jr.', 2018, 1, '2018-01-19 00:00:00', 7.1, 'ACCEPTED', NULL),
(26, 'Black Panther', '02:14:00', 'Action', 'T Challa, the King of Wakanda, rises to the throne in the isolated, technologically advanced African nation, but his claim is challenged by a vengeful outsider who was a childhood victim of T Challa s father s mistake.', 'https://image.ibb.co/cOmos7/pt_blackpanther_characterposter_panther_123cbd2f.jpg', 'Chadwick Boseman, Michael B. Jordan, Lupita Nyong', 2018, 2, '2018-02-16 00:00:00', 7.8, 'ACCEPTED', NULL),
(27, 'Peter Rabbit', '01:35:00', 'Animation', 'Feature adaptation of Beatrix Potters classic tale of a rebellious rabbit trying to sneak into a farmers vegetable garden.', 'https://image.ibb.co/m4Xpzn/inoidex.jpg', 'James Corden, Fayssal Bazzi, Domhnall Gleeson', 2018, 2, '2018-02-09 00:00:00', 6.5, 'ACCEPTED', NULL),
(28, 'Game Night', '01:40:00', 'Comedy', 'A group of friends who meet regularly for game nights find themselves entangled in a real-life mystery.', 'https://image.ibb.co/hNO7kS/indekkx.jpg', 'Jason Bateman, Rachel McAdams, Kyle Chandler', 2018, 2, '2018-02-23 00:00:00', 7.4, 'ACCEPTED', NULL),
(29, 'Annihilation', '01:55:00', 'Adventure', 'A biologist signs up for a dangerous, secret expedition into a mysterious zone where the laws of nature dont apply.', 'https://image.ibb.co/iovWC7/MV5_BMTk2_Mjc2_Nz_Yx_Nl5_BMl5_Ban_Bn_Xk_Ft_ZTgw_MTA2_OTA1_NDM_V1_UY1200_CR69_0_630_1200_AL.jpg', 'Natalie Portman, Jennifer Jason Leigh, Tessa Thompson', 2018, 2, '2018-02-23 00:00:00', 7.1, 'ACCEPTED', NULL),
(30, 'Every Day', '01:37:00', 'Drama', 'A shy teenager falls for someone who transforms into another person every day.', 'https://image.ibb.co/ig87kS/1650x650_Every_Day_Official_Movie_Auctionsdate.jpg', 'Angourie Rice, Justice Smith, Debby Ryan', 2018, 2, '2018-02-23 00:00:00', 5.9, 'ACCEPTED', NULL),
(31, NULL, '02:37:00', 'att', 'Witnessing the Killing of his father as a kid, Ibraheim is dragged to the criminal underworld of Egypt. While making a name for himself, his plans meets Abdul-Malek Zarzur, the crime lord of the town.', 'https://image.ibb.co/hqBDWn/ibrahim.jpg', 'Ahmed el-Sakka,  Hend Sabry,  Amr Waked', 2009, 2, '2009-02-23 00:00:00', 7.4, 'PENDING', 'Amir_Karara'),
(32, 'last goodbye', NULL, 'Cry', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Amir_Karara'),
(33, 'last goodbye', NULL, 'Cry', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Andrew_Shady'),
(34, 'last goodbye', '02:00:00', 'Cry', 'An Egyptian woman discovers that her husband is in fact a Jewish Mossad agent working for Israel. ', NULL, 'Kareem Abdel-Aziz,  Sherif Mounir,  Mona Zaki', 2009, 2, NULL, 7.4, 'PENDING', 'Andrew_Shady'),
(35, ' Fasel wa Naood', '04:00:00', 'Comedy', 'The film story revolves around a taxi driver who has a son and a friend. His sons grandfather is fighting for the custody of the young boy after the death of his mother.', 'https://image.ibb.co/enK0Bn/fasl.jpg', 'Karim Abdel Aziz,  Dina Fuad,  Ahmed Rateb', 2012, 2, '2009-02-23 00:00:00', 6.5, 'PENDING', 'Israa_Yasser'),
(39, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'PENDING', NULL),
(40, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'PENDING', NULL),
(41, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'PENDING', NULL),
(42, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'PENDING', NULL),
(43, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'PENDING', NULL),
(44, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'PENDING', NULL),
(45, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'PENDING', NULL),
(46, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'PENDING', NULL),
(47, 'the jos', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'PENDING', 'Israa_Yasser'),
(48, 'the jos', '04:00:40', 'Mystery', 'I love u, u love me!', 'https://ivev', 'joe and ron weasly', 2020, 7, '2009-02-23 00:00:00', 8.9, 'ACCEPTED', 'Israa_Yasser'),
(49, 'the jos', '04:00:40', 'Mystery', 'I love u, u love me!', 'https://ivev', 'joe and ron weasly', 2020, 7, '2009-02-23 00:00:00', 8.9, 'PENDING', 'Israa_Yasser'),
(50, 'the jos', '04:00:40', 'Mystery', 'I love u, u love me!', 'https://ivev', 'joe and ron weasly', 2020, 7, '2009-02-23 00:00:00', 8.9, 'PENDING', 'Israa_Yasser'),
(51, 'the jos', '04:00:40', 'Mystery', 'I love u, u love me!', 'https://ivev', 'joe and ron weasly', 2020, 7, '2009-02-23 00:00:00', 8.9, 'PENDING', 'Israa_Yasser'),
(52, 'the jos', '04:00:40', 'Mystery', 'I love u, u love me!', 'https://ivev', 'joe and ron weasly', 2020, 7, '2009-02-23 00:00:00', 8.9, 'ACCEPTED', 'Israa_Yasser'),
(53, 'the dibo', '04:00:40', 'Mystery', 'I love u, u love me!', 'https://ivev', 'joe and ron weasly', 2020, 7, '2009-02-23 00:00:00', 8.9, 'PENDING', 'Israa_Yasser');

-- --------------------------------------------------------

--
-- Table structure for table `movies_in_cinemas`
--

CREATE TABLE `movies_in_cinemas` (
  `movie` int(11) DEFAULT NULL,
  `cinema_location` varchar(20) DEFAULT NULL,
  `cinema_name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `movies_in_cinemas`
--

INSERT INTO `movies_in_cinemas` (`movie`, `cinema_location`, `cinema_name`) VALUES
(1, 'New Cairo', 'Galaxy Cinema'),
(1, 'Mokattam', 'Cinema Mawlana'),
(1, '9th of Mayo', 'Mayo Movies'),
(1, 'Old Cairo', 'El Zaaeem El Cinema'),
(1, 'New Cairo', 'Point 90'),
(1, 'Al Haram', 'Pharoahs Cinema'),
(2, 'New Cairo', 'Galaxy Cinema'),
(2, 'Mokattam', 'Cinema Mawlana'),
(2, '9th of Mayo', 'Mayo Movies'),
(2, 'Old Cairo', 'El Zaaeem El Cinema'),
(2, 'New Cairo', 'Point 90'),
(2, 'Al Haram', 'Pharoahs Cinema'),
(3, 'New Cairo', 'Galaxy Cinema'),
(3, 'Mokattam', 'Cinema Mawlana'),
(3, '9th of Mayo', 'Mayo Movies'),
(3, 'Old Cairo', 'El Zaaeem El Cinema'),
(3, 'New Cairo', 'Point 90'),
(3, 'Al Haram', 'Pharoahs Cinema'),
(4, 'New Cairo', 'Galaxy Cinema'),
(4, 'Mokattam', 'Cinema Mawlana'),
(4, '9th of Mayo', 'Mayo Movies'),
(4, 'Old Cairo', 'El Zaaeem El Cinema'),
(4, 'New Cairo', 'Point 90'),
(4, 'Al Haram', 'Pharoahs Cinema'),
(5, 'New Cairo', 'Galaxy Cinema'),
(5, 'Mokattam', 'Cinema Mawlana'),
(5, '9th of Mayo', 'Mayo Movies'),
(5, 'Old Cairo', 'El Zaaeem El Cinema'),
(5, 'New Cairo', 'Point 90'),
(5, 'Al Haram', 'Pharoahs Cinema'),
(6, 'New Cairo', 'Galaxy Cinema'),
(6, 'Mokattam', 'Cinema Mawlana'),
(6, '9th of Mayo', 'Mayo Movies'),
(6, 'Old Cairo', 'El Zaaeem El Cinema'),
(6, 'New Cairo', 'Point 90'),
(6, 'Al Haram', 'Pharoahs Cinema'),
(7, 'New Cairo', 'Galaxy Cinema'),
(7, 'Mokattam', 'Cinema Mawlana'),
(7, '9th of Mayo', 'Mayo Movies'),
(7, 'Old Cairo', 'El Zaaeem El Cinema'),
(7, 'New Cairo', 'Point 90'),
(7, 'Al Haram', 'Pharoahs Cinema'),
(8, 'New Cairo', 'Galaxy Cinema'),
(8, 'Mokattam', 'Cinema Mawlana'),
(8, '9th of Mayo', 'Mayo Movies'),
(8, 'Old Cairo', 'El Zaaeem El Cinema'),
(8, 'New Cairo', 'Point 90'),
(8, 'Al Haram', 'Pharoahs Cinema'),
(9, 'New Cairo', 'Galaxy Cinema'),
(9, 'Mokattam', 'Cinema Mawlana'),
(9, '9th of Mayo', 'Mayo Movies'),
(9, 'Old Cairo', 'El Zaaeem El Cinema'),
(9, 'New Cairo', 'Point 90'),
(9, 'Al Haram', 'Pharoahs Cinema'),
(10, 'New Cairo', 'Galaxy Cinema'),
(10, 'Mokattam', 'Cinema Mawlana'),
(10, '9th of Mayo', 'Mayo Movies'),
(10, 'Old Cairo', 'El Zaaeem El Cinema'),
(10, 'New Cairo', 'Point 90'),
(10, 'Al Haram', 'Pharoahs Cinema'),
(11, 'New Cairo', 'Galaxy Cinema'),
(11, 'Mokattam', 'Cinema Mawlana'),
(11, '9th of Mayo', 'Mayo Movies'),
(11, 'Old Cairo', 'El Zaaeem El Cinema'),
(11, 'New Cairo', 'Point 90'),
(11, 'Al Haram', 'Pharoahs Cinema'),
(12, 'New Cairo', 'Galaxy Cinema'),
(12, 'Mokattam', 'Cinema Mawlana'),
(12, '9th of Mayo', 'Mayo Movies'),
(12, 'Old Cairo', 'El Zaaeem El Cinema'),
(12, 'New Cairo', 'Point 90'),
(12, 'Al Haram', 'Pharoahs Cinema'),
(13, 'New Cairo', 'Galaxy Cinema'),
(13, 'Mokattam', 'Cinema Mawlana'),
(13, '9th of Mayo', 'Mayo Movies'),
(13, 'Old Cairo', 'El Zaaeem El Cinema'),
(13, 'New Cairo', 'Point 90'),
(13, 'Al Haram', 'Pharoahs Cinema'),
(14, 'New Cairo', 'Galaxy Cinema'),
(14, 'Mokattam', 'Cinema Mawlana'),
(14, '9th of Mayo', 'Mayo Movies'),
(14, 'Old Cairo', 'El Zaaeem El Cinema'),
(14, 'New Cairo', 'Point 90'),
(14, 'Al Haram', 'Pharoahs Cinema'),
(15, 'New Cairo', 'Galaxy Cinema'),
(15, 'Mokattam', 'Cinema Mawlana'),
(15, '9th of Mayo', 'Mayo Movies'),
(15, 'Old Cairo', 'El Zaaeem El Cinema'),
(15, 'New Cairo', 'Point 90'),
(15, 'Al Haram', 'Pharoahs Cinema'),
(16, 'New Cairo', 'Galaxy Cinema'),
(16, 'Mokattam', 'Cinema Mawlana'),
(16, '9th of Mayo', 'Mayo Movies'),
(16, 'Old Cairo', 'El Zaaeem El Cinema'),
(16, 'New Cairo', 'Point 90'),
(16, 'Al Haram', 'Pharoahs Cinema'),
(17, 'New Cairo', 'Galaxy Cinema'),
(17, 'Mokattam', 'Cinema Mawlana'),
(17, '9th of Mayo', 'Mayo Movies'),
(17, 'Old Cairo', 'El Zaaeem El Cinema'),
(17, 'New Cairo', 'Point 90'),
(17, 'Al Haram', 'Pharoahs Cinema'),
(18, 'New Cairo', 'Galaxy Cinema'),
(18, 'Mokattam', 'Cinema Mawlana'),
(18, '9th of Mayo', 'Mayo Movies'),
(18, 'Old Cairo', 'El Zaaeem El Cinema'),
(18, 'New Cairo', 'Point 90'),
(18, 'Al Haram', 'Pharoahs Cinema'),
(19, 'New Cairo', 'Galaxy Cinema'),
(19, 'Mokattam', 'Cinema Mawlana'),
(19, '9th of Mayo', 'Mayo Movies'),
(19, 'Old Cairo', 'El Zaaeem El Cinema'),
(19, 'New Cairo', 'Point 90'),
(19, 'Al Haram', 'Pharoahs Cinema'),
(20, 'New Cairo', 'Galaxy Cinema'),
(20, 'Mokattam', 'Cinema Mawlana'),
(20, '9th of Mayo', 'Mayo Movies'),
(20, 'Old Cairo', 'El Zaaeem El Cinema'),
(20, 'New Cairo', 'Point 90'),
(20, 'Al Haram', 'Pharoahs Cinema'),
(21, 'New Cairo', 'Galaxy Cinema'),
(21, 'Mokattam', 'Cinema Mawlana'),
(21, '9th of Mayo', 'Mayo Movies'),
(21, 'Old Cairo', 'El Zaaeem El Cinema'),
(21, 'New Cairo', 'Point 90'),
(21, 'Al Haram', 'Pharoahs Cinema'),
(22, 'New Cairo', 'Galaxy Cinema'),
(22, 'Mokattam', 'Cinema Mawlana'),
(22, '9th of Mayo', 'Mayo Movies'),
(22, 'Old Cairo', 'El Zaaeem El Cinema'),
(22, 'New Cairo', 'Point 90'),
(22, 'Al Haram', 'Pharoahs Cinema'),
(23, 'New Cairo', 'Galaxy Cinema'),
(23, 'Mokattam', 'Cinema Mawlana'),
(23, '9th of Mayo', 'Mayo Movies'),
(23, 'Old Cairo', 'El Zaaeem El Cinema'),
(23, 'New Cairo', 'Point 90'),
(23, 'Al Haram', 'Pharoahs Cinema'),
(24, 'New Cairo', 'Galaxy Cinema'),
(24, 'Mokattam', 'Cinema Mawlana'),
(24, '9th of Mayo', 'Mayo Movies'),
(24, 'Old Cairo', 'El Zaaeem El Cinema'),
(24, 'New Cairo', 'Point 90'),
(24, 'Al Haram', 'Pharoahs Cinema'),
(25, 'New Cairo', 'Galaxy Cinema'),
(25, 'Mokattam', 'Cinema Mawlana'),
(25, '9th of Mayo', 'Mayo Movies'),
(25, 'Old Cairo', 'El Zaaeem El Cinema'),
(25, 'New Cairo', 'Point 90'),
(25, 'Al Haram', 'Pharoahs Cinema');

-- --------------------------------------------------------

--
-- Table structure for table `parties`
--

CREATE TABLE `parties` (
  `date` date NOT NULL,
  `time` time NOT NULL,
  `hall` int(11) NOT NULL,
  `cinema_location` varchar(20) NOT NULL,
  `cinema_name` varchar(20) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `parties`
--

INSERT INTO `parties` (`date`, `time`, `hall`, `cinema_location`, `cinema_name`, `price`) VALUES
('2018-04-10', '16:00:00', 1, '9th of Mayo', 'Mayo Movies', 50),
('2018-04-14', '10:00:00', 1, 'Al Haram', 'Pharoahs Cinema', 50),
('2018-04-10', '13:00:00', 1, 'Mokattam', 'Cinema Mawlana', 50),
('2018-04-10', '13:00:00', 1, 'New Cairo', 'Galaxy Cinema', 50),
('2018-04-01', '10:00:00', 1, 'New Cairo', 'Point 90', 50),
('2018-04-01', '13:00:00', 1, 'New Cairo', 'Point 90', 50),
('2018-04-10', '13:00:00', 1, 'Old Cairo', 'El Zaaeem El Cinema', 50),
('2018-04-11', '16:00:00', 2, '9th of Mayo', 'Mayo Movies', 50),
('2018-04-14', '16:00:00', 2, 'Al Haram', 'Pharoahs Cinema', 50),
('2018-04-11', '16:00:00', 2, 'Mokattam', 'Cinema Mawlana', 50),
('2018-04-12', '16:00:00', 2, 'New Cairo', 'Galaxy Cinema', 50),
('2018-04-01', '10:00:00', 2, 'New Cairo', 'Point 90', 50),
('2018-04-10', '19:00:00', 2, 'Old Cairo', 'El Zaaeem El Cinema', 50),
('2018-04-12', '19:00:00', 3, '9th of Mayo', 'Mayo Movies', 50),
('2018-04-14', '19:00:00', 3, 'Mokattam', 'Cinema Mawlana', 50),
('2018-04-14', '19:00:00', 3, 'New Cairo', 'Galaxy Cinema', 50),
('2018-04-01', '10:00:00', 3, 'New Cairo', 'Point 90', 0);

-- --------------------------------------------------------

--
-- Table structure for table `promocodes`
--

CREATE TABLE `promocodes` (
  `promocode` varchar(30) NOT NULL,
  `type` varchar(10) NOT NULL,
  `value` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `promocodes`
--

INSERT INTO `promocodes` (`promocode`, `type`, `value`) VALUES
('1H4H1LS0W', 'amount', '1000'),
('1M2NN4N22', 'percentage', '10');

-- --------------------------------------------------------

--
-- Table structure for table `promocodes_cinemas`
--

CREATE TABLE `promocodes_cinemas` (
  `cinema_location` varchar(30) NOT NULL,
  `cinema_name` varchar(30) NOT NULL,
  `promocode` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `promocodes_cinemas`
--

INSERT INTO `promocodes_cinemas` (`cinema_location`, `cinema_name`, `promocode`) VALUES
('9th of Mayo', 'Mayo Movies', '1H4H1LS0W'),
('Al Haram', 'Pharoahs Cinema', '1H4H1LS0W'),
('Mokattam', 'Cinema Mawlana', '1H4H1LS0W'),
('New Cairo', 'Galaxy Cinema', '1H4H1LS0W'),
('New Cairo', 'Point 90', '1H4H1LS0W'),
('Old Cairo', 'El Zaaeem El Cinema', '1H4H1LS0W'),
('9th of Mayo', 'Mayo Movies', '1M2NN4N22'),
('Al Haram', 'Pharoahs Cinema', '1M2NN4N22'),
('Mokattam', 'Cinema Mawlana', '1M2NN4N22'),
('New Cairo', 'Galaxy Cinema', '1M2NN4N22'),
('New Cairo', 'Point 90', '1M2NN4N22'),
('Old Cairo', 'El Zaaeem El Cinema', '1M2NN4N22');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `reservation_id` int(11) NOT NULL,
  `payment` bit(1) DEFAULT NULL,
  `seat_number` varchar(30) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `hall` int(11) NOT NULL,
  `cinema_location` varchar(20) NOT NULL,
  `cinema_name` varchar(20) NOT NULL,
  `user` varchar(115) DEFAULT NULL,
  `movie_id` int(11) NOT NULL,
  `price` float NOT NULL,
  `comment` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`reservation_id`, `payment`, `seat_number`, `date`, `time`, `hall`, `cinema_location`, `cinema_name`, `user`, `movie_id`, `price`, `comment`) VALUES
(2, b'1', '2D', '2018-04-01', '10:00:00', 1, 'New Cairo', 'Point 90', 'Anas_Mohamed', 10, 50, ''),
(3, b'1', '1B', '2018-04-01', '10:00:00', 2, 'New Cairo', 'Point 90', 'Mostafa_Fathy', 11, 50, ''),
(4, b'1', '3C', '2018-04-01', '13:00:00', 1, 'New Cairo', 'Point 90', 'Anas_Mohamed', 19, 50, ''),
(5, b'1', '1A', '2018-04-01', '13:00:00', 1, 'New Cairo', 'Point 90', 'Nour_Gaber', 14, 50, ''),
(6, b'1', '2F', '2018-04-01', '13:00:00', 1, 'New Cairo', 'Point 90', 'Omar_Mehrez', 16, 50, ''),
(7, b'1', '1D', '2018-04-10', '13:00:00', 1, 'New Cairo', 'Galaxy Cinema', 'Hamza_Namira', 19, 50, ''),
(14, b'1', '10D', '2018-04-10', '19:00:00', 2, 'Old Cairo', 'El Zaaeem El Cinema', 'Anas_Mohamed', 1, 50, ''),
(18, b'1', '4F', '2018-04-14', '16:00:00', 2, 'Al Haram', 'Pharoahs Cinema', 'Anas_Mohamed', 9, 50, ''),
(20, b'1', '2C', '2018-04-10', '16:00:00', 1, '9th of Mayo', 'Mayo Movies', 'Mai_Emad', 8, 50, ''),
(21, b'1', '5B', '2018-04-11', '16:00:00', 2, '9th of Mayo', 'Mayo Movies', 'Lola_Wael', 7, 50, ''),
(22, b'1', '6D', '2018-04-11', '16:00:00', 2, '9th of Mayo', 'Mayo Movies', 'Anas_Mohamed', 6, 50, ''),
(23, b'1', '3A', '2018-04-12', '19:00:00', 3, '9th of Mayo', 'Mayo Movies', 'Hamza_Namira', 5, 50, ''),
(24, b'1', '4B', '2018-04-12', '19:00:00', 3, '9th of Mayo', 'Mayo Movies', 'Hamza_Namira', 4, 50, ''),
(25, b'1', '2A', '2018-04-10', '13:00:00', 1, 'Mokattam', 'Cinema Mawlana', 'Farida_Omar', 3, 50, ''),
(30, b'1', '4B', '2018-04-14', '19:00:00', 3, 'Mokattam', 'Cinema Mawlana', 'Mariam_Medhat', 2, 50, '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(115) NOT NULL,
  `password` varchar(130) NOT NULL,
  `email` varchar(130) NOT NULL,
  `phone_number` int(11) DEFAULT NULL,
  `credit_card` varchar(200) DEFAULT NULL,
  `first_name` varchar(115) NOT NULL,
  `last_name` varchar(115) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `active` bit(1) NOT NULL,
  `active_code` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `email`, `phone_number`, `credit_card`, `first_name`, `last_name`, `age`, `gender`, `active`, `active_code`) VALUES
('amir', '$2a$10$Yp5Wv0R9sBPyUlaS0pY0VefrJRrOTHOieoBswWYe4tPSZRA1C.VL2', 'amir.kararaaa@gmail.com', 12344455, '1231231312', 'amir', 'karara', 21, 'male', b'1', ''),
('Anas_Mohamed', 'anasanas123', 'anasmohamed@gmail.com', 1511123623, '5332662665265921', 'Anas', 'Mohamed', 24, 'male', b'1', ''),
('Farida_Omar', 'farida123456', 'faridaomar@yahool.com', 1012100252, '5332225826245445', 'Farida', 'Omar', 31, 'Female', b'1', ''),
('karim', '$2a$10$M1bzU518ETQYUdnkAyKmy.YasH/96vJvS8.QADL/aBDpDkv/eATcS', 'karim.shibl97@gmail.com', 123213, '12312312', 'karim', 'shibl', 21, 'male', b'1', ''),
('Lola_Wael', 'ttfr542', 'lulu97@gmail.com', 2033344999, '868955550011', 'Lola', 'Khalid', 21, 'female', b'1', ''),
('Mai_Emad', 'mimo987', 'maiemad@gmail.com', 1000595987, '5332265526295266', 'Mai', 'Emad', 26, 'Female', b'1', ''),
('Mariam_Medhat', 'mariam456456', 'mariam.medhat@gmail.com', 1226655695, '5333269565956210', 'Mariam', 'Medhat', 26, 'female', b'1', ''),
('Moahmed_Ehab', 'Ehab1234', 'mohamedEhab@gmail.com', 1055215558, '533249998528520', 'Mohamed', 'Ehab', 28, 'male', b'1', ''),
('Mostafa_Fathy', 'mf147258369', 'm.fathy@gmail.com', 1111897676, '5338224662239266', 'Mostafa', 'Fathy', 29, 'male', b'1', ''),
('nasr', '$2a$10$rmNDLY4P9QLcCav7pPFDGOb7t5XDmP7MRz6WAvIE556uYlILKQhPe', 'mnmostafa.nasr@gmail.com', 1288975483, '121212', 'mostafa', 'nasr', 21, 'male', b'1', ''),
('noda', '$2a$10$Hm/0Nnsy8W0gAqkdIQzX.eHHoqBVP7ukrYQ1bF7MtjSrMhpeiFLES', 'amir.karareeeaaa@gmail.com', 12344455, '1231231312', 'amir', 'karara', 21, 'male', b'1', 'LhWjV9bxzXfaq4R3VtyDdbJvDhWF9i4j'),
('Omar_Gamal', 'omarrrr789', 'omargamal@gmail.com', 1000285558, '5332249758558562', 'Omar', 'Gamal', 31, 'male', b'1', ''),
('Omar_Mehrez', '0mar2O15', 'omar.moaz@gmail.com', 2121255589, '5111773865203300', 'Omar', 'Mehrez', 33, 'male', b'1', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actors`
--
ALTER TABLE `actors`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `admins_cinemas`
--
ALTER TABLE `admins_cinemas`
  ADD KEY `cinema_location` (`cinema_location`,`cinema_name`),
  ADD KEY `admin` (`admin`);

--
-- Indexes for table `cinemas`
--
ALTER TABLE `cinemas`
  ADD PRIMARY KEY (`location`,`name`);

--
-- Indexes for table `halls`
--
ALTER TABLE `halls`
  ADD PRIMARY KEY (`hall_number`,`cinema_name`,`cinema_location`),
  ADD KEY `cinema_location` (`cinema_location`,`cinema_name`),
  ADD KEY `movie` (`movie`),
  ADD KEY `layout` (`layout`);

--
-- Indexes for table `layout`
--
ALTER TABLE `layout`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`movie_id`),
  ADD KEY `admin_requested` (`admin_requested`);

--
-- Indexes for table `movies_in_cinemas`
--
ALTER TABLE `movies_in_cinemas`
  ADD KEY `cinema_location` (`cinema_location`,`cinema_name`),
  ADD KEY `movie` (`movie`);

--
-- Indexes for table `parties`
--
ALTER TABLE `parties`
  ADD PRIMARY KEY (`hall`,`cinema_location`,`cinema_name`,`date`,`time`),
  ADD KEY `hall` (`hall`,`cinema_name`,`cinema_location`);

--
-- Indexes for table `promocodes`
--
ALTER TABLE `promocodes`
  ADD PRIMARY KEY (`promocode`);

--
-- Indexes for table `promocodes_cinemas`
--
ALTER TABLE `promocodes_cinemas`
  ADD PRIMARY KEY (`cinema_location`,`cinema_name`,`promocode`),
  ADD KEY `promocode` (`promocode`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`reservation_id`,`seat_number`,`hall`,`cinema_name`,`cinema_location`),
  ADD KEY `date_time` (`hall`,`cinema_name`,`cinema_location`),
  ADD KEY `user` (`user`),
  ADD KEY `movie_id` (`movie_id`),
  ADD KEY `date` (`date`,`time`),
  ADD KEY `date_2` (`date`,`time`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `layout`
--
ALTER TABLE `layout`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `reservation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `admins_cinemas`
--
ALTER TABLE `admins_cinemas`
  ADD CONSTRAINT `Admins_Cinemas_ibfk_1` FOREIGN KEY (`cinema_location`,`cinema_name`) REFERENCES `cinemas` (`location`, `name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Admins_Cinemas_ibfk_2` FOREIGN KEY (`admin`) REFERENCES `admins` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `movies_in_cinemas`
--
ALTER TABLE `movies_in_cinemas`
  ADD CONSTRAINT `Movies_in_Cinemas_ibfk_1` FOREIGN KEY (`cinema_location`,`cinema_name`) REFERENCES `cinemas` (`location`, `name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Movies_in_Cinemas_ibfk_2` FOREIGN KEY (`movie`) REFERENCES `movies` (`movie_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;