-- phpMyAdmin SQL Dump
-- version 4.1.9
-- http://www.phpmyadmin.net
--
-- Machine: localhost
-- Gegenereerd op: 02 aug 2014 om 01:12
-- Serverversie: 5.5.29-0ubuntu1
-- PHP-versie: 5.4.9-4ubuntu2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Databank: `nodesql`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `action_ini`
--

CREATE TABLE IF NOT EXISTS `action_ini` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `events` varchar(1024) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Gegevens worden geëxporteerd voor tabel `action_ini`
--

INSERT INTO `action_ini` (`id`, `name`, `events`) VALUES
(1, 'Alles uit', '1-off-0;22-off-0;26-off-0;36-off-0;8-off-0;25-off-0;24-off-0;23-off-0;27-off-0;28-off-0;29-off-0;31-off-0;34-off-0;35-off-0'),
(2, 'Woonkamer aan', '1-on-100;22-on-100;26-on-100;36-on-100;8-on-100'),
(3, 'toilet timed off', '29-toff-30'),
(7, 'achterdeur timed off', '28-toff-900'),
(8, 'NachtL1', '25-toggle-00'),
(9, 'NachtL2', '1-off-0;22-off-0;26-off-0;36-off-0;8-off-0;25-off-0;24-off-0;23-off-0;27-off-0;28-off-0;29-off-0;31-off-0;34-off-0;35-off-0'),
(10, 'Kachel on', '1-off-00');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `device_ini`
--

CREATE TABLE IF NOT EXISTS `device_ini` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `sort` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `opm` varchar(255) NOT NULL,
  `mem` int(20) NOT NULL,
  `pin` varchar(8) NOT NULL,
  `val` int(11) NOT NULL,
  `action` int(11) NOT NULL,
  `inv` int(11) NOT NULL,
  `toff` int(11) NOT NULL,
  `due` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `device_ini`
--

INSERT INTO `device_ini` (`id`, `name`, `sort`, `type`, `opm`, `mem`, `pin`, `val`, `action`, `inv`, `toff`, `due`) VALUES
(37, 'Woonkamer', 77, 1, 'output', 0, 'P8_16', 0, 0, 0, 0, 37),
(40, 'Eettafel', 2, 1, 'output', 0, 'P8_17', 0, 0, 0, 0, 40),
(24, 'Nachtlampje', 0, 1, 'output', 0, 'P8_12', 0, 0, 0, 0, 24),
(30, 'Slaapkamer', 0, 1, 'output', 0, 'P8_9', 0, 0, 0, 0, 30),
(25, 'Hal entree', 0, 1, 'output', 0, 'P8_8', 0, 0, 0, 0, 25),
(23, 'Spot schilderij', 0, 1, 'output', 0, 'P8_7', 0, 0, 0, 0, 23),
(31, 'Spotjes tv', 0, 1, 'output', 0, 'P9_12', 0, 0, 0, 0, 31),
(26, 'Douche', 0, 1, 'output', 0, 'P8_11', 0, 0, 0, 0, 26),
(28, 'Achterdeur', 0, 1, 'output', 0, 'P8_14', 0, 0, 0, 0, 28),
(33, 'Toilet', 0, 1, 'output', 0, 'P9_11', 0, 0, 0, 0, 33),
(35, 'Keuken', 0, 1, 'output', 0, 'P8_18', 0, 0, 0, 0, 35),
(27, 'Trap', 0, 1, 'output', 0, 'P8_10', 0, 0, 0, 0, 27),
(135, 'Buffer', 0, 1, 'output', 0, 'P8_19', 0, 0, 0, 0, 0),
(4001, 'Woonkamer', 0, 4, '28-00000495815b', 0, '', 0, 0, 0, 0, 0),
(1003, 'BoneTime', 0, 2, 'time', 0, '', 0, 0, 0, 0, 0),
(1004, 'BoneDate', 0, 2, 'date', 0, '', 0, 0, 0, 0, 0),
(1005, 'BoneClock', 0, 2, 'seconds', 0, '', 0, 0, 0, 0, 0),
(1006, 'Set clock', 0, 2, 'Button', 0, '', 0, 0, 0, 0, 0),
(1007, 'Temp script', 0, 2, 'Button', 0, '', 0, 0, 0, 0, 0),
(1000, 'Edit items', 0, 2, 'Switch', 0, '', 0, 0, 0, 0, 0),
(1001, 'Edit bkgnd', 0, 2, 'Switch', 0, '', 0, 0, 0, 0, 0),
(1008, 'Reload serverDB', 0, 2, 'Button', 0, '', 0, 0, 0, 0, 0),
(2001, 'key 1', 0, 3, 'input', 0, 'P9_17', 0, 1, 0, 0, 0),
(2002, 'Kachel pomp', 0, 3, 'input', 0, 'P9_14', 0, 10, 0, 0, 0),
(2003, 'PIR toilet', 0, 3, 'input', 0, 'P9_15', 0, 3, 1, 0, 0),
(2004, 'PIR achterdeur', 0, 3, 'input', 0, 'P9_16', 0, 7, 1, 0, 0),
(3001, 'BMV-V', 0, 2, 'BMV-600 serial input', 0, '', 0, 0, 0, 0, 0),
(3002, 'BMV-I', 0, 2, 'BMV-600 serial input', 0, '', 0, 0, 0, 0, 0),
(3003, 'BMV-CE', 0, 2, 'BMV-600 serial input', 0, '', 0, 0, 0, 0, 0),
(3004, 'BMV-SOC', 0, 2, 'BMV-600 serial input', 0, '', 0, 0, 0, 0, 0),
(3005, 'BMV-TTG', 0, 2, 'BMV-600 serial input', 0, '', 0, 0, 0, 0, 0),
(3006, 'BMV-Alarm', 0, 2, 'BMV-600 serial input', 0, '', 0, 0, 0, 0, 0),
(3007, 'BMV-Relay', 0, 2, 'BMV-600 serial input', 0, '', 0, 0, 0, 0, 0),
(3008, 'BMV-W', 0, 2, 'BMV-600 serial input', 0, '', 0, 0, 0, 0, 0),
(4002, 'Kachel boven', 0, 4, '28-00000494fa07', 0, '', 0, 0, 0, 0, 0),
(4003, 'Kachel onder', 0, 4, '28-00000495a8d0', 0, '', 0, 0, 0, 0, 0),
(4004, 'Buffer boven', 0, 4, '28-00000495df77', 0, '', 0, 0, 0, 0, 0),
(4005, 'Buffer midden', 0, 4, '28-0000049586c3', 0, '', 0, 0, 0, 0, 0),
(4006, 'Buffer onder', 0, 4, '28-000004954834', 0, '', 0, 0, 0, 0, 0),
(4008, 'gen onder', 0, 4, '28-00000494bd4b', 0, '', 0, 0, 0, 0, 0),
(4009, 'buiten', 0, 4, '28-00000494bd4b', 0, '', 0, 0, 0, 0, 0),
(4010, 'NachtL2', 0, 3, 'input', 0, 'P9_23', 0, 0, 0, 0, 0),
(4007, 'gen boven', 0, 4, '28-00000494bd4b', 0, '', 0, 0, 0, 0, 0),
(137, 'Omvormer1', 2, 1, '', 0, '', 0, 0, 0, 0, 39);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `event_ini`
--

