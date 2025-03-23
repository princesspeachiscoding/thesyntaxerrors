document.addEventListener("DOMContentLoaded", function () {
    // Check if Botpress WebChat is initialized correctly
    if (window.botpressWebChat) {
        console.log("Botpress WebChat initialized successfully!");
    }

    // You can programmatically trigger Botpress actions here if needed
    // For example, you can send a message to the bot immediately upon loading
    window.botpressWebChat.sendEvent({
        type: 'text',
        text: 'Hello, Penny AI! I need help with my budget.',
    });

    // You can also listen for events or send messages on specific interactions
    document.getElementById("user-interaction").addEventListener("click", function() {
        // Trigger a message or event to the bot
        window.botpressWebChat.sendEvent({
            type: 'text',
            text: 'How can I better manage my finances?',
        });
    });
});
