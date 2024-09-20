// src/hooks/useNetworkStatus.ts
import {useEffect, useState, useRef} from 'react';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {Alert} from 'react-native';

interface NetworkStatus {
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
}

const useNetworkStatus = (): NetworkStatus => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isConnected: null,
    isInternetReachable: null,
  });

  // Sử dụng useRef để lưu trạng thái trước đó
  const previousIsConnected = useRef<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const {isConnected, isInternetReachable} = state;

      // Kiểm tra và hiển thị alert khi mất kết nối mạng hoặc internet không khả dụng
      if (isConnected === false || isInternetReachable === false) {
        if (previousIsConnected.current !== false) {
          Alert.alert(
            'Mất kết nối',
            'Không có kết nối mạng. Vui lòng kiểm tra lại!',
            [{text: 'OK'}],
          );
        }
      } else if (isConnected && isInternetReachable) {
        // Hiển thị alert khi kết nối lại thành công sau khi bị mất
        if (previousIsConnected.current === false) {
          Alert.alert(
            'Kết nối lại thành công',
            'Bạn đã kết nối lại với internet.',
            [{text: 'OK'}],
          );
        }
      }

      // Cập nhật giá trị ref để lưu trạng thái trước đó
      previousIsConnected.current = isConnected;

      // Cập nhật trạng thái hiện tại
      setNetworkStatus({
        isConnected,
        isInternetReachable,
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return networkStatus;
};

export default useNetworkStatus;
