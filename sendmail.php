<?php
/* ============================================================
   FUNDOMENTAL FILMS — Contact form mail handler
   ============================================================
   Upload this file to your site root on cPanel (PHP hosting).
   The contact form (js/app.js) POSTs here via fetch().

   SETUP (do these in cPanel):
   1. Create the mailbox you want to RECEIVE at, and set $to below.
   2. Create a sending address on your own domain (e.g.
      no-reply@yourdomain.com) and set $from below. The "From"
      MUST be on your domain or most hosts silently drop the mail
      (SPF/DKIM). Reply-To is set to the visitor so you can just
      hit "Reply".
   ============================================================ */

header('Content-Type: application/json; charset=utf-8');

/* ---- CONFIG — EDIT THESE TWO LINES ---- */
$to   = 'hello@fundomentalfilms.com';       // your cPanel inbox
$from = 'no-reply@fundomentalfilms.com';     // an address on YOUR domain
$subjectPrefix = 'Fundomental Films — Website enquiry';

/* ---- Only accept POST ---- */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

/* ---- Honeypot: bots fill the hidden "company" field ---- */
if (!empty($_POST['company'])) {
    echo json_encode(['ok' => true]); // pretend success so bots don't retry
    exit;
}

/* ---- Collect + trim ---- */
$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$message = trim($_POST['message'] ?? '');

/* ---- Validate ---- */
$fieldErrors = [];
if ($name === '')                                    $fieldErrors[] = 'name';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))      $fieldErrors[] = 'email';
if ($message === '')                                 $fieldErrors[] = 'message';

if ($fieldErrors) {
    http_response_code(422);
    echo json_encode([
        'ok'     => false,
        'error'  => 'Please fill in all fields correctly.',
        'fields' => $fieldErrors,
    ]);
    exit;
}

/* ---- Strip CR/LF from single-line fields (header-injection guard) ---- */
$name  = str_replace(["\r", "\n"], ' ', $name);
$email = str_replace(["\r", "\n"], ' ', $email);

/* ---- Compose ---- */
$subject = $subjectPrefix . ' from ' . $name;
$body  = "New message from the website contact form.\n\n";
$body .= "Name:  $name\n";
$body .= "Email: $email\n";
$body .= "----------------------------------------\n\n";
$body .= $message . "\n";

$headers   = [];
$headers[] = 'From: ' . $from;
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=utf-8';
$headers[] = 'X-Mailer: PHP/' . phpversion();

/* ---- Send ---- */
$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode([
        'ok'    => false,
        'error' => 'Sorry, the message could not be sent. Please email us directly.',
    ]);
}
