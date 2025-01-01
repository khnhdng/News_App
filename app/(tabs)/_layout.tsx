import React from 'react';
import { Tabs } from 'expo-router';
import { TabBar } from '@/components/TabBar';
import { ThemeProvider } from '@/hooks/ThemeContext';
import { FontSizeProvider } from '@/hooks/FontSizeContext'; // Import FontSizeProvider

const TabLayout = () => {
  return (
    <ThemeProvider>
      <FontSizeProvider>
        <Tabs
          tabBar={(props) => <TabBar {...props} />}
          screenOptions={{ headerShown: false }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
            }}
          />
          <Tabs.Screen
            name="discover"
            options={{
              title: 'Discover',
            }}
          />
          <Tabs.Screen
            name="saved"
            options={{
              title: 'Saved',
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Settings',
            }}
          />
        </Tabs>
      </FontSizeProvider>
    </ThemeProvider>
  );
};

export default TabLayout;
