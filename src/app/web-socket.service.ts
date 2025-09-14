import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private client: Client;
  private noteRefreshSubject = new Subject<void>()

  noteRefresh$ = this.noteRefreshSubject.asObservable();

  constructor() {
    this.client = new Client();
  }

  connect(topic: string, callback: (message: any) => void) {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 0,
      debug: (str) => console.log("📡 STOMP Debug:", str), // <-- enable STOMP logs
      onConnect: () => {
        console.log("✅ WebSocket connected to", topic);
        this.client.subscribe(topic, (msg: IMessage) => {
          console.log("📩 Message received on", topic, ":", msg.body);

          try {
            const parsedMessage = JSON.parse(msg.body);
            callback(parsedMessage);
          } catch (e) {
            callback(msg.body); // fallback if plain string
          }

          // Trigger refresh
          this.noteRefreshSubject.next()
        });
      },
      onStompError: (frame) => {
        console.error("❌ STOMP error:", frame.headers['message']);
        console.error("Details:", frame.body);
      },
      onWebSocketError: (event) => {
        console.error("❌ WebSocket error:", event);
      }
    });

    this.client.activate();
  }

  disconnect() {
    if (this.client && this.client.active) {
      this.client.deactivate();
      console.log("🔌 WebSocket disconnected");
    }
  }
}

