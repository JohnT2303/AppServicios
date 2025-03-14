import React from 'react';
import { View, Text } from 'react-native';

interface MapProps {
  style?: any;
}

const Map: React.FC<MapProps> = ({ style }) => {
  return (
    <View style={[{ backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }, style]}>
      <Text>Componente de mapa</Text>
    </View>
  );
};

export default Map; 