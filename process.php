<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $text = $_POST['text'];
    $option = $_POST['option'];

    // Setzen Sie hier Ihren OpenAI-API-Schlüssel und den Endpunkt ein
    $api_key = 'YOUR API KEY HERE';
    $url = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
    $headers = array(
        "Content-Type: application/json",
        "Authorization: Bearer $api_key"
    );

    if ($option === "executeSuggestion") {
        $suggestion = $_POST['suggestion'];
        $request_text = $suggestion . " basierend auf dem folgenden Text: " . $text;
    } else {
        $request_text = $option === "summary" ? "Bitte erstelle eine kurze, stichpunktartige Zusammenfassung des folgenden Textes und formatiere ihn als Liste: $text" : "Bitte gib bis zu 5 umsetzbare Empfehlungen, die ChatGPT umsetzen kann, um in der folgenden Situation Mehrwert zu schaffen. gib direkt die empfohlene formatierung für das zu erwartende ergebnis mit: $text";
    }

    // Erstellen Sie die Anfrage-JSON-Daten
    $data = array(
        'prompt' => $request_text,
        'max_tokens' => 1500,
        'n' => 1,
        'stop' => null,
        'temperature' => 0,
        'frequency_penalty' => 0,
        'presence_penalty' => 0
    );
    $json_data = json_encode($data);

    // Senden Sie die Anfrage mit cURL
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $response = curl_exec($ch);
    curl_close($ch);

    // Verarbeiten Sie die Antwort und extrahieren Sie den Text
    $response_data = json_decode($response, true);

    $result_text = $response_data['choices'][0]['text'];

    if ($option === "suggestions") {
        // Entfernen Sie "Empfehlungen:" aus dem resultierenden Text
        $result_text = str_replace("Empfehlungen:", "", $result_text);

        $suggestions = explode("\n", trim($result_text));
        echo "<div class='result-section'><h3>Vorschläge:</h3><ul class='suggestions-list'>";
        foreach ($suggestions as $suggestion) {
            echo "<li class='suggestion-item'>$suggestion</li>";
        }
        echo "</ul></div>";
    } else {
        echo "<div class='result-section'><h3>Ergebnis:</h3><pre>$result_text</pre></div>";
    }
}
