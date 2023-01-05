-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 28, 2022 at 07:31 PM
-- Server version: 8.0.31-0ubuntu0.20.04.1
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Authentication`
--

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `email` text NOT NULL,
  `password` text NOT NULL,
  `token` text NOT NULL,
  `lastLogIn` text NOT NULL,
  `lastLogOut` text NOT NULL,
  `right_1-A` int NOT NULL DEFAULT '1',
  `right_1-B` int NOT NULL DEFAULT '0',
  `right_2-A` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`email`, `password`, `token`, `lastLogIn`, `lastLogOut`, `right_1-A`, `right_1-B`, `right_2-A`) VALUES
('lelellel', 'okokok', 'dashdfasdf', '2012-08-06', '2012-08-06', 0, 0, 0),
('es geht doch!!', 'was los!!', 'dashdfasdf', '2012-08-06', '2012-08-06', 0, 0, 0),
('geht doch', 'klar', 'dashdfasdf', '2012-08-06', '2012-08-06', 0, 0, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
