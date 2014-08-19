-- phpMyAdmin SQL Dump
-- version 4.1.9
-- http://www.phpmyadmin.net
--
-- Machine: localhost
-- Gegenereerd op: 04 mei 2014 om 16:34
-- Serverversie: 5.6.16
-- PHP-versie: 5.4.24

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
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4012 ;

--
-- Gegevens worden geëxporteerd voor tabel `device_ini`
--

INSERT INTO `device_ini` (`id`, `name`, `sort`, `type`, `opm`, `mem`, `pin`, `val`, `action`, `inv`, `toff`) VALUES
(1, 'Woonkamer', 77, 1, '', 0, 'P8_16', 0, 0, 0, 0),
(8, 'Eettafel', 2, 1, '', 0, 'P8_17', 0, 0, 0, 0),
(25, 'Nachtlampje', 0, 1, '', 0, 'P8_12', 0, 0, 0, 0),
(24, 'Slaapkamer', 0, 1, '', 0, 'P8_9', 0, 0, 0, 0),
(23, 'Hal entree', 0, 1, '', 0, 'P8_8', 0, 0, 0, 0),
(22, 'Spot schilderij', 0, 1, '', 0, 'P8_7', 0, 0, 0, 0),
(36, 'Spotjes tv', 0, 1, '', 0, 'P9_12', 0, 0, 0, 0),
(27, 'Douche', 0, 1, '', 0, 'P8_11', 0, 0, 0, 0),
(28, 'Achterdeur', 0, 1, '', 0, 'P8_14', 0, 0, 0, 0),
(29, 'Toilet', 0, 1, '', 0, 'P9_11', 0, 0, 0, 0),
(31, 'Keuken', 0, 1, '', 0, 'P8_18', 0, 0, 0, 0),
(34, 'Trap', 0, 1, '', 0, 'P8_10', 0, 0, 0, 0),
(35, 'Buffer', 0, 1, '', 0, 'P8_19', 0, 0, 0, 0),
(4001, 'Woonkamer', 0, 4, '28-00000495815b', 0, '', 0, 0, 0, 0),
(1003, 'BoneTime', 0, 2, 'time', 0, '', 0, 0, 0, 0),
(1004, 'BoneDate', 0, 2, 'date', 0, '', 0, 0, 0, 0),
(1005, 'BoneClock', 0, 2, 'seconds', 0, '', 0, 0, 0, 0),
(1006, 'Set clock', 0, 2, 'Button', 0, '', 0, 0, 0, 0),
(1007, 'Temp script', 0, 2, 'Button', 0, '', 0, 0, 0, 0),
(1000, 'Edit items', 0, 2, 'Switch', 0, '', 0, 0, 0, 0),
(1001, 'Edit bkgnd', 0, 2, 'Switch', 0, '', 0, 0, 0, 0),
(1008, 'Reload serverDB', 0, 2, 'Button', 0, '', 0, 0, 0, 0),
(2001, 'key 1', 0, 3, 'input', 0, 'P9_17', 0, 1, 0, 0),
(2002, 'Kachel pomp', 0, 3, 'input', 0, 'P9_14', 0, 10, 0, 0),
(2003, 'PIR toilet', 0, 3, 'input', 0, 'P9_15', 0, 3, 1, 0),
(2004, 'PIR achterdeur', 0, 3, 'input', 0, 'P9_16', 0, 7, 1, 0),
(3001, 'BMV-V', 0, 2, 'BMV-600 serial input', 0, '', 0, 0, 0, 0),
(3002, 'BMV-I', 0, 2, 'BMV-600 serial input', 0, '', 0, 0, 0, 0),
(3003, 'BMV-CE', 0, 2, 'BMV-600 serial input', 0, '', 0, 0, 0, 0),
(3004, 'BMV-SOC', 0, 2, 'BMV-600 serial input', 0, '', 0, 0, 0, 0),
(3005, 'BMV-TTG', 0, 2, 'BMV-600 serial input', 0, '', 0, 0, 0, 0),
(3006, 'BMV-Alarm', 0, 2, 'BMV-600 serial input', 0, '', 0, 0, 0, 0),
(3007, 'BMV-Relay', 0, 2, 'BMV-600 serial input', 0, '', 0, 0, 0, 0),
(3008, 'BMV-W', 0, 2, 'BMV-600 serial input', 0, '', 0, 0, 0, 0),
(4002, 'Kachel boven', 0, 4, '28-00000494fa07', 0, '', 0, 0, 0, 0),
(4003, 'Kachel onder', 0, 4, '28-00000495a8d0', 0, '', 0, 0, 0, 0),
(4004, 'Buffer boven', 0, 4, '28-00000495df77', 0, '', 0, 0, 0, 0),
(4005, 'Buffer midden', 0, 4, '28-0000049586c3', 0, '', 0, 0, 0, 0),
(4006, 'Buffer onder', 0, 4, '28-000004954834', 0, '', 0, 0, 0, 0),
(4008, 'gen onder', 0, 4, '28-00000494bd4b', 0, '', 0, 0, 0, 0),
(4009, 'buiten', 0, 4, '28-00000494bd4b', 0, '', 0, 0, 0, 0),
(4010, 'NachtL2', 0, 3, 'input', 0, 'P9_23', 0, 0, 0, 0),
(4007, 'gen boven', 0, 4, '28-00000494bd4b', 0, '', 0, 0, 0, 0);

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
-- Tabelstructuur voor tabel `page_ini`
--

CREATE TABLE IF NOT EXISTS `page_ini` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `img` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Gegevens worden geëxporteerd voor tabel `page_ini`
--

