import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Linking } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function WalletScreen(): JSX.Element {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Placeholder: open MetaMask mobile app
  const connectMetaMask = async () => {
    try {
      const url = 'https://metamask.app.link/dapp/your-dapp-url.com'; // Replace with your dApp URL
      await WebBrowser.openBrowserAsync(url);
    } catch (error) {
      Alert.alert('Error', 'Unable to open MetaMask.');
    }
  };

  // Placeholder: open Solflare wallet app
  const connectSolflare = async () => {
    try {
      const url = 'https://solflare.com/connect'; // Replace with deep link if needed
      await WebBrowser.openBrowserAsync(url);
    } catch (error) {
      Alert.alert('Error', 'Unable to open Solflare.');
    }
  };

  const mintToken = () => {
    if (!walletAddress) {
      Alert.alert('No Wallet Connected', 'Please connect your wallet first.');
      return;
    }
    Alert.alert('Mint Token', `Minting token to wallet: ${walletAddress}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <IconSymbol
        size={150}
        color="#6B7280"
        name="chevron.left.forwardslash.chevron.right"
        style={styles.icon}
      />

      <Text style={styles.title}>Log In to Proceed</Text>
      <Text style={styles.description}>Connect a crypto wallet and mint tokens directly in the app.</Text>

      <TouchableOpacity style={styles.button} onPress={connectMetaMask}>
        <Text style={styles.buttonText}>🦊 Connect MetaMask</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={connectSolflare}>
        <Text style={styles.buttonText}>🔥 Connect Solflare</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={mintToken}>
        <Text style={styles.buttonText}>🪙 Mint Token</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '15%',
    paddingHorizontal: '10%',
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
