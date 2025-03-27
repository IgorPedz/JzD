-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 28, 2025 at 12:01 AM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projekt_abd`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `uczestnicy`
--

CREATE TABLE `uczestnicy` (
  `id_uczestnika` int(11) NOT NULL,
  `Imie` varchar(50) NOT NULL,
  `Nazwisko` varchar(50) NOT NULL,
  `Klasa` varchar(2) NOT NULL,
  `Punkty` int(11) NOT NULL DEFAULT 0,
  `Życia` int(11) NOT NULL DEFAULT 3
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `uczestnicy`
--

INSERT INTO `uczestnicy` (`id_uczestnika`, `Imie`, `Nazwisko`, `Klasa`, `Punkty`, `Życia`) VALUES
(56, 't', 't', '2p', 0, 2),
(57, 'tes', 'rawe', '32', 3, 3);

--
-- Wyzwalacze `uczestnicy`
--
DELIMITER $$
CREATE TRIGGER `limit_records` BEFORE INSERT ON `uczestnicy` FOR EACH ROW BEGIN
    DECLARE liczba INT;
    SELECT COUNT(*) INTO liczba FROM uczestnicy;
    IF liczba >= 10 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Maksymalna liczba rekordów osiągnięta';
    END IF;
END
$$
DELIMITER ;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `uczestnicy`
--
ALTER TABLE `uczestnicy`
  ADD PRIMARY KEY (`id_uczestnika`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `uczestnicy`
--
ALTER TABLE `uczestnicy`
  MODIFY `id_uczestnika` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
