<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';
require 'PHPMailer-master/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Turnstile Secret Key
$secretKey = '0x4AAAAAAA06QGgSRwkn9dNUFvRotUeAsJk';

// Daten aus dem Formular
$name = $_POST['name'] ?? '';          // Name des Absenders
$email = $_POST['email'] ?? '';        // E-Mail-Adresse des Absenders
$nachricht = $_POST['nachricht'] ?? '';// Nachricht
$datenschutz = $_POST['Datenschutz'] ?? ''; // Datenschutz-Checkbox
$turnstileResponse = $_POST['cf-turnstile-response'] ?? ''; // Turnstile-Token

// Honeypot-Feld überprüfen
if (!empty($_POST['honeypot'])) {
    die("Spam-Versuch erkannt.");
}

// Überprüfen, ob die Datenschutz-Checkbox aktiviert wurde
if ($datenschutz != 'akzeptiert') {
    die("Please accept the privacy policy.");
}

// Turnstile-Antwort validieren
$verifyResponse = file_get_contents("https://challenges.cloudflare.com/turnstile/v0/siteverify", false, stream_context_create([
    'http' => [
        'header' => "Content-type: application/x-www-form-urlencoded\r\n",
        'method' => 'POST',
        'content' => http_build_query([
            'secret' => $secretKey,
            'response' => $turnstileResponse,
        ]),
    ],
]));

$verificationResult = json_decode($verifyResponse, true);

if (!$verificationResult['success']) {
    die("Turnstile-Überprüfung fehlgeschlagen. Bitte versuche es erneut.");
}

// Erstellen des PHPMailer-Objekts
$mail = new PHPMailer(true);

try {
    // SMTP-Konfiguration für manitu.de
    $mail->isSMTP();
    $mail->Host = 'mail.manitu.de';  // SMTP-Server von manitu.de
    $mail->SMTPAuth = true;
    $mail->Username = 'u94059@michael-aust.com';  // Benutzername (manitu.de E-Mail-Adresse)
    $mail->Password = 'G4cegixa4?!';  // Passwort
    $mail->SMTPSecure = 'ssl';  // Verschlüsselung (SSL)
    $mail->Port = 465;  // SMTP-Port für SSL

    // Zeichensatz auf UTF-8 setzen
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';

    // Zusammenstellen der E-Mail-Nachricht
    $message = "Name: $name\n";
    $message .= "E-Mail: $email\n";
    $message .= "Nachricht: $nachricht\n";

    // E-Mail-Konfiguration
    $mail->setFrom('u94059@michael-aust.com', 'Ihr Name');  // Absenderadresse
    $mail->addAddress('u94059@michael-aust.com');  // Empfängeradresse
    $mail->Subject = 'Kontaktformular Portfolio';  // Betreff der E-Mail
    $mail->Body = $message;  // Inhalt der E-Mail

    // E-Mail senden
    $mail->send();
    echo "Thank you for your message. I will get back to you as soon as possible.";  // Erfolgsnachricht
} catch (Exception $e) {
    echo "Error with sending message: ", $mail->ErrorInfo;  // Fehlermeldung
}
