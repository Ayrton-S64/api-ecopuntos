-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 12, 2022 at 03:13 AM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecopuntos`
--
CREATE DATABASE IF NOT EXISTS `ecopuntos` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `ecopuntos`;

-- --------------------------------------------------------

--
-- Table structure for table `beneficios`
--

DROP TABLE IF EXISTS `beneficios`;
CREATE TABLE IF NOT EXISTS `beneficios` (
  `idBeneficio` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(150) NOT NULL,
  `puntos` bigint(20) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `eliminado` tinyint(1) NOT NULL DEFAULT '0',
  `url_imagen` text,
  PRIMARY KEY (`idBeneficio`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `beneficios`
--

INSERT INTO `beneficios` (`idBeneficio`, `descripcion`, `puntos`, `activo`, `eliminado`, `url_imagen`) VALUES
(1, 'Mochila UNT', 3500, 1, 0, NULL),
(2, 'Cupo Comedor universitario', 6000, 1, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `estudiante`
--

DROP TABLE IF EXISTS `estudiante`;
CREATE TABLE IF NOT EXISTS `estudiante` (
  `idEstudiante` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(75) NOT NULL,
  `codmatricula` varchar(10) NOT NULL,
  `puntos` int(11) NOT NULL DEFAULT '0',
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `eliminado` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idEstudiante`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `estudiante`
--

INSERT INTO `estudiante` (`idEstudiante`, `nombre`, `codmatricula`, `puntos`, `activo`, `eliminado`) VALUES
(1, 'Ayrton Soto Alarcon', '1013300219', 0, 1, 0),
(2, 'Alessandro Venegas Villareal', '1513300219', 0, 1, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
