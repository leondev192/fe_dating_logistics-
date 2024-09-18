export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  MainTabs: undefined;
  Welcome: undefined;
  Home: undefined;
  Discount: undefined;
  Order: undefined;
  Notification: undefined;
  Profile: undefined;
  VerifyOtpForgotPassword: undefined;
  VerifyOtp: undefined;
  ResetPassword: {token: string};
  EditLookingForTransportPost: {postId: string};
  EditOfferingTransportPost: {postId: string};
  CreateLookingForTransportPost: undefined;
  CreateOfferingTransportPost: undefined;
  TheoDoiDonHangScreen: undefined;
  UserPostsScreen: undefined; // Thêm dòng này nếu thiếu
  Message: undefined;
  Account: undefined;
  MainNavigator: undefined;
  AuthNavigator: undefined;
  ChatDetail: {conversationId: string};
  ConversationDetail: undefined;
  UserDetailScreen: undefined;
};

export default RootStackParamList;
