import React, { useState, useEffect } from 'react';
import { 
  Platform, 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView,
  ActivityIndicator, 
  StatusBar as sb,
  FlatList
} from 'react-native';
import { StatusBar } from 'expo-status-bar';


import News from './src/components/News'; 
import { fetchNewsService, NewsData } from './src/utils/handle-api';


import { globalStyles } from './src/styles/global'; 

export default function App() {
  const [newsList, setNewsList] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await fetchNewsService();
      setNewsList(data);
    } catch (err: any) {
      setError(err.message || "Erro ao obter notícias");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Últimas notícias</Text>
      </View>
          {!loading && !error && (
      <Text style={{ padding: 16, fontSize: 14, color: '#666' }}>
        {newsList.length} notícias encontradas
      </Text>
)}
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={globalStyles.primaryColor} />
          <Text style={[styles.loadingText, { fontSize: globalStyles.bodyFontSize }]}>
            Carregando notícias...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Erro: {error}</Text>
        </View>
      ) : (
          <FlatList
    data={newsList}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <News
        title={item.title}
        image={item.image}
        published={item.published}
        link={item.link}
        summary={item.summary}
      />
    )}
    ItemSeparatorComponent={() => (
      <View style={styles.separator} />
    )}
    ListEmptyComponent={() => (
      !loading && (
        <View style={styles.emptyContainer}>
          <Text>Nenhuma notícia disponível no momento.</Text>
        </View>
      )
    )}
    contentContainerStyle={styles.scrollContent}
  />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.backgroundColor,
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? sb.currentHeight : 0,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  scrollContent: {
    padding: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
    marginBottom: 16, // Espaçamento entre os itens
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    paddingBottom: 20,
  },

});