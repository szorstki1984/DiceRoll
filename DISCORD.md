# Konfiguracja Discord Webhook

## Jak uzyskać Discord Webhook URL?

1. **Otwórz serwer Discord** na którym masz uprawnienia administratora
2. Kliknij prawym przyciskiem na kanał, na który chcesz wysyłać wyniki
3. Wybierz **Edytuj kanał** (Edit Channel)
4. Przejdź do zakładki **Integracje** (Integrations)
5. Kliknij **Webhooks** → **Nowy Webhook** (New Webhook)
6. Nazwij webhook (np. "Dice Roller")
7. Skopiuj **URL webhooka** - powinien wyglądać tak:
   ```
   https://discord.com/api/webhooks/123456789/ABCdefGHIjklMNOpqrSTUvwxYZ
   ```

## Jak używać w rozszerzeniu?

1. Otwórz rozszerzenie D10 Dice Roller
2. Kliknij **⚙️ Konfiguracja Discord** aby rozwinąć sekcję
3. **(Opcjonalnie)** Wpisz swój **nick gracza** - będzie wyświetlany przy każdym rzucie
4. Wklej skopiowany **Webhook URL**
5. Kliknij **Zapisz**

### Dwa sposoby wysyłania:

**A) Ręczne wysyłanie:**

- Wykonaj rzut kośćmi
- Kliknij **📤 Wyślij na Discord**

**B) Automatyczne wysyłanie:**

- Zaznacz checkbox **"Wysyłaj automatycznie po rzucie"**
- Każdy rzut będzie automatycznie wysyłany na Discord (nie musisz klikać przycisku)
- Odznacz checkbox, aby wrócić do ręcznego wysyłania

Wyniki rzutu (wraz z Twoim nickiem, jeśli został podany) zostaną wysłane jako wiadomość na wybrany kanał Discord!

## Bezpieczeństwo

- Webhook URL jest zapisywany lokalnie w przeglądarce (chrome.storage.local)
- Nie udostępniaj swojego Webhook URL nikomu - każdy kto go posiada może wysyłać wiadomości na Twój kanał
- Możesz w każdej chwili usunąć lub wygenerować nowy webhook w ustawieniach Discord

## Format wiadomości

Wiadomość wysłana na Discord zawiera:

- **Nick gracza** (jeśli został podany)
- Wyniki białych kości
- Wyniki czerwonych kości (głodu)
- Liczbę sukcesów
- Pary krytyczne (10)
- Informację o krwawej wygranej
- Informację o bestialskiej porażce
- Liczbę jedynek

### Przykład wiadomości:

```
🎲 Rzut kośćmi D10 - Jan Kowalski

Białe kości (5): 10, 10, 8, 3, 1
Czerwone kości głodu (2): 10, 6

📊 Podsumowanie:
Sukcesy: 7
Krytyczne zwycięstwo: 1 para 10
⚠️ Krwawa wygrana
Jedynki: 1
```
