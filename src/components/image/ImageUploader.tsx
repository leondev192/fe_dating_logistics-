// src/components/image/ImageUploader.tsx
import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';
import axios from 'axios';
import {
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_API_URL,
} from '../../apis/cloudinary.config';
import {Add} from 'iconsax-react-native'; // Import icon Add từ iconsax-react-native

interface ImageUploaderProps {
  onImageUpload: (url: string) => void; // Hàm callback để truyền URL về component cha
  currentImageUrl?: string; // URL của ảnh hiện tại (nếu có)
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  currentImageUrl,
}) => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(currentImageUrl || ''); // Trạng thái để lưu URL ảnh hiện tại

  // Chọn ảnh từ thư viện và tự động upload
  const handleChoosePhoto = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        // console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        await handleUploadPhoto(asset); // Upload ảnh ngay sau khi chọn
      }
    });
  };

  // Upload ảnh lên Cloudinary
  const handleUploadPhoto = async (selectedImage: Asset) => {
    setUploading(true);

    const data = new FormData();
    data.append('file', {
      uri: selectedImage.uri,
      type: selectedImage.type,
      name: selectedImage.fileName || `photo.jpg`,
    });
    data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_API_URL, data);
      const uploadedUrl = response.data.secure_url;
      setImageUrl(uploadedUrl); // Cập nhật trạng thái URL ảnh mới
      onImageUpload(uploadedUrl); // Gửi URL ảnh đã upload lên cho component cha
    } catch (error) {
    } finally {
      setUploading(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.uploadContainer}
      onPress={handleChoosePhoto}
      disabled={uploading}>
      {uploading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : imageUrl ? (
        <Image source={{uri: imageUrl}} style={styles.image} /> // Hiển thị ảnh hiện tại
      ) : (
        <View style={styles.placeholder}>
          <Add size={50} color="#ccc" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  uploadContainer: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default ImageUploader;