CREATE TABLE IF NOT EXISTS `event_ini` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_id` int(11) NOT NULL,
  `device_id` int(11) NOT NULL,
  `port` int(11) NOT NULL,
  `action` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `sort` int(11) NOT NULL,
  `device_name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `log`
--

CREATE TABLE IF NOT EXISTS `log` (
  `recnr` int(11) NOT NULL AUTO_INCREMENT,
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
  `b_SOC` float NOT NULL,
  PRIMARY KEY (`recnr`),
  UNIQUE KEY `recnr` (`recnr`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=138 ;

--
-- Gegevens worden geëxporteerd voor tabel `log`
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
-- Tabelstructuur voor tabel `page_ini`
--

CREATE TABLE IF NOT EXISTS `page_ini` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `img` varchar(40) NOT NULL,
  `path` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Gegevens worden geëxporteerd voor tabel `page_ini`
--

INSERT INTO `page_ini` (`id`, `name`, `img`, `path`) VALUES
(1, 'Temperaturen', 'img1.jpg', 'temperaturen'),
(2, 'Entree', 'img6.jpg', 'entree'),
(6, 'Achterdeur', 'img7.jpg', 'achterdeur'),
(7, 'Boven', 'img12.jpg', 'boven');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `page_items_ini`
--

CREATE TABLE IF NOT EXISTS `page_items_ini` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `page_id` int(11) NOT NULL,
  `page_name` varchar(20) NOT NULL,
  `device_id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `xpos` int(11) NOT NULL,
  `ypos` int(11) NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `action` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4005 ;

--
-- Gegevens worden geëxporteerd voor tabel `page_items_ini`
--

INSERT INTO `page_items_ini` (`id`, `name`, `page_id`, `page_name`, `device_id`, `type`, `xpos`, `ypos`, `width`, `height`, `action`) VALUES
(1, 'Eettafel', 1, 'overview', 40, 17, 170, 84, 28, 28, 'toggle'),
(2, 'Woonkamer', 1, 'overview', 37, 17, 82, 236, 28, 28, 'toggle'),
(3, 'Spotjes schilderij', 1, 'clocktime', 23, 17, 129, 172, 28, 28, 'toggle'),
(4, 'WebButton', 1, 'overview', 23, 2, 337, 229, 95, 28, 'toggle'),
(5, 'GoClock', 1, 'overview', 0, 3, 337, 265, 95, 28, 'clocktime'),
(6, 'GoBuffer', 1, 'overview', 0, 3, 337, 301, 95, 28, 'buffer'),
(7, 'GoBuffer2', 1, 'overview', 0, 3, 337, 337, 95, 28, 'buffer'),
(15, 'Douche', 1, 'overview', 26, 17, 48, 388, 28, 28, 'toggle'),
(16, 'Floorplan', 1, 'overview', 0, 99, 8, 59, 676, 572, 'floorplan.png'),
(25, 'Switch', 1, 'overview', 8, 16, 320, 201, 103, 35, ''),
(24, 'Calender', 1, 'overview', 0, 15, 695, 1588, 250, 250, ''),
(23, 'Checkbox', 1, 'overview', 8, 14, 693, 233, 20, 20, ''),
(22, 'Thermometer', 1, 'overview', 8, 13, 421, 1597, 100, 400, ''),
(21, 'Meter', 1, 'overview', 8, 12, 29, 1579, 345, 345, ''),
(20, 'Slider', 1, 'overview', 8, 11, 377, 247, 300, 30, 'dim'),
(19, 'Button', 1, 'overview', 0, 10, 316, 284, 150, 30, 'dim'),
(17, 'Eettafel', 1, 'overview', 40, 17, 219, 84, 28, 28, 'toggle'),
(18, 'Keuken', 1, 'overview', 35, 17, 374, 145, 28, 28, 'toggle'),
(26, 'Lamp', 1, 'overview', 8, 17, 320, 248, 30, 30, ''),
(27, 'SwitchBigGr', 1, 'overview', 8, 18, 691, 68, 52, 28, ''),
(28, 'SwitchBigBl', 1, 'overview', 8, 19, 691, 98, 52, 28, ''),
(29, 'SwitchGr', 1, 'overview', 8, 20, 691, 130, 42, 23, ''),
(30, 'SwitchBl', 1, 'overview', 8, 21, 691, 154, 42, 23, ''),
(31, 'SwitchSmallGr', 1, 'overview', 8, 22, 691, 181, 37, 21, ''),
(32, 'SwitchSmallBl', 1, 'overview', 8, 23, 691, 205, 37, 21, ''),
(35, 'Window_pref', 1, 'overview', 0, 24, 779, 71, 245, 200, ''),
(36, 'Window_log', 1, 'overview', 0, 25, 15, 796, 345, 200, ''),
(38, 'Keuken', 1, 'overview', 35, 17, 302, 145, 28, 28, 'toggle'),
(39, 'Spotjes tv', 1, 'clocktime', 31, 17, 217, 290, 28, 28, 'toggle'),
(40, 'Voordeur', 1, 'clocktime', 25, 17, 88, 126, 28, 28, 'toggle'),
(41, 'Toilet', 1, 'clocktime', 33, 17, 39, 83, 28, 28, 'toggle'),
(42, 'Slaapkamer', 1, 'clocktime', 30, 17, 227, 479, 28, 28, 'toggle'),
(43, 'Nachtlampje', 1, 'clocktime', 24, 17, 186, 579, 28, 28, 'toggle'),
(44, 'Achterdeur', 1, 'clocktime', 28, 17, 471, 84, 28, 28, 'toggle'),
(45, 'Achterdeur', 1, 'clocktime', 28, 17, 483, 166, 28, 28, 'toggle'),
(46, 'Trap', 1, 'clocktime', 27, 17, 125, 401, 28, 28, 'toggle'),
(47, 'Buffer', 1, 'clocktime', 28, 17, 626, 81, 28, 28, 'toggle'),
(48, 'Buffer', 1, 'clocktime', 28, 17, 541, 82, 28, 28, 'toggle'),
(50, 'Window_action', 1, 'overview', 0, 27, 306, 321, 245, 150, ''),
(56, 'Window_input_key', 1, 'overview', 0, 26, 303, 490, 245, 200, ''),
(54, 'Window_bmv', 1, 'overview', 0, 28, 779, 389, 245, 200, ''),
(57, 'Window_temp', 1, 'overview', 0, 29, 543, 386, 245, 200, ''),
(58, 'Woonkamer', 1, 'overview', 0, 30, 671, 298, 100, 80, ''),
(60, 'boven', 1, 'overview', 0, 30, 581, 731, 100, 80, ''),
(61, 'beneden', 1, 'overview', 0, 30, 580, 819, 100, 80, ''),
(69, 'boven', 1, 'overview', 0, 30, 717, 717, 100, 80, ''),
(70, 'midden', 1, 'overview', 0, 30, 711, 804, 100, 80, ''),
(71, 'onder', 1, 'overview', 0, 30, 717, 897, 100, 80, ''),
(72, 'boven', 1, 'overview', 0, 30, 882, 830, 100, 80, ''),
(73, 'onder', 1, 'overview', 0, 30, 879, 915, 100, 80, ''),
(74, 'buiten', 1, 'overview', 0, 30, 879, 960, 100, 80, '');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `port_ini`
--

CREATE TABLE IF NOT EXISTS `port_ini` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `inout` int(11) NOT NULL,
  `omschr` varchar(256) NOT NULL,
  `type` varchar(20) NOT NULL,
  `connect` varchar(20) NOT NULL,
  `pwm` int(11) NOT NULL DEFAULT '0',
  `port` int(11) NOT NULL,
  `visible` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=55 ;

--
-- Gegevens worden geëxporteerd voor tabel `port_ini`
--

INSERT INTO `port_ini` (`id`, `inout`, `omschr`, `type`, `connect`, `pwm`, `port`, `visible`) VALUES
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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
