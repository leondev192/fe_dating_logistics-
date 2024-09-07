// src/components/ImageUploader.js
import React, {useState} from 'react';
import {
  View,
  Button,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
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
} from '../../apis/cloudinary.config'; // Import cấu hình Cloudinary

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState<Asset | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleChoosePhoto = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        setSelectedImage(asset);
      }
    });
  };

  const handleUploadPhoto = async () => {
    if (!selectedImage) return;
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
      setUploadedUrl(response.data.secure_url);
      Alert.alert('Upload thành công!', `URL: ${response.data.secure_url}`);
    } catch (error) {
      console.error('Error uploading photo:', error);
      Alert.alert('Upload thất bại!', 'Vui lòng thử lại.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      {selectedImage && selectedImage.uri && (
        <Image source={{uri: selectedImage.uri}} style={styles.image} />
      )}
      <Button title="Chọn ảnh" onPress={handleChoosePhoto} />
      <Button
        title="Upload ảnh"
        onPress={handleUploadPhoto}
        disabled={uploading}
      />
      {uploading && <ActivityIndicator size="large" color="#0000ff" />}
      {uploadedUrl && <Text>URL ảnh: {uploadedUrl}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default ImageUploader;
