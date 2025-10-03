import {Tabs} from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
export default function TabLayout() {
    return (
        <Tabs screenOptions={{headerShown:false, tabBarStyle:{
            flexDirection:'row', 
        }}}>
            <Tabs.Screen name="index" options={{ tabBarLabel: 'Produtos', title: 'Produtos', tabBarIcon: ({color,size})=> <MaterialIcons name='list' color={color} size={size}/>, tabBarLabelPosition: 'beside-icon', tabBarItemStyle: {flex:1} }} />

            <Tabs.Screen name="order" options={{ tabBarLabel: 'pedidos', title: 'Pedido', tabBarIcon: ({color,size})=> <MaterialIcons name='shopping-cart' color={color} size={size}/>, tabBarLabelPosition: 'beside-icon', tabBarItemStyle: {flex:1} }} />

            <Tabs.Screen name='product' options={{tabBarButton:()=>null, tabBarLabelPosition: 'beside-icon' , tabBarItemStyle:{flex:0}}} />
        
        </Tabs>
    )
}