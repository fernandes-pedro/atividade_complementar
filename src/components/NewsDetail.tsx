import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Linking, 
  Modal 
} from 'react-native';
import { NewsData } from '../utils/handle-api';

interface NewsDetailProps {
  news: NewsData | null;
  onClose: () => void;
}

export default function NewsDetail({ news, onClose }: NewsDetailProps) {
  const [imageError, setImageError] = useState(false);

  if (!news) return null;

  const handleOpenLink = async () => {
    if (news.link) {
      await Linking.openURL(news.link);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Fechar</Text>
      </TouchableOpacity>

      {news.image && !imageError ? (
        <Image
          source={{ uri: news.image }}
          style={styles.image}
          onError={() => setImageError(true)}
        />
      ) : (
        <View style={[styles.image, styles.fallback]}>
          <Text>Sem imagem</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{news.title}</Text>
        <Text style={styles.date}>{news.published}</Text>
        <Text style={styles.summary}>{news.summary}</Text>

        <TouchableOpacity style={styles.linkButton} onPress={handleOpenLink}>
          <Text style={styles.linkButtonText}>Ler notícia completa</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  closeButton: {
    padding: 20,
    alignItems: 'flex-start',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 220,
  },
  fallback: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 15,
  },
  summary: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 20,
  },
  linkButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40,
  },
  linkButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});