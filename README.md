# React-SpringBoot WebSocket Project

This project is a demonstration of using WebSocket communication between a React frontend and a Spring Boot backend. It allows users to send and receive messages in real-time using WebSocket connections.

## Overview
If two clients try to open same endpoint, first client's message changes and last client gets new message. 
### Example for using
- First client sends a message
- First client's first message: Music opened
- Second client sends a same message with first cliend
- First client's message changes into: Music closed
- Second client's first messsage: Music opened

## Features
- Real-time messaging between users
- Dynamic message updates based on user actions
- Use of session ID to manage message state

## Getting Started
1. First create a new Spring Boot project.
1. Add WebMvcConfigurer to Spring Boot project
1. Add WebSocket configuration and controller
1. Run the Spring Boot project 
1. Run this project

## poml.xml
```java
<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-websocket<artifactId>
</dependency>
```
## WebSocket Configuration in Spring Boot
```java 

@Configuration
public class MyWebMvcConfigurer implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // Allowed origins
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allowed methods
                .allowedHeaders("Content-Type", "Authorization"); // Allowed headers
    }
}
```
## WebSocket Controller in Spring Boot
```java
@Controller
@EnableWebSocketMessageBroker
public class SocketMessageController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    private final Map<String, String> playbackSessions = new HashMap<>();

    @MessageMapping("/user-message-{userName}")
    public void sendToOtherUser(@Payload String message, @DestinationVariable String userName, @Header("sessionID") String sessionId) {
        synchronized (playbackSessions) {
            String previousSessionId = playbackSessions.get(userName);
            if (previousSessionId != null) {
                messagingTemplate.convertAndSend("/queue/reply-" + previousSessionId,
                        "You have a message from someone: " + message + userName + " closed " + sessionId);
            }
            playbackSessions.put(userName, sessionId);
        }
        messagingTemplate.convertAndSend("/queue/reply-" + sessionId,
                "You have a message from someone: " + message + userName + " opened " + sessionId);
    }
}
```