INSERT INTO `page_ini` (`id`, `name`, `img`) VALUES
(1, 'Beneden', ''),
(2, 'Entree', ''),
(6, 'Achterdeur', ''),
(7, 'Boven', '');

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
(1, 'Eettafel', 1, 'overview', 8, 17, 170, 84, 28, 28, 'toggle'),
(2, 'Woonkamer', 1, 'overview', 1, 17, 82, 236, 28, 28, 'toggle'),
(3, 'Spotjes schilderij', 1, 'clocktime', 22, 17, 129, 172, 28, 28, 'toggle'),
(4, 'WebButton', 1, 'overview', 22, 2, 337, 229, 95, 28, 'toggle'),
(5, 'GoClock', 1, 'overview', 0, 3, 337, 265, 95, 28, 'clocktime'),
(6, 'GoBuffer', 1, 'overview', 0, 3, 337, 301, 95, 28, 'buffer'),
(7, 'GoBuffer2', 1, 'overview', 0, 3, 337, 337, 95, 28, 'buffer'),
(15, 'Douche', 1, 'overview', 27, 17, 48, 388, 28, 28, 'toggle'),
(16, 'Floorplan', 1, 'overview', 0, 99, 8, 59, 676, 572, 'floorplan.png'),
(25, 'Switch', 1, 'overview', 8, 16, 320, 201, 103, 35, ''),
(24, 'Calender', 1, 'overview', 0, 15, 695, 1588, 250, 250, ''),
(23, 'Checkbox', 1, 'overview', 8, 14, 693, 233, 20, 20, ''),
(22, 'Thermometer', 1, 'overview', 8, 13, 421, 1597, 100, 400, ''),
(21, 'Meter', 1, 'overview', 8, 12, 29, 1579, 345, 345, ''),
(20, 'Slider', 1, 'overview', 8, 11, 377, 247, 300, 30, 'dim'),
(19, 'Button', 1, 'overview', 0, 10, 316, 284, 150, 30, 'dim'),
(17, 'Eettafel', 1, 'overview', 8, 17, 219, 84, 28, 28, 'toggle'),
(18, 'Keuken', 1, 'overview', 31, 17, 374, 145, 28, 28, 'toggle'),
(26, 'Lamp', 1, 'overview', 8, 17, 320, 248, 30, 30, ''),
(27, 'SwitchBigGr', 1, 'overview', 8, 18, 691, 68, 52, 28, ''),
(28, 'SwitchBigBl', 1, 'overview', 8, 19, 691, 98, 52, 28, ''),
(29, 'SwitchGr', 1, 'overview', 8, 20, 691, 130, 42, 23, ''),
(30, 'SwitchBl', 1, 'overview', 8, 21, 691, 154, 42, 23, ''),
(31, 'SwitchSmallGr', 1, 'overview', 8, 22, 691, 181, 37, 21, ''),
(32, 'SwitchSmallBl', 1, 'overview', 8, 23, 691, 205, 37, 21, ''),
(35, 'Window_pref', 1, 'overview', 0, 24, 779, 71, 245, 200, ''),
(36, 'Window_log', 1, 'overview', 0, 25, 15, 796, 345, 200, ''),
(38, 'Keuken', 1, 'overview', 31, 17, 302, 145, 28, 28, 'toggle'),
(39, 'Spotjes tv', 1, 'clocktime', 36, 17, 217, 290, 28, 28, 'toggle'),
(40, 'Voordeur', 1, 'clocktime', 23, 17, 88, 126, 28, 28, 'toggle'),
(41, 'Toilet', 1, 'clocktime', 29, 17, 39, 83, 28, 28, 'toggle'),
(42, 'Slaapkamer', 1, 'clocktime', 24, 17, 227, 479, 28, 28, 'toggle'),
(43, 'Nachtlampje', 1, 'clocktime', 25, 17, 186, 579, 28, 28, 'toggle'),
(44, 'Achterdeur', 1, 'clocktime', 28, 17, 471, 84, 28, 28, 'toggle'),
(45, 'Achterdeur', 1, 'clocktime', 28, 17, 483, 166, 28, 28, 'toggle'),
(46, 'Trap', 1, 'clocktime', 34, 17, 125, 401, 28, 28, 'toggle'),
(47, 'Buffer', 1, 'clocktime', 35, 17, 626, 81, 28, 28, 'toggle'),
(48, 'Buffer', 1, 'clocktime', 35, 17, 541, 82, 28, 28, 'toggle'),
(50, 'Window_action', 1, 'overview', 0, 27, 543, 278, 245, 150, ''),
(56, 'Window_input_key', 1, 'overview', 0, 26, 544, 447, 245, 200, ''),
(54, 'Window_bmv', 1, 'overview', 0, 28, 779, 389, 245, 200, ''),
(57, 'Window_temp', 1, 'overview', 0, 29, 310, 326, 245, 200, ''),
(58, 'Woonkamer', 1, 'overview', 0, 30, 447, 696, 100, 80, ''),
(60, 'boven', 1, 'overview', 0, 30, 581, 731, 100, 80, ''),
(61, 'beneden', 1, 'overview', 0, 30, 580, 819, 100, 80, ''),
(69, 'boven', 1, 'overview', 0, 30, 717, 717, 100, 80, ''),
(70, 'midden', 1, 'overview', 0, 30, 711, 804, 100, 80, ''),
(71, 'onder', 1, 'overview', 0, 30, 717, 897, 100, 80, ''),
(72, 'boven', 1, 'overview', 0, 30, 882, 830, 100, 80, ''),
(73, 'onder', 1, 'overview', 0, 30, 879, 915, 100, 80, ''),
(74, 'buiten', 1, 'overview', 0, 30, 879, 925, 100, 80, '');

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
