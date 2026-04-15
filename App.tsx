import React, { useState, useEffect, useMemo } from 'react';
import { 
  Platform, 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  SafeAreaView, 
  ActivityIndicator, 
  StatusBar as RNStatusBar,
  TextInput,
  TouchableOpacity,
  Modal
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import News from './src/components/News';
import { fetchNewsService, NewsData } from './src/utils/handle-api';
import { globalStyles } from './src/styles/global';
import NewsDetail from './src/components/NewsDetail';

export default function App() {
  const [newsList, setNewsList] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedNews, setSelectedNews] = useState<NewsData | null>(null);

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

  const filteredAndSortedNews = useMemo(() => {
    return newsList
      .filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const dateA = new Date(a.published).getTime();
        const dateB = new Date(b.published).getTime();
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      });
  }, [newsList, searchQuery, sortOrder]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Últimas notícias</Text>
        
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar notícias..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <TouchableOpacity 
          style={[
            styles.sortButton, 
            { backgroundColor: globalStyles.primaryColor }
          ]}
          onPress={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
        >
          <Text style={styles.sortButtonText}>
            {sortOrder === 'desc' ? '↓ Mais recentes' : '↑ Mais antigas'}
          </Text>
        </TouchableOpacity>
      </View>

      {!loading && !error && (
        <Text style={styles.counterText}>
          {filteredAndSortedNews.length} notícias encontradas
        </Text>
      )}

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={globalStyles.primaryColor} />
          <Text style={{ fontSize: globalStyles.bodyFontSize }}>Carregando notícias...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Erro: {error}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredAndSortedNews}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedNews(item)}>
              <News
                title={item.title}
                image={item.image}
                published={item.published}
                link={item.link}
                summary={item.summary}
              />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhuma notícia disponível no momento.</Text>
            </View>
          )}
          contentContainerStyle={styles.scrollContent}
        />
      )}

      <Modal
        animationType="slide"
        visible={selectedNews !== null}
        onRequestClose={() => setSelectedNews(null)}
      >
        <NewsDetail 
          news={selectedNews} 
          onClose={() => setSelectedNews(null)} 
        />
      </Modal>
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
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchInput: {
    height: 45,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  sortButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
  },
  sortButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  counterText: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});