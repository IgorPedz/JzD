# Projekt: Jeden z dziesieciu z WebSocket

Aplikacja do tworzenia i zarządzania grami Jeden z dziesieciu, w której gracze mogą uczestniczyć w grze z pytaniami. Aplikacja korzysta z WebSocket do komunikacji w czasie rzeczywistym między serwerem a klientami. Umożliwia tworzenie gier, zarządzanie graczami oraz modyfikację punktów i życia graczy.

## Funkcjonalności

- **Tworzenie gier**: Możliwość tworzenia nowych gier z określoną pulą pytań.
- **Zarządzanie graczami**: Możliwość dodawania graczy do gry oraz wyświetlanie ich danych.
- **Zmiana punktów i życia**: Administracja może zmieniać punkty i życie graczy.
- **Usuwanie graczy**: Administracja może usunąć gracza z gry.
- **WebSocket**: Komunikacja między serwerem a klientami w czasie rzeczywistym.

## Technologie

- **Frontend**: React
- **Backend**: Node.js z WebSocket
- **Baza danych**: MySQL

## Instalacja

## 1. Wymagania wstępne

Upewnij się, że masz zainstalowane na swoim komputerze następujące oprogramowanie:

- [Node.js](https://nodejs.org/) (zalecana wersja: **16.x** lub wyższa)
- [npm](https://www.npmjs.com/) (zainstalowany automatycznie wraz z Node.js)
- [xampp] (https://www.apachefriends.org/pl/index.html)

## 2. Sklonowanie repozytorium

# Uruchom konsole by postawic serwer nodejs
```bash
git clone https://github.com/IgorPedz/JzD.git

cd desktop/projekt

npm install

cd desktop/projekt/server
node server.js
```
# Uruchom kolejną konsole by postawić aplikacje react
```bash
cd desktop/projekt/src
npm start
y
```
