import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const services = [
    {
        id: 1,
        name: 'Limpieza de Casa',
        description: 'Servicio completo de limpieza para tu hogar',
        price: 'Desde $50',
        image: 'https://example.com/cleaning.jpg',
        rating: 4.8,
        reviews: 120
    },
    {
        id: 2,
        name: 'Plomero Profesional',
        description: 'Reparación y mantenimiento de tuberías',
        price: 'Desde $80',
        image: 'https://example.com/plumbing.jpg',
        rating: 4.9,
        reviews: 85
    },
    {
        id: 3,
        name: 'Electricista',
        description: 'Instalaciones y reparaciones eléctricas',
        price: 'Desde $100',
        image: 'https://example.com/electric.jpg',
        rating: 4.7,
        reviews: 95
    },
    {
        id: 4,
        name: 'Jardinero',
        description: 'Mantenimiento de jardines y áreas verdes',
        price: 'Desde $60',
        image: 'https://example.com/gardening.jpg',
        rating: 4.6,
        reviews: 75
    }
];

const ServicesScreen = ({ navigation }) => {
    const renderServiceCard = (service) => (
        <TouchableOpacity
            key={service.id}
            style={styles.serviceCard}
            onPress={() => navigation.navigate('ServiceDetail', { service })}
        >
            <View style={styles.serviceImageContainer}>
                <Icon name="cleaning-services" size={40} color="#2196F3" />
            </View>
            <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
                <View style={styles.serviceFooter}>
                    <Text style={styles.servicePrice}>{service.price}</Text>
                    <View style={styles.ratingContainer}>
                        <Icon name="star" size={16} color="#FFC107" />
                        <Text style={styles.rating}>{service.rating}</Text>
                        <Text style={styles.reviews}>({service.reviews})</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>Servicios Disponibles</Text>
                </View>
                <View style={styles.servicesContainer}>
                    {services.map(renderServiceCard)}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 16,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    servicesContainer: {
        padding: 16,
    },
    serviceCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    serviceImageContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#E3F2FD',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    serviceInfo: {
        flex: 1,
    },
    serviceName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    serviceDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    serviceFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    servicePrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2196F3',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 4,
    },
    reviews: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
});

export default ServicesScreen; 