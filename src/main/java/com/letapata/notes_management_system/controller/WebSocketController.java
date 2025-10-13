package com.letapata.notes_management_system.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    // Client sends message to /app/client-message
    @MessageMapping("/client-message")
    // Server broadcasts messages to  /topic/notes
    @SendTo("/topic/notes")
    public String sayHello(String message) throws Exception {
        System.out.println("Received message: " + message);
        // Here you could transform the message, e.g, add a timestamp
        return message;
    }
}
