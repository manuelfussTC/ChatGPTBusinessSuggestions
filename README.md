# ChatGPTBusinessSuggestions

Dieses Repository enthält eine einfache Webanwendung, die mit OpenAI's ChatGPT kommuniziert, um Texte zu analysieren und Geschäftsvorschläge zu generieren. Die Anwendung besteht aus einer einfachen HTML-Datei (index.html), einem Stylesheet (styles.css), einem JavaScript-File (scripts.js) und einem PHP-Script (process.php) für die Serverkommunikation mit der OpenAI-API.

## Vorbereitung

Bevor Sie die Anwendung nutzen können, müssen Sie Ihren OpenAI-API-Schlüssel einfügen. Öffnen Sie die `process.php`-Datei und ersetzen Sie die folgende Zeile:

```php
$api_key = 'YOUR API KEY HERE';
```

Ersetzen Sie den Platzhalter 'YOUR API KEY HERE' durch Ihren eigenen OpenAI-API-Schlüssel.

## Nutzung
Um die Webanwendung zu testen, können Sie einen lokalen PHP-Server verwenden. Stellen Sie sicher, dass PHP auf Ihrem System installiert ist und navigieren Sie im Terminal (oder der Kommandozeile) zu dem Verzeichnis, in dem sich die `index.html`-Datei befindet. Starten Sie den lokalen PHP-Server mit dem folgenden Befehl:

```
php -S localhost:9000
```

Öffnen Sie nun einen Webbrowser und gehen Sie zu http://localhost:9000, um die Webanwendung zu verwenden. Geben Sie Ihren Text in das bereitgestellte Textfeld ein, wählen Sie eine Option (Zusammenfassung oder Geschäftsvorschläge) aus dem Dropdown-Menü und klicken Sie auf "Senden", um die Analyse zu starten. Die Ergebnisse werden unterhalb des Formulars angezeigt.

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz, das bedeutet, dass jeder es frei verwenden, ändern und verteilen kann. Weitere Informationen finden Sie in der LICENSE-Datei.

## Beiträge

Fühlen Sie sich frei, Beiträge zu diesem Projekt zu leisten, indem Sie Fehler melden, Verbesserungen vorschlagen oder Pull-Anfragen einreichen.