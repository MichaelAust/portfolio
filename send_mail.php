<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';
require 'PHPMailer-master/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

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

    // Extrahieren der Daten aus dem Formular
    $name = $_POST['name'] ?? '';  // Name des Absenders
    $email = $_POST['email'] ?? '';  // E-Mail-Adresse des Absenders
    $nachricht = $_POST['nachricht'] ?? '';  // Nachricht
    $datenschutz = $_POST['Datenschutz'] ?? '';  // Datenschutz-Checkbox

    // Honeypot-Feld überprüfen
    if (!empty($_POST['honeypot'])) {
        // Wenn das Honeypot-Feld ausgefüllt wurde, breche den Prozess ab
        die("Spam-Versuch erkannt.");
    }

    // Überprüfen, ob die Datenschutz-Checkbox aktiviert wurde
    if ($datenschutz != 'akzeptiert') {
        die("Bitte stimmen Sie der Datenschutzerklärung zu.");
    }

    // Zusammenstellen der E-Mail-Nachricht
    $message = "Name: $name\n";
    $message .= "E-Mail: $email\n";
    $message .= "Nachricht: $nachricht\n";

    // E-Mail-Konfiguration
    $mail->setFrom('u94059@michael-aust.com', 'Ihr Name');  // Absenderadresse
    $mail->addAddress('u94059@michael-aust.com');  // Empfängeradresse
    $mail->Subject = 'Neue Kontaktformular-Nachricht';  // Betreff der E-Mail
    $mail->Body = $message;  // Inhalt der E-Mail

    // E-Mail senden
    $mail->send();
    echo "Vielen Dank für Ihre Nachricht. Wir werden uns bald bei Ihnen melden.";  // Erfolgsnachricht
} catch (Exception $e) {
    echo "Fehler beim Senden der Nachricht: ", $mail->ErrorInfo;  // Fehlermeldung
}
?>
