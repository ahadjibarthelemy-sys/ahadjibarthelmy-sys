async function sendMessage() {
    const messageInput = document.getElementById('user-message');
    const statusMsg = document.getElementById('status-msg');
    const message = messageInput.value;

    if (!message.trim()) {
        statusMsg.innerText = "Le message ne peut pas être vide !";
        return;
    }

    try {
        const response = await fetch('/api/send-message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });

        if (response.ok) {
            statusMsg.style.color = "#4CAF50";
            statusMsg.innerText = "Message envoyé anonymement ! ❤️";
            messageInput.value = ""; // Vide le champ
        } else {
            statusMsg.innerText = "Erreur lors de l'envoi.";
        }
    } catch (error) {
        console.error("Erreur :", error);
        statusMsg.innerText = "Le serveur ne répond pas.";
    }
}