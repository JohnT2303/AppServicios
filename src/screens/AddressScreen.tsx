import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../contexts/AuthContext';
import { Address } from '../types';

const AddressScreen = ({ navigation }) => {
    const { user, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [currentAddress, setCurrentAddress] = useState<Partial<Address>>({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        isDefault: false,
        coordinates: {
            latitude: 0,
            longitude: 0,
        },
    });

    const handleSave = async () => {
        try {
            if (isEditing) {
                await updateAddress(currentAddress as Address);
            } else {
                await addAddress(currentAddress as Omit<Address, 'id'>);
            }
            setIsEditing(false);
            setCurrentAddress({
                street: '',
                city: '',
                state: '',
                zipCode: '',
                isDefault: false,
                coordinates: {
                    latitude: 0,
                    longitude: 0,
                },
            });
            Alert.alert('Éxito', 'Dirección guardada correctamente');
        } catch (error) {
            Alert.alert('Error', 'No se pudo guardar la dirección');
        }
    };

    const handleDelete = async (addressId: string) => {
        Alert.alert(
            'Confirmar',
            '¿Estás seguro de que deseas eliminar esta dirección?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteAddress(addressId);
                            Alert.alert('Éxito', 'Dirección eliminada correctamente');
                        } catch (error) {
                            Alert.alert('Error', 'No se pudo eliminar la dirección');
                        }
                    },
                },
            ]
        );
    };

    const renderAddressCard = (address: Address) => (
        <View key={address.id} style={styles.addressCard}>
            <View style={styles.addressHeader}>
                <View style={styles.addressInfo}>
                    <Text style={styles.addressTitle}>
                        {address.isDefault ? 'Dirección Principal' : 'Dirección Alternativa'}
                    </Text>
                    <Text style={styles.addressText}>{address.street}</Text>
                    <Text style={styles.addressText}>
                        {address.city}, {address.state} {address.zipCode}
                    </Text>
                </View>
                <View style={styles.addressActions}>
                    {!address.isDefault && (
                        <TouchableOpacity
                            onPress={() => setDefaultAddress(address.id)}
                            style={styles.actionButton}
                        >
                            <Icon name="star" size={24} color="#FFC107" />
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        onPress={() => {
                            setCurrentAddress(address);
                            setIsEditing(true);
                        }}
                        style={styles.actionButton}
                    >
                        <Icon name="edit" size={24} color="#2196F3" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleDelete(address.id)}
                        style={styles.actionButton}
                    >
                        <Icon name="delete" size={24} color="#F44336" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>Mis Direcciones</Text>
                    <TouchableOpacity
                        onPress={() => setIsEditing(!isEditing)}
                        style={styles.addButton}
                    >
                        <Icon name="add" size={24} color="#2196F3" />
                    </TouchableOpacity>
                </View>

                {isEditing && (
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="Calle"
                            value={currentAddress.street}
                            onChangeText={(text) => setCurrentAddress({ ...currentAddress, street: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Ciudad"
                            value={currentAddress.city}
                            onChangeText={(text) => setCurrentAddress({ ...currentAddress, city: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Estado"
                            value={currentAddress.state}
                            onChangeText={(text) => setCurrentAddress({ ...currentAddress, state: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Código Postal"
                            value={currentAddress.zipCode}
                            onChangeText={(text) => setCurrentAddress({ ...currentAddress, zipCode: text })}
                            keyboardType="numeric"
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <View style={styles.addressesContainer}>
                    {user?.addresses.map(renderAddressCard)}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    addButton: {
        padding: 8,
    },
    form: {
        padding: 16,
        backgroundColor: 'white',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: '#2196F3',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    addressesContainer: {
        padding: 16,
    },
    addressCard: {
        backgroundColor: 'white',
        borderRadius: 8,
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
    addressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    addressInfo: {
        flex: 1,
    },
    addressTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    addressText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    addressActions: {
        flexDirection: 'row',
        gap: 8,
    },
    actionButton: {
        padding: 4,
    },
});

export default AddressScreen; 