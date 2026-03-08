# D10 Dice Roller - Chrome Extension

Rozszerzenie Chrome do rzucania dziesięciościennymi kośćmi (d10) z podziałem na kości normalne (białe) i kości głodu (czerwone).

## Funkcje

- 🎲 Rzuty kośćmi d10
- ⚪ Białe kości (normalne)
- 🔴 Czerwone kości (głód)
- 📊 Graficzne przedstawienie wyników
- ✨ Animacje rzutów
- 📈 Podsumowanie statystyk (sukcesy, krytyczne zwycięstwa, bestialskie porażki)
- 📤 **Integracja z Discord** - wysyłaj wyniki na kanał Discord przez webhook
- 💾 Automatyczne zapisywanie konfiguracji Discord

## Instalacja

### 1. Zainstaluj zależności

```bash
npm install
```

### 2. Zbuduj projekt

```bash
npm run build
```

To skompiluje pliki TypeScript do JavaScript w folderze `dist/`.

### 3. Załaduj rozszerzenie do Chrome

1. Otwórz Chrome i przejdź do `chrome://extensions/`
2. Włącz **Tryb dewelopera** (Developer mode) w prawym górnym rogu
3. Kliknij **Załaduj rozpakowane** (Load unpacked)
4. Wybierz folder `Roll` (główny folder projektu)

## Użytkowanie

1. Kliknij ikonę rozszerzenia w pasku narzędzi Chrome - otworzy się panel boczny
2. Panel pozostanie otwarty nawet po kliknięciu poza nim
3. Wybierz liczbę białych kości (0-20)
4. Wybierz liczbę czerwonych kości głodu (0-20)
5. Kliknij **RZUĆ KOŚĆMI**
6. Zobacz wyniki z podziałem na kości białe i czerwone

**Uwaga**: Rozszerzenie działa jako panel boczny Chrome i pozostaje widoczne dopóki go ręcznie nie zamkniesz.

### Interpretacja wyników

- **Liczba od 6 do 9**: Sukces
- **10**: Krytyczny sukces (wyróżniony zielonym dla białych kości, złotym dla czerwonych)
- **1**: Krytyczna porażka (szare dla białych kości)

## Integracja z Discord

Rozszerzenie pozwala wysyłać wyniki rzutów bezpośrednio na kanał Discord przez webhook.

### Konfiguracja

1. Utwórz webhook na swoim kanale Discord (zobacz [DISCORD.md](DISCORD.md) dla szczegółowej instrukcji)
2. Otwórz rozszerzenie i kliknij **⚙️ Konfiguracja Discord**
3. Wklej URL webhooka
4. Kliknij **Zapisz**

### Wysyłanie wyników

1. Wykonaj rzut kośćmi
2. Kliknij **📤 Wyślij na Discord**
3. Wyniki pojawią się na Twoim kanale Discord!

📖 Szczegółowa instrukcja: [DISCORD.md](DISCORD.md)

## Rozwój

### Tryb watch (automatyczna kompilacja)

```bash
npm run watch
```

To będzie automatycznie kompilować TypeScript przy każdej zmianie plików.

### Struktura projektu

```
Roll/
├── src/
│   └── popup.ts          # Logika TypeScript
├── dist/                 # Skompilowane pliki JS (generowane)
├── icons/                # Ikony rozszerzenia
├── manifest.json         # Manifest Chrome Extension
├── popup.html            # Interface użytkownika
├── styles.css            # Stylowanie
├── package.json          # Zależności npm
└── tsconfig.json         # Konfiguracja TypeScript
```

## Technologie

- TypeScript
- HTML5
- CSS3
- Chrome Extensions Manifest V3

## Licencja

MIT
