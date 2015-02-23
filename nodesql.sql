-- phpMyAdmin SQL Dump
-- version 4.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 16, 2014 at 05:16 AM
-- Server version: 5.5.41-0+wheezy1
-- PHP Version: 5.4.36-0+deb7u3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `nodesql`
--

-- --------------------------------------------------------

--
-- Table structure for table `action`
--

CREATE TABLE IF NOT EXISTS `action` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `events` varchar(1024) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `action`
--

INSERT INTO `action` (`id`, `name`, `events`) VALUES
(1, 'Alles uit', '1-off-0;22-off-0;26-off-0;36-off-0;8-off-0;25-off-0;24-off-0;23-off-0;27-off-0;28-off-0;29-off-0;31-off-0;34-off-0;35-off-0'),
(2, 'Woonkamer aan', '1-on-100;22-on-100;26-on-100;36-on-100;8-on-100'),
(3, 'toilet timed off', '29-toff-30'),
(7, 'achterdeur timed off', '28-toff-900'),
(8, 'NachtL1', '25-toggle-00'),
(9, 'NachtL2', '1-off-0;22-off-0;26-off-0;36-off-0;8-off-0;25-off-0;24-off-0;23-off-0;27-off-0;28-off-0;29-off-0;31-off-0;34-off-0;35-off-0'),
(10, 'Kachel on', '1-off-00'),
(11, 'testing', 'undefined');

-- --------------------------------------------------------

--
-- Table structure for table `config`
--

