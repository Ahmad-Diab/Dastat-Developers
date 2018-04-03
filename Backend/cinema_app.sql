-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 01, 2018 at 09:22 PM
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

CREATE TABLE `Actors` (
  `name` varchar(115) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `birth_date` datetime DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `bio` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Actors`
--

INSERT INTO `Actors` (`name`, `age`, `birth_date`, `gender`, `bio`) VALUES
('Alicia Vikander', 29, '1988-10-03 00:00:00', 'Female', 'Alicia Vikander is a Swedish actress, dancer and producer. She was born and raised in Gothenburg, Västra Götalands län, Sweden, to Maria Fahl-Vikander, an actress of stage and screen, and Svante Vikander, a psychiatrist. She is of Swedish and one quarter Finnish descent.'),
('Bella Thorne', 20, '1997-10-08 00:00:00', 'Female', 'Bella Thorne was born in Pembroke Pines, Florida, to Tamara (Beckett) and Delancey Reinaldo \"Rey\" Thorne. She has three siblings, Remy Thorne, Dani Thorne and Kaili Thorne, all of whom have also acted. She is of Cuban (father) and Irish, Italian, English, German, and Welsh (mother) ancestry.'),
('Chadwick Boseman', 40, '1996-11-29 00:00:00', 'Male', 'Chadwick Boseman is an American actor. He is known for his portrayal of TChalla / Black Panther in the Marvel Cinematic Universe (since 2016), particular in Black Panther (2018), and for his starring roles in as Jackie Robinson in 42 (2013), James Brown in Get on Up (2014), and Thurgood Marshall in Marshall (2017).'),
('Dennis Quaid', 63, '1954-04-09 00:00:00', 'Male', 'Dennis Quaid was born in Houston, Texas, to Juanita Bonniedale (Jordan), a real estate agent, and William Rudy Quaid, an electrician. He grew up in the Houston suburban city of Bellaire. He was raised a Baptist, and studied drama, Mandarin Chinese, and dance while a student at Bellaire High School.'),
('Hugh Jackman', 49, '1968-10-12 00:00:00', 'Male', 'Hugh Michael Jackman is an Australian actor, singer, multi-instrumentalist, dancer and producer. Jackman has won international recognition for his roles in major films, notably as superhero, period, and romance characters. He is best known for his long-running role as Wolverine in the X-Men film series.'),
('Karen Gillan', 30, '1996-11-28 00:00:00', 'Female', 'Karen Sheila Gillan was born and raised in Inverness, Scotland, the daughter of Marie (Paterson) and John Gillan, who is a singer and recording artist. She developed a love for acting very early on, attending several youth theatre groups and taking part in a wide range of productions at her school, Charleston Academy.'),
('Matthew Goode', 39, '1996-04-03 00:00:00', 'Male', 'Matthew William Goode (born 3 April 1978) is an English actor. His films include Chasing Liberty (2004), Match Point (2005), Imagine Me and You (2006), Brideshead Revisited (2008), Watchmen (2009), A Single Man (2009), Leap Year (2010), Stoker (2013) and The Imitation Game (2014). '),
('Scarlett Johansson', 33, '1996-11-22 00:00:00', 'Female', 'Scarlett Johansson was born in New York City. Her mother, Melanie Sloan, is from a Jewish family from the Bronx, and her father, Karsten Johansson, is a Danish-born architect, from Copenhagen.'),
('Scott Eastwood', 32, '1986-03-21 00:00:00', 'Male', 'Scott Eastwood was born Scott Clinton Reeves in Carmel, Monterey County, California, to Jacelyn Ann Reeves, a flight attendant, and Clint Eastwood, an actor and director. He grew up in Hawaii. Scott has a younger sister, Kathryn Eastwood, and several half-siblings.');

-- --------------------------------------------------------

--
-- Table structure for table `Actors_Movies`
--

CREATE TABLE `Actors_Movies` (
  `actor` varchar(115) NOT NULL,
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

--
-- Dumping data for table `Admins`
--

INSERT INTO `Admins` (`username`, `password`, `email`, `salary`, `type`, `first_name`, `last_name`, `phone_number`, `gender`) VALUES
('Amir_Karara', 'miko333', 'amir.karara@gmail.com', 60000, 'Cinema Owner', 'Amir', 'Karara', 7776644, 'male'),
('Andrew_Shady', 'geeksF0rGeeks', 'masterOfSwift@icloud.com', 4600, 'Booking Usher', 'Andrew', 'Shady', 32332999, 'male'),
('Israa_Yasser', 'yy22mm44', 'f0rtnite017@microsoft.com', 12000, 'Branch Manager', 'Israa', 'Yasser', 2030355152, 'female'),
('Laila_Khaled', 'lailalaila123', 'lailakhalaed@gmail.com', 10000, 'App Owner', 'Laila', 'Khaled', 1111020666, 'female'),
('Yehia_Gamal', 'qwertYehia', 'yehia.gamal@yahoo.com', 50000, 'Admin User', 'Yehia', 'Gamal', 1223378907, 'male');

-- --------------------------------------------------------

--
-- Table structure for table `Admins_Cinemas`
--

CREATE TABLE `Admins_Cinemas` (
  `admin` varchar(20) DEFAULT NULL,
  `cinema_location` varchar(100) DEFAULT NULL,
  `cinema_name` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Admins_Cinemas`
--

INSERT INTO `Admins_Cinemas` (`admin`, `cinema_location`, `cinema_name`) VALUES
('Amir_Karara', 'New Cairo', 'Galaxy Cinema'),
('Amir_Karara', 'Mokattam', 'Cinema Mawlana'),
('Amir_Karara', '9th of Mayo', 'Mayo Movies'),
('Amir_Karara', 'Old Cairo', 'El Zaaeem El Cinema'),
('Amir_Karara', 'New Cairo', 'Point 90'),
('Amir_Karara', 'Al Haram', 'Pharoahs Cinema'),
('Amir_Karara', 'New Cairo', 'Galaxy Cinema'),
('Amir_Karara', 'Mokattam', 'Cinema Mawlana'),
('Amir_Karara', '9th of Mayo', 'Mayo Movies'),
('Amir_Karara', 'Old Cairo', 'El Zaaeem El Cinema'),
('Amir_Karara', 'New Cairo', 'Point 90'),
('Amir_Karara', 'Al Haram', 'Pharoahs Cinema'),
('Andrew_Shady', 'New Cairo', 'Galaxy Cinema'),
('Andrew_Shady', 'Mokattam', 'Cinema Mawlana'),
('Andrew_Shady', '9th of Mayo', 'Mayo Movies'),
('Andrew_Shady', 'Old Cairo', 'El Zaaeem El Cinema'),
('Andrew_Shady', 'New Cairo', 'Point 90'),
('Andrew_Shady', 'Al Haram', 'Pharoahs Cinema'),
('Israa_Yasser', 'New Cairo', 'Galaxy Cinema'),
('Israa_Yasser', 'Mokattam', 'Cinema Mawlana'),
('Israa_Yasser', '9th of Mayo', 'Mayo Movies'),
('Israa_Yasser', 'Old Cairo', 'El Zaaeem El Cinema'),
('Israa_Yasser', 'New Cairo', 'Point 90'),
('Israa_Yasser', 'Al Haram', 'Pharoahs Cinema'),
('Laila_Khaled', 'New Cairo', 'Galaxy Cinema'),
('Laila_Khaled', 'Mokattam', 'Cinema Mawlana'),
('Laila_Khaled', '9th of Mayo', 'Mayo Movies'),
('Laila_Khaled', 'Old Cairo', 'El Zaaeem El Cinema'),
('Laila_Khaled', 'New Cairo', 'Point 90'),
('Laila_Khaled', 'Al Haram', 'Pharoahs Cinema'),
('Yehia_Gamal', 'New Cairo', 'Galaxy Cinema'),
('Yehia_Gamal', 'Mokattam', 'Cinema Mawlana'),
('Yehia_Gamal', '9th of Mayo', 'Mayo Movies'),
('Yehia_Gamal', 'Old Cairo', 'El Zaaeem El Cinema'),
('Yehia_Gamal', 'New Cairo', 'Point 90'),
('Yehia_Gamal', 'Al Haram', 'Pharoahs Cinema');

-- --------------------------------------------------------

--
-- Table structure for table `Cinemas`
--

CREATE TABLE `Cinemas` (
  `location` varchar(100) NOT NULL,
  `address` varchar(200) NOT NULL,
  `name` varchar(115) NOT NULL,
  `number_of_halls` int(11) DEFAULT NULL,
  `company` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Cinemas`
--

INSERT INTO `Cinemas` (`location`, `address`, `name`, `number_of_halls`, `company`) VALUES
('9th of Mayo', '90 Taha Hussien St', 'Mayo Movies', 5, 'Rainassance'),
('Al Haram', '3rd Pyramids Square', 'Pharoahs Cinema', 4, 'Egyptian Producers'),
('Mokattam', '7071, Street 9', 'Cinema Mawlana', 5, 'Rainassance'),
('New Cairo', '70th Cairo Festival Square', 'Galaxy Cinema', 8, 'Galaxco'),
('New Cairo', '100 Street 90, 5th Settlement', 'Point 90', 3, 'Galaxco'),
('Old Cairo', '3 Metropolis, Street 30', 'El Zaaeem El Cinema', 5, 'Rainassance');

-- --------------------------------------------------------

--
-- Table structure for table `Halls`
--

CREATE TABLE `Halls` (
  `cinema_location` varchar(100) NOT NULL,
  `cinema_name` varchar(200) NOT NULL,
  `hall_number` int(11) NOT NULL,
  `type` varchar(15) DEFAULT NULL,
  `layout` int(11) DEFAULT NULL,
  `number_of_seats` int(11) NOT NULL,
  `movie` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Halls`
--

INSERT INTO `Halls` (`cinema_location`, `cinema_name`, `hall_number`, `type`, `layout`, `number_of_seats`, `movie`) VALUES
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
-- Table structure for table `Layout`
--

CREATE TABLE `Layout` (
  `id` int(11) NOT NULL,
  `encoded` varchar(30) DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Layout`
--

INSERT INTO `Layout` (`id`, `encoded`, `name`) VALUES
(1, '', 'A');

-- --------------------------------------------------------

--
-- Table structure for table `Movies`
--

CREATE TABLE `Movies` (
  `movie_id` int(11) NOT NULL,
  `title` varchar(130) DEFAULT NULL,
  `duration` float DEFAULT NULL,
  `genre` varchar(105) DEFAULT NULL,
  `description` text,
  `imagePath` varchar(200) DEFAULT NULL,
  `cast` text,
  `year` int(11) DEFAULT NULL,
  `feature` int(11) DEFAULT NULL,
  `release_date` datetime DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `status` varchar(20) DEFAULT 'PENDING'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Movies` (`movie_id`, `title`, `duration`, `genre`, `description`, `imagePath`, `cast`, `year`, `feature`, `release_date`, `rating`, `status`) VALUES
(1, 'Ready Player One', 2.2, 'Action', 'When the creator of a virtual reality world called the OASIS dies, he releases a video in which he challenges all OASIS users to find his Easter Egg, which will give the finder his fortune.', 'https://ibb.co/m0Ti77', 'Tye Sheridan, Olivia Cooke, Ben Mendelsohn', 2018, 3, '2018-03-18 00:00:00', 8, 'PENDING'),
(2, 'I Can Only Imagine', 1.5, 'Drama', 'The inspiring and unknown true story behind MercyMes beloved, chart topping song that brings ultimate hope to so many is a gripping reminder of the power of true forgiveness.', 'https://ibb.co/k9vBc7', 'Dennis Quaid, J. Michael Finley, Brody Rose', 2018, 3, '2018-03-15 00:00:00', 7.6, 'PENDING'),
(3, 'Tomb Raider', 1.58, 'Action', 'Lara Croft, the fiercely independent daughter of a missing adventurer, must push herself beyond her limits when she finds herself on the island where her father disappeared.', 'https://ibb.co/kL49VS', 'Alicia Vikander, Dominic West, Walton Goggins', 2018, 3, '2018-03-07 00:00:00', 6.8, 'PENDING'),
(4, 'Love, Simon', 1.5, 'Comedy', 'Simon Spier keeps a huge secret from his family, his friends, and all of his classmates: he is gay. When that secret is threatened, Simon must face everyone and come to terms with his identity.', 'https://ibb.co/dRVGAS', 'Nick Robinson, Jennifer Garner, Josh Duhamel', 2018, 3, '2018-03-16 00:00:00', 8.1, 'PENDING'),
(5, 'Pacific Rim Uprising', 1.51, 'Action', 'Jake Pentecost, son of Stacker Pentecost, reunites with Mako Mori to lead a new generation of Jaeger pilots, including rival Lambert and 15-year-old hacker Amara, against a new Kaiju threat.', 'https://ibb.co/cLYuVS', 'John Boyega, Scott Eastwood, Cailee Spaeny', 2018, 3, '2018-03-21 00:00:00', 6, 'PENDING'),
(6, 'Tyler Perrys Acrimony', 2, 'Thriller', 'A faithful wife, tired of standing by her devious husband, is enraged when it becomes clear she has been betrayed.', 'https://ibb.co/heZeFS', 'Taraji P. Henson, Lyriq Bent, Crystle Stewar', 2018, 3, '2018-03-30 00:00:00', 4.6, 'PENDING'),
(7, 'Midnight Sun', 1.31, 'Drama', 'A 17-year-old girl suffers from a condition that prevents her from being out in the sunlight.', 'https://ibb.co/iYNuh7', 'Bella Thorne, Patrick Schwarzenegger, Rob Riggle', 2018, 3, '2018-03-22 00:00:00', 6.1, 'PENDING'),
(8, 'Unsane', 1.38, 'Horror', 'A young woman is involuntarily committed to a mental institution, where she is confronted by her greatest fear--but is it real or a product of her delusion?', 'https://ibb.co/cXpMvS', 'Claire Foy, Joshua Leonard, Jay Pharoah', 2018, 3, '2018-03-21 00:00:00', 6.8, 'PENDING'),
(9, 'God is not Dead: A Light in Darkness', 2, 'Drama', 'Pastor Dave responds to the unimaginable tragedy of having his church, located on the grounds of the local university, burned down.', 'https://ibb.co/bFrJaS', 'David A.R. White, John Corbett, Shane Harper', 2018, 3, '2018-03-30 00:00:00', 2.5, 'PENDING'),
(10, 'Pole, Apostle of Christ', 1.48, 'Drama', 'The story covers Paul going from the most infamous persecutor of Christians to Jesus Christs most influential apostle.', 'https://ibb.co/eE5apn', 'Jim Caviezel, James Faulkner, Olivier Martinez', 2018, 3, '2018-03-23 00:00:00', 7, 'PENDING'),
(11, 'The Hurricane Heist', 1.43, 'Thriller', 'Thieves attempt a massive heist against the U.S. Treasury as a Category 5 hurricane approaches one of its Mint facilities.', 'https://ibb.co/dD0Zh7', 'Toby Kebbell, Maggie Grace, Ryan Kwanten', 2018, 3, '2018-03-09 00:00:00', 4.9, 'PENDING'),
(12, 'The Strangers: Prey at Night', 1.25, 'Horror', 'A family of four staying at a secluded mobile home park for the night are stalked and then hunted by three masked psychopaths.', 'https://ibb.co/hZ1os7', 'Christina Hendricks, Bailee Madison, Martin Henderson', 2018, 3, '2018-03-09 00:00:00', 5.8, 'PENDING'),
(13, 'Sherlock Gnomes', 1.26, 'Animation', 'Garden gnomes, Gnomeo & Juliet, recruit renowned detective Sherlock Gnomes to investigate the mysterious disappearance of other garden ornaments.', 'https://ibb.co/iARzzn', 'Kelly Asbury, Mary J. Blige, Emily Blunt', 2018, 3, '2018-03-23 00:00:00', 4.8, 'PENDING'),
(14, 'A Wrinkle in Time', 1.49, 'Adventure', 'After the disappearance of her scientist father, three peculiar beings send Meg, her brother, and her friend to space in order to find him. ', 'https://ibb.co/kVmos7', 'Storm Reid, Oprah Winfrey, Reese Witherspoon', 2018, 3, '2018-03-09 00:00:00', 4.2, 'PENDING'),
(15, 'Birthmarked', 1.3, 'Comedy', 'Two scientists raise 3 children contrarily to their genetic tendencies to prove the ultimate power of nurture over nature. ', 'https://ibb.co/eahxKn', 'Matthew Goode, Toni Collette, Fionnula Flanagan', 2018, 3, '2018-03-30 00:00:00', 5.5, 'PENDING'),
(18, 'Dunkirk', 1.46, 'Action', 'Allied soldiers from Belgium, the British Empire and France are surrounded by the German Army, and evacuated during a fierce battle in World War II.', 'https://ibb.co/i0BhKn', 'Fionn Whitehead, Barry Keoghan, Mark Rylance', 2017, 0, '2017-07-21 00:00:00', 8, 'PENDING'),
(17, 'Logan', 2.33, 'Action', 'In the near future, a weary Logan cares for an ailing Professor X,somewhere on the Mexican border.However, Logans attempts to hide from the world, and his legacy,are upended when a young mutant arrives, pursued by dark forces', 'https://ibb.co/fAMtQS', 'Hugh Jackman, Patrick Stewart, Dafne Keen', 2017, 0, '2017-03-03 00:00:00', 8.1, 'PENDING'),
(16, 'Detroit', 2.33, 'Crime', 'Fact-based drama set during the 1967 Detroit riots in which a group of rogue police officers respond to a complaint with retribution rather than justice on their minds.', 'https://ibb.co/gyxuX7', 'John Boyega, Anthony Mackie, Algee Smith', 2017, 0, '2017-08-04 00:00:00', 7.4, 'PENDING'),
(19, 'Getout', 1.44, 'Horror', 'A young African-American visits his white girlfriends parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.', 'https://ibb.co/j8E2Kn', 'Daniel Kaluuya, Allison Williams, Bradley Whitford', 2017, 0, '2017-02-24 00:00:00', 7.7, 'PENDING'),
(20, 'The post', 1.56, 'Biography', 'A cover-up that spanned four U.S. Presidents pushed the countrys first female newspaperpublisher and a hard-driving editor to join an unprecedented battle between the press and the government.', 'https://ibb.co/bJPDQS', 'Meryl Streep, Tom Hanks, Sarah Paulson ', 2017, 0, '2017-01-12 00:00:00', 7.3, 'PENDING'),
(21, 'Acts of Violence', 1.26, 'Action', 'When his fiancee is kidnapped by human traffickers, Roman (Ashton Holmes) and his ex-military brothers set out to track her down and save her before it is too late.', 'https://ibb.co/m7Spzn', 'Bruce Willis, Cole Hauser, Shawn Ashmore ', 2018, 1, '2018-01-12 00:00:00', 5, 'PENDING'),
(22, 'Forever My Girl', 1.48, 'Drama', 'After being gone for a decade a country star returns home to the love he left behind.', 'https://ibb.co/eczV5S', 'Alex Roe, Jessica Rothe, John Benjamin Hickey ', 2018, 1, '2018-01-19 00:00:00', 6.1, 'PENDING'),
(24, 'Maze Runner: The Death Cure', 2.21, 'Action', 'Young hero Thomas embarks on a mission to find a cure for a deadly disease known as the \"Flare\".', 'https://ibb.co/bG6os7', 'Dylan O Brien, Ki Hong Lee, Kaya Scodelario   ', 2018, 1, '2018-01-19 00:00:00', 7, 'PENDING'),
(23, '12 Strong', 2.1, 'Action', '12 Strong tells the story of the first Special Forces team deployed to Afghanistan after 9/11; under the leadership of a new captain, the team must work with an Afghan warlord to take down for the Taliban.', 'https://ibb.co/jT9xkS', 'Chris Hemsworth, Michael Shannon, Michael Peña  ', 2018, 1, '2018-01-19 00:00:00', 7, 'PENDING'),
(25, 'Den of Thieves', 2.2, 'Action', 'A gritty crime saga which follows the lives of an elite unit of the LA County Sheriff s Dept. and the state s most successful bank robbery crew as the outlaws plan a seemingly impossible heist on the Federal Reserve Bank.', 'https://ibb.co/bQjKzn', 'Gerard Butler, Pablo Schreiber, O Shea Jackson Jr.', 2018, 1, '2018-01-19 00:00:00', 7.1, 'PENDING'),
(30, 'Every Day', 1.37, 'Drama', 'A shy teenager falls for someone who transforms into another person every day.', 'https://ibb.co/b8c05S', 'Angourie Rice, Justice Smith, Debby Ryan', 2018, 2, '2018-02-23 00:00:00', 5.9, 'PENDING');
(29, 'Annihilation', 1.55, 'Adventure', 'A biologist signs up for a dangerous, secret expedition into a mysterious zone where the laws of nature dont apply.', 'https://ibb.co/kEXpzn', 'Natalie Portman, Jennifer Jason Leigh, Tessa Thompson', 2018, 2, '2018-02-23 00:00:00', 7.1, 'PENDING'),
(28, 'Game Night', 1.4, 'Comedy', 'A group of friends who meet regularly for game nights find themselves entangled in a real-life mystery.', 'https://ibb.co/kgGSkS', 'Jason Bateman, Rachel McAdams, Kyle Chandler', 2018, 2, '2018-02-23 00:00:00', 7.4, 'PENDING'),
(27, 'Peter Rabbit', 1.35, 'Animation', 'Feature adaptation of Beatrix Potters classic tale of a rebellious rabbit trying to sneak into a farmers vegetable garden.', 'https://ibb.co/gK2BC7', 'James Corden, Fayssal Bazzi, Domhnall Gleeson', 2018, 2, '2018-02-09 00:00:00', 6.5, 'PENDING'),
(26, 'Black Panther', 2.14, 'Action', 'T Challa, the King of Wakanda, rises to the throne in the isolated, technologically advanced African nation, but his claim is challenged by a vengeful outsider who was a childhood victim of T Challa s father s mistake.', 'https://ibb.co/gbfsKn', 'Chadwick Boseman, Michael B. Jordan, Lupita Nyong', 2018, 2, '2018-02-16 00:00:00', 7.8, 'PENDING'),
-- --------------------------------------------------------

--
-- Table structure for table `Movies_in_Cinemas`
--

CREATE TABLE `Movies_in_Cinemas` (
  `movie` int(11) DEFAULT NULL,
  `cinema_location` varchar(20) DEFAULT NULL,
  `cinema_name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Movies_in_Cinemas`
--

INSERT INTO `Movies_in_Cinemas` (`movie`, `cinema_location`, `cinema_name`) VALUES
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
-- Table structure for table `Parties`
--

CREATE TABLE `Parties` (
  `date_time` datetime NOT NULL,
  `hall` int(11) NOT NULL,
  `cinema_location` varchar(20) NOT NULL,
  `cinema_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Parties`
--

INSERT INTO `Parties` (`date_time`, `hall`, `cinema_location`, `cinema_name`) VALUES
('2018-04-10 13:00:00', 1, 'Mokattam', 'Cinema Mawlana'),
('2018-04-10 13:00:00', 1, 'Old Cairo', 'El Zaaeem El Cinema'),
('2018-04-10 13:00:00', 1, 'New Cairo', 'Galaxy Cinema'),
('2018-04-10 16:00:00', 1, '9th of Mayo', 'Mayo Movies'),
('2018-04-14 10:00:00', 1, 'Al Haram', 'Pharoahs Cinema'),
('2018-04-01 10:00:00', 1, 'New Cairo', 'Point 90'),
('2018-04-01 13:00:00', 1, 'New Cairo', 'Point 90'),
('2018-04-11 16:00:00', 2, 'Mokattam', 'Cinema Mawlana'),
('2018-04-10 19:00:00', 2, 'Old Cairo', 'El Zaaeem El Cinema'),
('2018-04-12 16:00:00', 2, 'New Cairo', 'Galaxy Cinema'),
('2018-04-11 16:00:00', 2, '9th of Mayo', 'Mayo Movies'),
('2018-04-14 16:00:00', 2, 'Al Haram', 'Pharoahs Cinema'),
('2018-04-01 10:00:00', 2, 'New Cairo', 'Point 90'),
('2018-04-14 19:00:00', 3, 'Mokattam', 'Cinema Mawlana'),
('2018-04-14 19:00:00', 3, 'New Cairo', 'Galaxy Cinema'),
('2018-04-12 19:00:00', 3, '9th of Mayo', 'Mayo Movies'),
('2018-04-01 10:00:00', 3, 'New Cairo', 'Point 90');

-- --------------------------------------------------------

--
-- Table structure for table `Promocodes`
--

CREATE TABLE `Promocodes` (
  `promocode` varchar(30) NOT NULL,
  `type` varchar(10) NOT NULL,
  `value` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Promocodes`
--

INSERT INTO `Promocodes` (`promocode`, `type`, `value`) VALUES
('1H4H1LS0W', 'amount', '1000'),
('1M2NN4N22', 'percentage', '10');

-- --------------------------------------------------------

--
-- Table structure for table `Promocodes_Cinemas`
--

CREATE TABLE `Promocodes_Cinemas` (
  `cinema_location` varchar(30) NOT NULL,
  `cinema_name` varchar(30) NOT NULL,
  `promocode` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Promocodes_Cinemas`
--

INSERT INTO `Promocodes_Cinemas` (`cinema_location`, `cinema_name`, `promocode`) VALUES
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
-- Table structure for table `Tickets`
--

CREATE TABLE `Tickets` (
  `reservation_id` int(11) NOT NULL,
  `payment` bit(1) DEFAULT NULL,
  `seat_number` varchar(30) NOT NULL,
  `date_time` datetime NOT NULL,
  `hall` int(11) NOT NULL,
  `cinema_location` varchar(20) NOT NULL,
  `cinema_name` varchar(20) NOT NULL,
  `user` varchar(115) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Tickets`
--

INSERT INTO `Tickets` (`reservation_id`, `payment`, `seat_number`, `date_time`, `hall`, `cinema_location`, `cinema_name`, `user`) VALUES
(1, b'0', '1D', '2018-04-01 10:00:00', 1, 'New Cairo', 'Point 90', 'Anas_Mohamed'),
(2, b'0', '2D', '2018-04-01 10:00:00', 1, 'New Cairo', 'Point 90', 'Anas_Mohamed'),
(3, b'1', '1B', '2018-04-01 10:00:00', 2, 'New Cairo', 'Point 90', 'Anas_Mohamed'),
(4, b'0', '3C', '2018-04-01 13:00:00', 1, 'New Cairo', 'Point 90', 'Anas_Mohamed'),
(5, b'0', '1A', '2018-04-01 13:00:00', 1, 'New Cairo', 'Point 90', 'Anas_Mohamed'),
(6, b'1', '2F', '2018-04-01 13:00:00', 1, 'New Cairo', 'Point 90', 'Anas_Mohamed'),
(7, b'0', '1D', '2018-04-10 13:00:00', 1, 'New Cairo', 'Galaxy Cinema', 'Anas_Mohamed'),
(8, b'1', '1C', '2018-04-10 13:00:00', 1, 'New Cairo', 'Galaxy Cinema', 'Anas_Mohamed'),
(9, b'0', '1A', '2018-04-12 16:00:00', 2, 'New Cairo', 'Galaxy Cinema', 'Anas_Mohamed'),
(10, b'1', '2B', '2018-04-12 16:00:00', 2, 'New Cairo', 'Galaxy Cinema', 'Anas_Mohamed'),
(11, b'0', '1D', '2018-04-14 19:00:00', 3, 'New Cairo', 'Galaxy Cinema', 'Anas_Mohamed'),
(12, b'1', '3F', '2018-04-14 19:00:00', 3, 'New Cairo', 'Galaxy Cinema', 'Anas_Mohamed'),
(13, b'0', '13C', '2018-04-10 13:00:00', 1, 'Old Cairo', 'El Zaaeem El Cinema', 'Anas_Mohamed'),
(14, b'1', '10D', '2018-04-10 19:00:00', 2, 'Old Cairo', 'El Zaaeem El Cinema', 'Anas_Mohamed'),
(15, b'0', '12C', '2018-04-10 13:00:00', 1, 'Old Cairo', 'El Zaaeem El Cinema', 'Anas_Mohamed'),
(16, b'1', '23B', '2018-04-14 10:00:00', 1, 'Al Haram', 'Pharoahs Cinema', 'Anas_Mohamed'),
(17, b'1', '24B', '2018-04-14 10:00:00', 1, 'Al Haram', 'Pharoahs Cinema', 'Anas_Mohamed'),
(18, b'0', '4F', '2018-04-14 16:00:00', 2, 'Al Haram', 'Pharoahs Cinema', 'Anas_Mohamed'),
(19, b'0', '4A', '2018-04-10 16:00:00', 1, '9th of Mayo', 'Mayo Movies', 'Anas_Mohamed'),
(20, b'1', '2C', '2018-04-10 16:00:00', 1, '9th of Mayo', 'Mayo Movies', 'Anas_Mohamed'),
(21, b'0', '5B', '2018-04-11 16:00:00', 2, '9th of Mayo', 'Mayo Movies', 'Anas_Mohamed'),
(22, b'1', '6D', '2018-04-11 16:00:00', 2, '9th of Mayo', 'Mayo Movies', 'Anas_Mohamed'),
(23, b'0', '3A', '2018-04-12 19:00:00', 3, '9th of Mayo', 'Mayo Movies', 'Anas_Mohamed'),
(24, b'1', '4B', '2018-04-12 19:00:00', 3, '9th of Mayo', 'Mayo Movies', 'Anas_Mohamed'),
(25, b'1', '2A', '2018-04-10 13:00:00', 1, 'Mokattam', 'Cinema Mawlana', 'Anas_Mohamed'),
(26, b'1', '3A', '2018-04-10 13:00:00', 1, 'Mokattam', 'Cinema Mawlana', 'Anas_Mohamed'),
(27, b'1', '4A', '2018-04-10 13:00:00', 1, 'Mokattam', 'Cinema Mawlana', 'Anas_Mohamed'),
(28, b'1', '6D', '2018-04-10 13:00:00', 1, 'Mokattam', 'Cinema Mawlana', 'Anas_Mohamed'),
(29, b'0', '5D', '2018-04-10 13:00:00', 1, 'Mokattam', 'Cinema Mawlana', 'Anas_Mohamed'),
(30, b'1', '4B', '2018-04-14 19:00:00', 3, 'Mokattam', 'Cinema Mawlana', 'Anas_Mohamed');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `username` varchar(115) NOT NULL,
  `password` varchar(130) NOT NULL,
  `email` varchar(130) NOT NULL,
  `phone_number` int(11) DEFAULT NULL,
  `credit_card` varchar(200) DEFAULT NULL,
  `first_name` varchar(115) NOT NULL,
  `last_name` varchar(115) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`username`, `password`, `email`, `phone_number`, `credit_card`, `first_name`, `last_name`, `age`, `gender`) VALUES
('Anas_Mohamed', 'anasanas123', 'anasmohamed@gmail.com', 1511123623, '5332662665265921', 'Anas', 'Mohamed', 24, 'male'),
('Farida_Omar', 'farida123456', 'faridaomar@yahool.com', 1012100252, '5332225826245445', 'Farida', 'Omar', 31, 'Female'),
('Hamza_Namira', 'hamza123789', 'hamzanamira@gmail.com', 1000000588, '5338224448618485', 'Hamza', 'Namira', 37, 'male'),
('Lola_Wael', 'ttfr542', 'lulu97@gmail.com', 2033344999, '868955550011', 'Lola', 'Khalid', 21, 'female'),
('Mai_Emad', 'mimo987', 'maiemad@gmail.com', 1000595987, '5332265526295266', 'Mai', 'Emad', 26, 'Female'),
('Mariam_Medhat', 'mariam456456', 'mariam.medhat@gmail.com', 1226655695, '5333269565956210', 'Mariam', 'Medhat', 26, 'female'),
('Moahmed_Ehab', 'Ehab1234', 'mohamedEhab@gmail.com', 1055215558, '533249998528520', 'Mohamed', 'Ehab', 28, 'male'),
('Mostafa_Fathy', 'mf147258369', 'm.fathy@gmail.com', 1111897676, '5338224662239266', 'Mostafa', 'Fathy', 29, 'male'),
('Nour_Gaber', '22111980', 'nour.gaber@icloud.com', 555333221, '667944252201008', 'Nour', 'Gaber', 38, 'female'),
('Omar_Gamal', 'omarrrr789', 'omargamal@gmail.com', 1000285558, '5332249758558562', 'Omar', 'Gamal', 31, 'male'),
('Omar_Mehrez', '0mar2O15', 'omar.moaz@gmail.com', 2121255589, '5111773865203300', 'Omar', 'Mehrez', 33, 'male');

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
  ADD KEY `movie` (`movie`),
  ADD KEY `layout` (`layout`);

--
-- Indexes for table `Layout`
--
ALTER TABLE `Layout`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `Promocodes`
--
ALTER TABLE `Promocodes`
  ADD PRIMARY KEY (`promocode`);

--
-- Indexes for table `Promocodes_Cinemas`
--
ALTER TABLE `Promocodes_Cinemas`
  ADD PRIMARY KEY (`cinema_location`,`cinema_name`,`promocode`),
  ADD KEY `promocode` (`promocode`);

--
-- Indexes for table `Tickets`
--
ALTER TABLE `Tickets`
  ADD PRIMARY KEY (`reservation_id`,`seat_number`,`date_time`,`hall`,`cinema_name`,`cinema_location`),
  ADD KEY `date_time` (`date_time`,`hall`,`cinema_name`,`cinema_location`),
  ADD KEY `user` (`user`);

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
-- AUTO_INCREMENT for table `Layout`
--
ALTER TABLE `Layout`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `Movies`
--
ALTER TABLE `Movies`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `Tickets`
--
ALTER TABLE `Tickets`
  MODIFY `reservation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
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
  ADD CONSTRAINT `Halls_ibfk_2` FOREIGN KEY (`movie`) REFERENCES `Movies` (`movie_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Halls_ibfk_3` FOREIGN KEY (`layout`) REFERENCES `Layout` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Constraints for table `Promocodes_Cinemas`
--
ALTER TABLE `Promocodes_Cinemas`
  ADD CONSTRAINT `Promocodes_Cinemas_ibfk_1` FOREIGN KEY (`cinema_location`,`cinema_name`) REFERENCES `Cinemas` (`location`, `name`),
  ADD CONSTRAINT `Promocodes_Cinemas_ibfk_2` FOREIGN KEY (`promocode`) REFERENCES `Promocodes` (`promocode`);

--
-- Constraints for table `Tickets`
--
ALTER TABLE `Tickets`
  ADD CONSTRAINT `Tickets_ibfk_1` FOREIGN KEY (`date_time`,`hall`,`cinema_name`,`cinema_location`) REFERENCES `Parties` (`date_time`, `hall`, `cinema_name`, `cinema_location`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Tickets_ibfk_2` FOREIGN KEY (`user`) REFERENCES `Users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;