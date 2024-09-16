// // src/services/socketService.ts
// import {io, Socket} from 'socket.io-client';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// class SocketService {
//   socket: Socket | null = null;
//   isConnected = false;

//   async connect() {
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       const userId = await AsyncStorage.getItem('userId');

//       if (!token || !userId) {
//         console.error('User token or ID is missing');
//         return;
//       }

//       // Initialize socket connection
//       this.socket = io('http://192.168.2.228:3000', {
//         auth: {
//           token,
//           userId,
//         },
//         reconnectionAttempts: 5,
//         reconnectionDelay: 3000,
//       });

//       this.socket.on('connect', () => {
//         this.isConnected = true;
//         console.log('Connected to socket server:', this.socket?.id);
//       });

//       this.socket.on('disconnect', () => {
//         this.isConnected = false;
//         console.log('Disconnected from socket server');
//       });

//       this.socket.on('connect_error', error => {
//         console.error('Socket connection error:', error.message);
//       });
//     } catch (error) {
//       console.error('Error during socket connection:', error);
//     }
//   }

//   joinConversation(conversationId: string) {
//     if (this.socket && this.isConnected) {
//       this.socket.emit('joinConversation', conversationId);
//       console.log(`Joined conversation room: ${conversationId}`);
//     } else {
//       console.warn('Socket not connected, cannot join conversation');
//     }
//   }

//   sendMessage(
//     conversationId: string,
//     message: string,
//     callback: (message: any) => void,
//   ) {
//     if (this.socket && this.isConnected) {
//       this.socket.emit('sendMessage', {conversationId, message}, callback);
//       console.log('Sent message:', {conversationId, message});
//     } else {
//       console.warn('Socket not connected, cannot send message');
//     }
//   }

//   onNewMessage(callback: (message: any) => void) {
//     if (this.socket) {
//       this.socket.on('newMessage', callback);
//       console.log('Listening for new messages');
//     } else {
//       console.warn('Socket not connected, cannot listen for new messages');
//     }
//   }

//   disconnect() {
//     if (this.socket) {
//       this.socket.disconnect();
//       this.socket = null;
//       this.isConnected = false;
//       console.log('Socket disconnected and cleaned up');
//     }
//   }
// }

// export default new SocketService();