CREATE TABLE IF NOT EXISTS `config` (
  `id` int(11) NOT NULL,
  `version` varchar(20) NOT NULL,
  `hasDock` int(11) NOT NULL,
  `bkgnd_pict` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `config`
--

INSERT INTO `config` (`id`, `version`, `hasDock`, `bkgnd_pict`) VALUES
(1, '0.1.8', 1, 'background.png');

-- --------------------------------------------------------

--
-- Table structure for table `device`
--

CREATE TABLE IF NOT EXISTS `device` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `sort` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `opm` varchar(255) NOT NULL,
  `mem` int(20) NOT NULL,
  `val` int(11) NOT NULL,
  `action` int(11) NOT NULL,
  `toff` int(11) NOT NULL,
  `due` int(11) NOT NULL,
  `re` varchar(6) NOT NULL,
  `mobi` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `device`
--

INSERT INTO `device` (`id`, `name`, `sort`, `type`, `opm`, `mem`, `val`, `action`, `toff`, `due`, `re`, `mobi`) VALUES
(37, 'Woonkamer', 77, 1, 'output', 0, 0, 0, 0, 37, 'B7', 1),
(36, 'Eettafel', 2, 1, 'output', 0, 0, 0, 0, 36, 'B6', 1),
(24, 'Nachtlampje', 0, 1, 'output', 0, 0, 0, 0, 24, 'A6', 1),
(30, 'Slaapkamer', 0, 1, 'output', 0, 0, 0, 0, 30, 'A3', 1),
(25, 'Hal entree', 0, 1, 'output', 0, 0, 0, 0, 25, 'A2', 1),
(23, 'Spot schilderij', 0, 1, 'output', 0, 0, 0, 0, 23, 'A1', 1),
(31, 'Spotjes tv', 0, 1, 'output', 0, 0, 0, 0, 31, 'B1', 1),
(26, 'Douche', 0, 1, 'output', 0, 0, 0, 0, 26, 'A5', 1),
(28, 'Buffer', 0, 1, 'output', 0, 0, 0, 0, 28, 'A8', 1),
(33, 'Toilet', 0, 1, 'output', 0, 0, 0, 0, 33, 'B2', 1),
(35, 'Keuken', 0, 1, 'output', 0, 0, 0, 0, 35, 'B5', 1),
(27, 'Trap', 0, 1, 'output', 0, 0, 0, 0, 27, 'A4', 1),
(135, 'Buffer', 0, 1, 'output', 0, 0, 0, 0, 0, '', 0),
(4001, 'Woonkamer', 0, 4, '28-00000495815b', 0, 0, 0, 0, 0, '', 0),
(1003, 'BoneTime', 0, 2, 'time', 0, 0, 0, 0, 0, '', 0),
(1004, 'BoneDate', 0, 2, 'date', 0, 0, 0, 0, 0, '', 0),
(1005, 'BoneClock', 0, 2, 'seconds', 0, 0, 0, 0, 0, '', 0),
(1006, 'Set clock', 0, 2, 'Button', 0, 0, 0, 0, 0, '', 0),
(1007, 'Temp script', 0, 2, 'Button', 0, 0, 0, 0, 0, '', 0),
(1000, 'Edit items', 0, 2, 'Switch', 0, 0, 0, 0, 0, '', 0),
(1001, 'Edit bkgnd', 0, 2, 'Switch', 0, 0, 0, 0, 0, '', 0),
(1008, 'Reload serverDB', 0, 2, 'Button', 0, 0, 0, 0, 0, '', 0),
(2001, 'input 1', 0, 3, 'input', 0, 0, 1, 0, 44, '', 0),
(2002, 'input 2', 0, 3, 'input', 0, 0, 10, 0, 45, '', 0),
(2003, 'input 3', 0, 3, 'input', 0, 0, 3, 0, 46, '', 0),
(2004, 'input 4', 0, 3, 'input', 0, 0, 7, 0, 47, '', 0),
(3001, 'BMV-V', 0, 2, 'BMV-600 serial input', 0, 0, 0, 0, 0, '', 0),
(3002, 'BMV-I', 0, 2, 'BMV-600 serial input', 0, 0, 0, 0, 0, '', 0),
(3003, 'BMV-CE', 0, 2, 'BMV-600 serial input', 0, 0, 0, 0, 0, '', 0),
(3004, 'BMV-SOC', 0, 2, 'BMV-600 serial input', 0, 0, 0, 0, 0, '', 0),
(3005, 'BMV-TTG', 0, 2, 'BMV-600 serial input', 0, 0, 0, 0, 0, '', 0),
(3006, 'BMV-Alarm', 0, 2, 'BMV-600 serial input', 0, 0, 0, 0, 0, '', 0),
(3007, 'BMV-Relay', 0, 2, 'BMV-600 serial input', 0, 0, 0, 0, 0, '', 0),
(3008, 'BMV-W', 0, 2, 'BMV-600 serial input', 0, 0, 0, 0, 0, '', 0),
(4002, 'Kachel boven', 0, 4, '28-00000494fa07', 0, 0, 0, 0, 0, '', 0),
(4003, 'Kachel onder', 0, 4, '28-00000495a8d0', 0, 0, 0, 0, 0, '', 0),
(4004, 'Buffer boven', 0, 4, '28-00000495df77', 0, 0, 0, 0, 0, '', 0),
(4005, 'Buffer midden', 0, 4, '28-0000049586c3', 0, 0, 0, 0, 0, '', 0),
(4006, 'Buffer onder', 0, 4, '28-000004954834', 0, 0, 0, 0, 0, '', 0),
(4008, 'gen onder', 0, 4, '28-00000494bd4b', 0, 0, 0, 0, 0, '', 0),
(4009, 'buiten', 0, 4, '28-00000494bd4b', 0, 0, 0, 0, 0, '', 0),
(2005, 'input 5', 0, 3, 'input', 0, 0, 0, 0, 48, '', 0),
(4007, 'gen boven', 0, 4, '28-00000494bd4b', 0, 0, 0, 0, 0, '', 0),
(39, 'Omvormer1', 2, 1, '', 0, 0, 0, 0, 39, 'B8', 1),
(1002, 'DueStep', 0, 2, 'step(sec)', 0, 0, 0, 0, 0, '', 0),
(1010, 'BoneSec', 0, 2, '', 0, 0, 0, 0, 0, '', 0),
(1011, 'BoneMin', 0, 2, '', 0, 0, 0, 0, 0, '', 0),
(1012, 'BoneHour', 0, 2, '', 0, 0, 0, 0, 0, '', 0),
(3009, 'BMV-SOC-mbar', 0, 2, 'BMV-600 serial input', 0, 0, 0, 0, 0, '', 0),
(2006, 'input 6', 0, 3, 'input', 0, 0, 0, 0, 49, '', 0),
(32, 'Aqua pomp', 0, 1, 'output', 0, 0, 0, 0, 32, 'B3', 1),
(34, 'Achterdeur', 0, 1, 'output', 0, 0, 0, 0, 34, 'B4', 1),
(29, 'Omvormer 2', 0, 1, 'output', 0, 0, 0, 0, 29, 'A7', 1);

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE IF NOT EXISTS `event` (
  `id` int(11) NOT NULL,
  `action_id` int(11) NOT NULL,
  `device_id` int(11) NOT NULL,
  `action` varchar(20) NOT NULL,
  `value` int(11) NOT NULL,
  `sort` int(11) NOT NULL,
  `device_name` varchar(20) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `action_id`, `device_id`, `action`, `value`, `sort`, `device_name`) VALUES
(1, 1, 28, 'toff-30', 0, 0, ''),
(2, 1, 30, 'off', 0, 0, ''),
(3, 2, 30, 'on', 0, 0, ''),
(4, 2, 28, 'on', 0, 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `item_types`
--

CREATE TABLE IF NOT EXISTS `item_types` (
  `id` int(11) NOT NULL,
  `naam` varchar(30) NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `item_types`
--

INSERT INTO `item_types` (`id`, `naam`, `width`, `height`, `img`) VALUES
(1, 'label + value', 250, 25, ''),
(2, 'static text small', 250, 25, ''),
(3, 'button', 250, 25, '');

-- --------------------------------------------------------

--
-- Table structure for table `link`
--

CREATE TABLE IF NOT EXISTS `link` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `url` varchar(200) NOT NULL,
  `type` int(11) NOT NULL,
  `menu` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `link`
--

INSERT INTO `link` (`id`, `name`, `url`, `type`, `menu`) VALUES
(1, 'Apple', 'http://www.apple.com', 1, 1),
(2, 'Ecologieforum', 'http://ecologieforum.eu', 1, 1),
(3, 'KLM', 'http://klm.nl', 1, 1),
(4, 'Victron BMV-600', '/pdf/BMV-600.pdf', 2, 0),
(5, 'Mastervolt AC Master', '/pdf/Mastervolt_ACMaster.pdf', 2, 0),
(6, 'Beaglebone SRM', '/pdf/BBB_SRM.pdf', 2, 0),
(7, 'Arduino Due pinout', '/pdf/Due-pinout.pdf', 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE IF NOT EXISTS `log` (
  `recnr` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `t_WK` float NOT NULL,
  `t_K1` float NOT NULL,
  `t_K2` float NOT NULL,
  `t_B1` float NOT NULL,
  `t_B2` float NOT NULL,
  `t_B3` float NOT NULL,
  `t_G1` float NOT NULL,
  `t_G2` float NOT NULL,
  `t_BU` float NOT NULL,
  `b_V` float NOT NULL,
  `b_I` float NOT NULL,
  `b_CE` float NOT NULL,
  `b_SOC` float NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `log`
--

INSERT INTO `log` (`recnr`, `time`, `t_WK`, `t_K1`, `t_K2`, `t_B1`, `t_B2`, `t_B3`, `t_G1`, `t_G2`, `t_BU`, `b_V`, `b_I`, `b_CE`, `b_SOC`) VALUES
(104, '2014-05-07 14:56:56', 23.06, 72.88, 64.06, 63.25, 43.38, 37, 20.31, 20.25, 14.81, 27672, 21838, -28520, 941),
(105, '2014-05-07 14:57:06', 23.06, 73, 63.94, 63.31, 43.31, 37.06, 20.25, 20.31, 14.94, 27665, 21470, -28451, 941),
(106, '2014-05-07 14:57:16', 23.06, 73.12, 63.88, 63.38, 43.25, 37.06, 20.31, 20.25, 14.88, 27638, 21173, -28395, 941),
(107, '2014-05-07 14:57:26', 23.06, 73.31, 63.81, 63.31, 43.25, 36.94, 20.25, 20.31, 14.69, 27608, 21047, -28339, 941),
(108, '2014-05-07 14:57:36', 23.12, 73.44, 63.69, 63.38, 43.12, 36.81, 20.25, 20.31, 14.88, 27611, 21044, -28283, 941),
(109, '2014-05-07 14:57:46', 23.06, 73.5, 63.56, 63.31, 43.06, 36.81, 20.25, 20.19, 14.69, 27539, 20198, -28230, 942),
(110, '2014-05-07 14:57:56', 23.06, 73.62, 63.06, 63.38, 43, 36.75, 20.31, 20.25, 14.62, 27546, 20227, -28176, 942),
(111, '2014-05-07 14:58:06', 23.06, 73.81, 61.88, 63.44, 42.88, 36.69, 20.31, 20.25, 14.62, 27546, 20305, -28123, 942),
(112, '2014-05-07 14:58:16', 23.06, 73.88, 61.56, 63.38, 42.88, 36.62, 20.25, 20.25, 14.62, 27545, 20139, -28069, 942),
(113, '2014-05-07 14:58:26', 23.06, 74.06, 61.25, 63.44, 42.81, 36.62, 20.31, 20.31, 14.56, 27553, 20236, -28027, 942),
(114, '2014-05-07 15:52:32', 22.44, 74.62, 45.94, 63.38, 35.88, 31.56, 20.88, 20.88, 14.62, 25350, 1228, -23678, 952),
(115, '2014-05-07 18:48:07', 23.5, 74.44, 65.38, 68.75, 43.5, 36.88, 19.94, 19.81, 13.19, 24717, -12263, -38161, 919),
(116, '2014-05-07 19:18:07', 23.38, 72.44, 65.94, 68.69, 42.75, 35.44, 19.56, 19.44, 13.44, 24666, -10238, -43635, 905),
(117, '2014-05-07 19:48:07', 23.06, 74.81, 57.88, 68.19, 38.06, 32.81, 19.19, 19.12, 12.81, 24574, -10527, -48928, 892),
(118, '2014-05-07 20:18:07', 22.62, 68.06, 46.25, 66.75, 35.44, 31.06, 18.81, 18.69, 12.31, 24492, -10432, -54186, 878),
(119, '2014-05-07 20:48:07', 22.44, 64.62, 53, 64.62, 36.62, 32.5, 19.69, 19.62, 13.12, 24521, -6093, -59204, 866),
(120, '2014-05-07 21:18:07', 22.12, 59.62, 32.75, 63.38, 31.69, 29.25, 19.69, 19.62, 12.81, 24468, -6112, -62341, 859),
(121, '2014-05-07 21:48:07', 21.94, 53.62, 28.69, 61.81, 27.31, 25.19, 19.62, 19.5, 12.31, 24419, -6258, -65412, 852),
(122, '2014-05-07 22:18:07', 21.25, 69.25, 30.62, 59.31, 26.5, 25.06, 19.5, 19.38, 11.88, 24583, -2056, -67043, 849),
(123, '2014-05-07 23:00:26', 21.69, 71.5, 58.06, 60.5, 38.5, 32.44, 19.44, 19.31, 10.19, 24583, -1736, -68647, 846),
(124, '2014-05-07 23:30:26', 22.5, 76.19, 70.38, 62.12, 44.56, 37.06, 19.44, 19.38, 13.31, 24474, -3587, -69972, 844),
(125, '2014-05-08 00:00:26', 22.5, 74.94, 68.5, 68.75, 45.25, 37.44, 19.44, 19.38, 12.69, 24504, -1775, -71756, 840),
(126, '2014-05-08 00:30:26', 21.75, 73.94, 46.5, 69.12, 37.69, 32.25, 19.5, 19.38, 12.25, 24521, -1725, -72668, 839),
(127, '2014-05-08 01:00:26', 21.12, 66.38, 34.12, 67.06, 31.69, 27.81, 19.38, 19.31, 12.06, 24507, -1735, -73533, 838),
(128, '2014-05-08 01:30:26', 20.56, 56.69, 30.44, 64.62, 27.88, 23.12, 19.19, 19.12, 10.38, 24493, -1730, -74395, 836),
(129, '2014-05-08 02:00:26', 20.25, 47.12, 31.44, 62.31, 26, 24.88, 19.06, 19, 11.38, 24482, -1723, -75257, 835),
(130, '2014-05-08 02:30:26', 19.94, 39.81, 30.06, 60.31, 26.12, 24.19, 18.94, 18.88, 12.19, 24468, -1725, -76118, 833),
(131, '2014-05-08 03:00:26', 19.69, 35.12, 29.94, 58.56, 25.12, 23.81, 18.88, 18.69, 12.19, 24455, -1706, -76977, 832),
(132, '2014-05-08 03:30:26', 19.38, 32, 28.94, 56.88, 24.12, 23.06, 18.75, 18.62, 12.12, 24443, -1726, -77835, 831),
(133, '2014-05-08 06:47:44', 18.44, 24, 22.81, 45.25, 27.44, 25, 17.88, 17.75, 12.25, 24489, 175, -80334, 827),
(134, '2014-05-08 19:26:54', 16.56, 28.44, 17.31, 22.56, 19, 18.88, 16.88, 16.75, 11.56, 27560, 46477, -59898, 876),
(135, '2014-05-08 20:35:44', 20.25, 74.81, 63.81, 44.75, 42.81, 35.81, 17.5, 17.44, 11.81, 25096, -6097, -39810, 919),
(136, '2014-05-08 22:38:51', 24.56, 69.94, 64.69, 64.44, 42.25, 35.5, 18.62, 18.56, 12.62, 24504, -8582, -61778, 863),
(137, '2014-05-08 23:08:51', 23, 74.25, 62.56, 65.25, 41.06, 34.75, 18.81, 18.75, 13.88, 24581, -4310, -64727, 856);

-- --------------------------------------------------------

--
-- Table structure for table `page`
--

CREATE TABLE IF NOT EXISTS `page` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `xpos` int(11) NOT NULL,
  `ypos` int(11) NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `vis` int(11) NOT NULL DEFAULT '1',
  `inmenu` int(11) DEFAULT '1',
  `mini` int(11) NOT NULL DEFAULT '0',
  `maxi` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `page`
--

INSERT INTO `page` (`id`, `name`, `xpos`, `ypos`, `width`, `height`, `vis`, `inmenu`, `mini`, `maxi`) VALUES
(1, 'Floorplan', 7, 29, 588, 500, 1, 1, 0, 0),
(2, 'Info', 772, 28, 245, 283, 0, 1, 0, 0),
(6, 'BMV-600', 886, 76, 249, 333, 1, 1, 0, 0),
(7, 'Temperaturen', 600, 30, 250, 280, 1, 1, 0, 0),
(50, 'About this', 359, 118, 310, 382, 0, 0, 0, 0),
(51, 'About finder', 405, 154, 310, 382, 0, 0, 0, 0),
(60, 'Serial monitor', 3, 329, 780, 258, 0, 0, 0, 0),
(99, 'Window edit', 271, 61, 266, 290, 0, 0, 0, 0),
(98, 'Item edit', 438, 89, 255, 321, 0, 0, 0, 0),
(97, 'Preferences', 168, 61, 260, 322, 0, 0, 0, 0),
(0, 'system', 1, 1, 1, 1, 0, 0, 0, 0),
(96, 'Log', 60, 104, 656, 303, 0, 0, 0, 0),
(95, 'Item new', 171, 61, 266, 320, 0, 0, 0, 0),
(93, 'Graph temperatures', 191, 161, 710, 342, 0, 0, 0, 0),
(94, 'Graph current ', 8, 209, 710, 342, 0, 0, 0, 0),
(92, 'Safari', 19, 31, 876, 496, 0, 0, 0, 0),
(91, 'Clock', 854, 31, 198, 168, 1, 0, 0, 0),
(90, 'Action', 620, 50, 250, 280, 1, 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `page_items`
--

CREATE TABLE IF NOT EXISTS `page_items` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `page_id` int(11) NOT NULL,
  `page_name` varchar(20) NOT NULL,
  `device_id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `xpos` int(11) NOT NULL,
  `ypos` int(11) NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `action` varchar(100) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=4014 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `page_items`
--

INSERT INTO `page_items` (`id`, `name`, `page_id`, `page_name`, `device_id`, `type`, `xpos`, `ypos`, `width`, `height`, `action`) VALUES
(1, 'Eettafel', 1, 'overview', 36, 17, 142, 20, 28, 28, 'toggle'),
(2, 'Woonkamer', 1, 'overview', 37, 17, 63, 157, 28, 28, 'toggle'),
(3, 'Spotjes schilderij', 1, 'clocktime', 23, 17, 110, 92, 28, 28, 'toggle'),
(37, 'input 6', 1, 'overview', 2006, 13, 325, 450, 250, 30, 'toggle'),
(36, 'input 5', 1, 'overview', 2005, 13, 325, 425, 250, 30, 'toggle'),
(35, 'input 4', 1, 'overview', 2004, 13, 325, 400, 250, 30, 'toggle'),
(34, 'input 3', 1, 'overview', 2003, 13, 325, 375, 250, 30, 'toggle'),
(15, 'Douche', 1, 'overview', 26, 17, 33, 281, 28, 28, 'toggle'),
(16, 'Floorplan', 1, 'overview', 0, 99, 3, 2, 676, 572, 'floorplan85.png'),
(28, 'Omvormer 2 2000W', 1, 'overview', 38, 10, 325, 200, 250, 30, 'toggle'),
(410, 'log text', 96, 'log', 0, 6, -1, -3, 786, 200, ''),
(195, 'Load from file', 2, 'Info', 0, 11, 0, 125, 250, 25, 'Load'),
(196, 'Load from db', 2, 'Info', 0, 11, 0, 100, 250, 25, 'Load'),
(197, 'Empty server', 2, 'Info', 0, 11, 0, 75, 250, 25, 'Empty'),
(198, 'Save file', 2, 'Info', 0, 11, 0, 50, 250, 25, 'Save'),
(243, 'mbarSOC', 0, 'mbar', 3009, 0, 0, 0, 0, 0, ''),
(17, 'Eettafel', 1, 'overview', 36, 17, 185, 19, 28, 28, 'toggle'),
(18, 'Keuken', 1, 'overview', 35, 17, 314, 70, 28, 28, 'toggle'),
(26, 'Omvormer 1', 1, 'overview', 39, 17, 286, 125, 30, 30, 'toggle'),
(27, 'Omvormer 1 500W', 1, 'overview', 39, 10, 325, 175, 250, 30, 'toggle'),
(33, 'input 2', 1, 'overview', 2002, 13, 325, 350, 250, 30, 'toggle'),
(32, 'input 1', 1, 'overview', 2001, 13, 325, 325, 250, 30, 'toggle'),
(31, 'Koelwater pomp', 1, 'overview', 39, 13, 325, 275, 250, 30, 'toggle'),
(38, 'Keuken', 1, 'overview', 35, 17, 248, 72, 28, 28, 'toggle'),
(39, 'Spotjes tv', 1, 'clocktime', 31, 17, 177, 191, 28, 28, 'toggle'),
(40, 'Voordeur', 1, 'clocktime', 25, 17, 87, 56, 28, 28, 'toggle'),
(41, 'Toilet', 1, 'clocktime', 33, 17, 27, 20, 28, 28, 'toggle'),
(42, 'Slaapkamer', 1, 'clocktime', 30, 17, 185, 351, 28, 28, 'toggle'),
(43, 'Nachtlampje', 1, 'clocktime', 24, 17, 150, 441, 28, 28, 'toggle'),
(44, 'Achterdeur', 1, 'clocktime', 34, 17, 402, 20, 28, 28, 'toggle'),
(45, 'Achterdeur', 1, 'clocktime', 34, 17, 406, 84, 28, 28, 'toggle'),
(46, 'Trap', 1, 'clocktime', 27, 17, 100, 292, 28, 28, 'toggle'),
(47, 'Buffer', 1, 'clocktime', 28, 17, 512, 20, 28, 28, 'toggle'),
(48, 'Buffer', 1, 'clocktime', 28, 17, 467, 20, 28, 28, 'toggle'),
(30, 'Aquaphonics pomp', 1, 'overview', 32, 10, 325, 250, 250, 30, 'toggle'),
(29, 'Omvormer 3 300W', 1, 'overview', 39, 10, 325, 225, 250, 30, 'toggle'),
(403, 'Send serial', 60, 'serial monitor', 0, 12, -1, 260, 121, 40, 'menuClicked("Button","SendSerial")'),
(480, 'ShowDock', 97, 'Preferences', 0, 10, 12, 38, 240, 24, ''),
(309, 'apple logo', 50, '', 0, 99, 48, 25, 214, 114, 'MacOSX.png'),
(227, 'BMV-pict', 6, '', 0, 99, 59, 15, 131, 129, 'bmv-600.png'),
(200, 'Due step', 2, 'info', 1002, 1, 0, 0, 245, 25, ''),
(201, 'Woonkamer', 7, '', 4001, 30, 15, 0, 100, 50, ''),
(202, 'Buiten', 7, '', 4008, 30, 125, 0, 100, 100, ''),
(203, 'Kachel boven', 7, '', 4002, 1, 0, 91, 250, 25, ''),
(204, 'Kachel onder', 7, '', 4003, 1, 0, 116, 250, 25, ''),
(205, 'Buffer boven', 7, '', 4004, 1, 0, 141, 250, 25, ''),
(206, 'Buffer midden', 7, '', 4005, 1, 0, 166, 250, 25, ''),
(207, 'Buffer onder', 7, '', 4006, 1, 0, 191, 250, 25, ''),
(208, 'Generator boven', 7, '', 4007, 1, 0, 216, 250, 25, ''),
(209, 'Generator onder', 7, '', 4009, 1, 0, 241, 250, 25, ''),
(220, 'Spanning', 6, '', 3001, 1, 0, 150, 250, 25, ''),
(221, 'Stroom', 6, '', 3002, 1, 0, 175, 250, 25, ''),
(222, 'CE', 6, '', 3003, 1, 0, 225, 250, 25, ''),
(223, 'SOC', 6, '', 3004, 1, 0, 250, 250, 25, ''),
(224, 'TTG', 6, '', 3005, 1, 0, 275, 250, 25, ''),
(225, 'Alarm', 6, '', 3006, 1, 0, 300, 250, 25, ''),
(226, 'Relay', 6, '', 3007, 1, 0, 325, 250, 25, ''),
(228, 'BMV-lcd', 6, '', 3002, 9, 90, 68, 67, 25, ''),
(301, 'Version 10.7.2', 50, 'about', 0, 2, 0, 166, 310, 14, ''),
(302, 'Software Update...', 50, 'about', 0, 3, 94, 190, 121, 20, ''),
(303, 'Processor', 50, 'about', 0, 4, 0, 230, 310, 16, '2 Ghz Intel Core Duo'),
(304, 'Memory', 50, 'about', 0, 4, 0, 256, 310, 16, '4 GB 1067 Mhz DDR3'),
(305, 'Startup Disk', 50, 'about', 0, 4, 0, 282, 310, 16, 'Macintosh HD'),
(306, 'More info...', 50, 'about', 0, 3, 94, 307, 121, 20, ''),
(307, 'TM text', 50, 'about', 0, 5, 0, 343, 310, 16, 'TM and (c) 1983-2011 Apple Inc'),
(308, 'rights text', 50, 'about', 0, 5, 0, 357, 310, 16, 'All rights reserved'),
(400, 'serial text', 60, 'serial monitor', 0, 6, -1, -3, 786, 200, ''),
(240, 'mbarSec', 0, 'mbar', 1010, 0, 0, 0, 0, 0, ''),
(241, 'mbarMin', 0, 'mbar', 1011, 0, 0, 0, 0, 0, ''),
(242, 'mbarHour', 0, 'mbar', 1012, 0, 0, 0, 0, 0, ''),
(199, 'Set time', 2, 'info', 0, 11, 0, 25, 250, 25, 'Set'),
(420, 'Name', 99, 'window edit', 0, 8, 0, 21, 250, 22, ''),
(421, 'Xpos', 99, 'window edit', 0, 8, 0, 71, 250, 22, ''),
(422, 'Ypos', 99, 'window edit', 0, 8, 0, 96, 250, 22, ''),
(423, 'Width', 99, 'window edit', 0, 8, 0, 121, 250, 22, ''),
(424, 'Height', 99, 'window edit', 0, 8, 0, 146, 250, 22, ''),
(425, 'Visible', 99, 'window edit', 0, 8, 0, 171, 250, 22, ''),
(426, 'Save', 99, 'window edit', 0, 3, 125, 250, 80, 20, 'saveWindowInfo()'),
(427, 'ID', 99, 'window edit', 0, 8, 0, 46, 250, 22, ''),
(440, 'Name', 98, 'Item edit', 0, 8, 0, 21, 250, 22, ''),
(441, 'Xpos', 98, 'Item edit', 0, 8, 0, 71, 250, 22, ''),
(442, 'Ypos', 98, 'Item edit', 0, 8, 0, 96, 250, 22, ''),
(443, 'Width', 98, 'Item edit', 0, 8, 0, 121, 250, 22, ''),
(444, 'Height', 98, 'Item edit', 0, 8, 0, 146, 250, 22, ''),
(445, 'Type', 98, 'Item edit', 0, 8, 0, 171, 250, 22, ''),
(446, 'Save', 98, 'Item edit', 0, 3, 154, 287, 80, 20, 'saveItemInfo()'),
(447, 'ID', 98, 'Item edit', 0, 8, 0, 46, 250, 22, ''),
(448, 'device_id', 98, 'Item edit', 0, 8, 0, 196, 250, 22, ''),
(449, 'page_id', 98, 'Item edit', 0, 8, 0, 221, 250, 22, ''),
(450, 'action', 98, 'Item edit', 0, 8, 0, 246, 250, 22, ''),
(14, 'Kachel pomp', 1, 'overview', 39, 13, 325, 300, 250, 30, 'toggle'),
(550, 'action', 95, 'Item new', 0, 8, 0, 246, 250, 22, ''),
(549, 'page_id', 95, 'Item new', 0, 8, 0, 221, 250, 22, ''),
(542, 'Ypos', 95, 'Item new', 0, 8, 0, 96, 250, 22, ''),
(545, 'Type', 95, 'Item new', 0, 8, 0, 171, 250, 22, ''),
(546, 'Save', 95, 'Item new', 0, 3, 154, 287, 80, 20, 'newItemInfo()'),
(547, 'ID', 95, 'Item new', 0, 8, 0, 46, 250, 22, ''),
(548, 'device_id', 95, 'Item new', 0, 8, 0, 196, 250, 22, ''),
(541, 'Xpos', 95, 'Item new', 0, 8, 0, 71, 250, 22, ''),
(544, 'Height', 95, 'Item new', 0, 8, 0, 146, 250, 22, ''),
(543, 'Width', 95, 'Item new', 0, 8, 0, 121, 250, 22, ''),
(540, 'Name', 95, 'Item new', 0, 8, 0, 21, 250, 22, ''),
(451, 'Delete', 98, 'Item edit', 0, 3, 5, 287, 80, 20, 'deleteItemInfo()'),
(551, 'testing', 97, '', 0, 10, 12, 103, 240, 24, ''),
(481, 'Version', 97, 'Preferences', 0, 8, 5, 8, 250, 22, ''),
(482, 'Save', 97, 'Preferences', 0, 3, 157, 287, 80, 20, 'savePreferences()'),
(554, 'Graph current', 94, '', 3002, 14, 0, 0, 710, 350, ''),
(553, 'Vermogen', 6, '', 3008, 1, 0, 200, 250, 25, ''),
(555, 'Graph temperature', 93, '', 3002, 15, 0, 0, 710, 350, ''),
(405, 'Safari_iframe', 92, 'Safari', 0, 18, -1, 49, 600, 400, ''),
(406, 'bkgnd_box', 92, 'Safari', 0, 19, -1, 0, 600, 49, ''),
(407, 'url', 92, 'Safari', 0, 20, 43, 2, 300, 25, ''),
(408, 'go', 92, 'Safari', 0, 3, 5, 5, 35, 21, 'goURL()'),
(409, 'menu', 92, 'Safari', 0, 21, -4, 25, 400, 40, ''),
(460, 'Action wrap', 90, 'Action', 0, 22, 0, 0, 200, 100, ''),
(461, 'Action wrap', 90, 'Action', 0, 23, 0, 100, 200, 40, ''),
(462, 'Action wrap', 90, 'Action', 0, 24, 0, 100, 250, 100, '');

-- --------------------------------------------------------

--
-- Table structure for table `port`
--

CREATE TABLE IF NOT EXISTS `port` (
  `id` int(11) NOT NULL,
  `inout` int(11) NOT NULL,
  `omschr` varchar(256) NOT NULL,
  `type` varchar(20) NOT NULL,
  `connect` varchar(20) NOT NULL,
  `pwm` int(11) NOT NULL DEFAULT '0',
  `port` int(11) NOT NULL,
  `visible` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `port`
--

INSERT INTO `port` (`id`, `inout`, `omschr`, `type`, `connect`, `pwm`, `port`, `visible`) VALUES
(1, 1, '', '', '', 0, 0, 0),
(2, 1, '', '', '', 0, 1, 0),
(3, 1, '', '', '', 1, 2, 0),
(4, 1, '', '', '', 1, 3, 0),
(5, 1, '', '', '', 1, 4, 0),
(6, 1, '', '', '', 1, 5, 0),
(7, 1, '', '', '', 1, 6, 0),
(8, 1, '', '', '', 1, 7, 0),
(9, 1, '', '', '', 1, 8, 0),
(10, 1, '', '', '', 1, 9, 0),
(11, 0, '', '', '', 1, 10, 0),
(12, 0, '', '', '', 1, 11, 0),
(13, 0, '', '', '', 1, 12, 0),
(14, 0, '', '', '', 1, 13, 0),
(15, 0, '', '', '', 0, 14, 0),
(16, 0, '', '', '', 0, 15, 0),
(17, 0, '', '', '', 0, 16, 0),
(18, 0, '', '', '', 0, 17, 0),
(19, 0, '', '', '', 0, 18, 0),
(20, 0, '', '', '', 0, 19, 0),
(21, 0, '', '', '', 0, 20, 0),
(22, 0, '', '', '', 0, 21, 0),
(23, 0, '', '', '', 0, 22, 1),
(24, 0, '', '', '', 0, 23, 1),
(25, 0, '', '', '', 0, 24, 1),
(26, 0, '', '', '', 0, 25, 1),
(27, 0, '', '', '', 0, 26, 1),
(28, 0, '', '', '', 0, 27, 1),
(29, 0, '', '', '', 0, 28, 1),
(30, 0, '', '', '', 0, 29, 1),
(31, 0, '', '', '', 0, 30, 1),
(32, 0, '', '', '', 0, 31, 1),
(33, 0, '', '', '', 0, 32, 1),
(34, 0, '', '', '', 0, 33, 1),
(35, 0, '', '', '', 0, 34, 1),
(36, 0, '', '', '', 0, 35, 1),
(37, 0, '', '', '', 0, 36, 1),
(38, 0, '', '', '', 0, 37, 1),
(39, 0, '', '', '', 0, 38, 1),
(40, 0, '', '', '', 0, 39, 1),
(41, 0, '', '', '', 0, 40, 1),
(42, 0, '', '', '', 0, 41, 1),
(43, 0, '', '', '', 0, 42, 1),
(44, 0, '', '', '', 0, 43, 1),
(45, 0, '', '', '', 0, 44, 1),
(46, 0, '', '', '', 0, 45, 1),
(47, 0, '', '', '', 0, 46, 1),
(48, 0, '', '', '', 0, 47, 1),
(49, 0, '', '', '', 0, 48, 1),
(50, 0, '', '', '', 0, 49, 1),
(51, 1, '', '', '', 0, 50, 1),
(52, 0, '', '', '', 0, 51, 1),
(53, 1, '', '', '', 0, 52, 1),
(54, 0, '', '', '', 0, 53, 1);

-- --------------------------------------------------------

--
-- Table structure for table `timer`
--

CREATE TABLE IF NOT EXISTS `timer` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `time` varchar(50) NOT NULL,
  `day` int(11) NOT NULL,
  `onoff` int(11) NOT NULL,
  `action` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `timer`
--

INSERT INTO `timer` (`id`, `name`, `time`, `day`, `onoff`, `action`) VALUES
(1, 'test', '9', 0, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `action`
--
ALTER TABLE `action`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `config`
--
ALTER TABLE `config`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `device`
--
ALTER TABLE `device`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item_types`
--
ALTER TABLE `item_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `link`
--
ALTER TABLE `link`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`recnr`), ADD UNIQUE KEY `recnr` (`recnr`);

--
-- Indexes for table `page`
--
ALTER TABLE `page`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `page_items`
--
ALTER TABLE `page_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `port`
--
ALTER TABLE `port`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timer`
--
ALTER TABLE `timer`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `action`
--
ALTER TABLE `action`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `item_types`
--
ALTER TABLE `item_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `link`
--
ALTER TABLE `link`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `log`
--
ALTER TABLE `log`
  MODIFY `recnr` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=138;
--
-- AUTO_INCREMENT for table `page`
--
ALTER TABLE `page`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=101;
--
-- AUTO_INCREMENT for table `page_items`
--
ALTER TABLE `page_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4014;
--
-- AUTO_INCREMENT for table `port`
--
ALTER TABLE `port`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=55;
--
-- AUTO_INCREMENT for table `timer`
--
ALTER TABLE `timer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
