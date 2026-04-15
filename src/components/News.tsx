import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';

interface NewsProps {
  title: string;
  image?: string | null;
  published: string;
  link: string;
  summary: string;
}

export default function News({ title, image, published, link, summary }: NewsProps) {
  const handlePress = async () => {
    try {
      const supported = await Linking.canOpenURL(link);
      if (supported) {
        await Linking.openURL(link);
      } else {
        console.warn(`Não foi possível abrir a URL: ${link}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [imageError, setImageError] = useState(false);

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.7}>
          {image && !imageError ? (
      <Image 
        style={styles.image} 
        source={{ uri: image }} 
        onError={() => setImageError(true)} 
      />
    ) : (
      <View style={[styles.image, { backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Sem imagem</Text>
      </View>
    )}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{published}</Text>
            {summary ? (
      <Text style={styles.summary} numberOfLines={2}>
        {summary}
      </Text>
    ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  summary: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});
